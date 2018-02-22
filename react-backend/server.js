var awsIot = require('aws-iot-device-sdk');
var app = require('./app');




  var server = app.listen(process.env.PORT || 6173, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});


var device = awsIot.device({
    keyPath: "/Users/jameshamann/Documents/Development/mac_os_iot_certs/Smart_Mirror_Mac.private.key",
    certPath: "/Users/jameshamann/Documents/Development/mac_os_iot_certs/Smart_Mirror_Mac.cert.pem",
    caPath: "/Users/jameshamann/Documents/Development/mac_os_iot_certs/root-CA.crt",
    host: "zjo7hto1k82k.iot.eu-west-2.amazonaws.com"
});

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
