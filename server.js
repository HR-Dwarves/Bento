var path = require('path');
var express = require('express');
var cors = require('cors');
var axios = require('axios');

var app = express();

app.use(cors());

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// console.log('app.get("env")', app.get('env'));


// app.use(function (req, res, next) {
//   origin = req.get('Origin') || '*';
//   res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Origin', origin);
//   next();
// });

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
