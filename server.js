var path = require('path');
var express = require('express');
var cors = require('cors');
var axios = require('axios');

var app = express();

app.use(cors());

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

app.get('/geolocation/:latlong', function(req, res) {

  var lat = req.params.latlong.split(',')[0];
  var long = req.params.latlong.split(',')[1];

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

// hack for now
app.get('/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/bundle.js'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// [END app]

module.exports = app;
