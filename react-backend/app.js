var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var facts = require('./routes/facts');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
var proxy = require('http-proxy-middleware');

var app = express();

const FeedMe = require('feedme');
const http = require('http');

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

var callback = function(res){
  console.log("HELLO")
  return res;
}

var getNews = function() {
  http.get('http://feeds.bbci.co.uk/news/rss.xml', callback, function(res) {
    if (res.statusCode != 200) {
      console.error(new Error(`status code ${res.statusCode}`));
      return;
    }
    var parser = new FeedMe(true);
    res.pipe(parser);
    parser.on('title', (title) => {
      console.log('title of feed is', title);
    });
    parser.on('item', (item) => {
      console.log();
      console.log('news:', item.title);
      console.log(item.description);

    });
    parser.on('end', () => {
      console.log(parser.done());
      return parser.done();
    });
  })
}

app.get('/news', function(req, res) {
    console.log(getNews())
  });

// view engine setup
var port = process.env.PORT || 3001;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
