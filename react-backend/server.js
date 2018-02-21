"use strict";

var mqtt = require('mqtt');
var fs = require('fs');
var Path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var co = require('co');
var wrapRoute = require('co-express');
var exphbs  = require('express-handlebars');
var AWS = require('aws-sdk');
var promisify = require('es6-promisify');

// Configure AWS
var iam = require('../icebreaker-cert/iam.js'); // contains uname/pwd for dynamodb
iam.endpoint = 'https://dynamodb.us-east-1.amazonaws.com';
AWS.config.update(iam);
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
// End configure AWS

var hbs = exphbs.create({ extname: '.html' });

app.engine('html', hbs.engine);
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.get('/api/:stuff/:thing/history', wrapRoute(function*(req, res, next) {
  res.send(yield getHistory(req.params.stuff, req.params.thing, req.query.limit || 500,
    (Date.now() - (1000 * 60 * 60 * 24 * 7))));
}));

function*getHistory(stuff, thing, limit, ts) {
  let params = {
    TableName: 'LoRaData',
    KeyConditionExpression: 'topic = :topic AND #ts > :ts',
    ExpressionAttributeNames: {
      '#ts': 'timestamp'
    },
    Limit: limit,
    ExpressionAttributeValues: {
      ':topic': stuff + '/' + thing,
      ':ts': ts.toString()
    },
    ScanIndexForward: false
  };

  try {
    let data = yield promisify(dynamodbDoc.query.bind(dynamodbDoc))(params);
    return data.Items.map(it => {
      delete it.topic;
      it.timestamp = Number(it.timestamp);
      return it;
    });
  }
  catch (ex) {
    throw 'Unable to query DynamoDB. Error: ' + JSON.stringify(ex, null, 2);
  }
}

// MQTT
var mqttOpts = {
  topic: 'topic_1',
  key: fs.readFileSync(Path.join(__dirname, '../icebreaker-cert/4deb112637-private.pem.key')),
  cert: fs.readFileSync(Path.join(__dirname, '../icebreaker-cert/4deb112637-certificate.pem.crt')),
  ca: fs.readFileSync(Path.join(__dirname, '../icebreaker-cert/rootCA.pem')),
  protocol: 'mqtts',
  hostname: 'A3RCG9B7I2IJYK.iot.us-east-1.amazonaws.com',
  port: 8883
};

var mqttClient = mqtt.connect(mqttOpts);
mqttClient.on('connect', () => {
  console.log('Connected over MQTT');
  mqttClient.subscribe(mqttOpts.topic, { qos: 0 });
});

mqttClient.on('message', (topic, payload) => {
  // console.log('got message', topic, payload);
  try {
    io.to('topic:' + topic).emit('message', JSON.parse(payload.toString()));
  }
  catch (ex) {
    console.error('Failed to parse message', topic, payload);
  }
});

io.on('connection', socket => {
  socket.on('subscribe', topic => {
    console.log('subscribe to topic:' + topic);
    socket.join('topic:' + topic);
  });
});

var server = http.listen(process.env.PORT || 6173, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
