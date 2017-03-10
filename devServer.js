var path = require('path');
var express = require('express');
var cors = require('cors');
var compression = require('compression');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var axios = require('axios');
var morgan = require('morgan');

var app = express();
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(path.join(__dirname, 'client', 'styles')));

app.get('/news/:newsSource/:time', function(req, res) {
  var newsSource = req.params.newsSource;
  var time = req.params.time;
  axios.get('https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/newsAPI.json?alt=media&token=fe512d31-5d7b-4a0a-bf25-9f007ef16a1a')
  .then(function(response) {
    //news API key
    var newsAPI = response.data['NEWS_API_KEY'];
    var query =  'https://newsapi.org/v1/articles?source=' + newsSource + '&sortBy=' + time + '&apiKey=' + newsAPI;
    axios.get(query)
      .then(function(response) {
        res.send(response.data.articles);
      })
      .catch(function(error) {
        console.log('Got an error getting the news.');
        res.send(error);
      });
  });
});

app.use(require('webpack-hot-middleware')(compiler));

// app.get('*.css', function (req, res, next) {
//   res.set('Content-Encoding', 'gzip');
//   res.set('Accept-Encoding', 'gzip');
//   res.set('Content-Type', 'text/css');
//   next();
// });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
