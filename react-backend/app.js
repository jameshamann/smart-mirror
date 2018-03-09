var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var facts = require('./routes/facts');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
  console.log('From the Server!')
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/facts', function(req, res) {
    res.json([{
      id: 1,
      username: "samsepi0l"
    }, {
      id: 2,
      username: "D0loresH4ze"
    }]);
});

app.get('/jokes', function(req, res) {
  res.json("jokes")
});

// view engine setup
var port = process.env.PORT || 3001;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
