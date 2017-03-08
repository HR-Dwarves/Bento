var path = require('path');
var express = require('express');
var cors = require('cors');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var axios = require('axios');

var app = express();
app.use(cors());
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

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
