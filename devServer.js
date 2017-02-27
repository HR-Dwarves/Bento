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
  console.log('made it here');
  var newsSource = req.params.newsSource;
  var time = req.params.time;
  axios.get('https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/newsAPI.json?alt=media&token=fe512d31-5d7b-4a0a-bf25-9f007ef16a1a')
  .then(function(response) {
    //news API key
    var newsAPI = response.data['NEWS_API_KEY'];
    console.log('this is the api key ' + newsAPI);
    console.log('this is newsSource: '+ newsSource);
    console.log('this is time: ' + time);
    var query =  'https://newsapi.org/v1/articles?source=' + newsSource + '&sortBy=' + time + '&apiKey=' + newsAPI;
    axios.get(query)
      .then(function(response) {
        res.send(response.data.articles);
      })
      .catch(function(error) {
        console.log('Got an error getting the news.');
        console.log(error);
        res.send(error);
      });
  });
});

app.get('/geolocation/:latlong', function(req, res) {

  var lat = req.params.latlong.split(',')[0];
  var long = req.params.latlong.split(',')[1];

  // to be put in environment variable in google app engine and circle ci
  // var googleApiKey = 'AIzaSyAmKXTu8S1QMv9BMQw3NzNAjHPZ8Vl5OOM';
  // var googleApiKey = process.env.GOOGLE_API_KEY_GEO;

  axios.get('https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/keys.json?alt=media&token=940da7bd-c0a3-4dea-9320-b89c041bcd4b')
  .then(function(response) {
    // console.log(response.data['GOOGLE_MAPS_API_KEY']);
    var googleApiKey = response.data['GOOGLE_MAPS_API_KEY'];

    let queryBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    let query = `${queryBase}${lat},${long}&key=${googleApiKey}`;

    axios.get(query)
      .then(function(response) {
        var city;
        // using if statement to get rid of errors in console
        // console.log(response);
        if (response.data.results[0]) {
          city = response.data.results[0].address_components.reduce(function(acc, item) {
            if (item.types.includes('locality')) {
              return acc = item.long_name;
            } else {
              return acc;
            }
          });
        }
        res.send(city);
      })
      .catch(function (error) {
        console.log(error);
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
