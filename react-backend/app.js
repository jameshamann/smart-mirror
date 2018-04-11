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
var feed = require("feed-read");
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




app.get('/news', function(req, res) {
  var newsArr = function(data){
    console.log("Headline: " + data)
    res.json(data);
  }

  var myFunc = function(newsArr) {
    var arr = [];
    feed("http://feeds.bbci.co.uk/news/rss.xml", function(err, articles) {
        if (err) throw err;
        newsArr(articles)
        // Each article has the following properties:
        //
        //   * "title"     - The article title (String).
        //   * "author"    - The author's name (String).
        //   * "link"      - The original article link (String).
        //   * "content"   - The HTML content of the article (String).
        //   * "published" - The date that the article was published (Date).
        //   * "feed"      - {name, source, link}
        //
      });
    }

    myFunc(newsArr)

  });

// view engine setup
var port = process.env.PORT || 3001;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
