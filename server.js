var path = require('path');
var express = require('express');
var cors = require('cors');
var compression = require('compression');
var axios = require('axios');

var app = express();

app.use(cors());
app.use(compression());


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

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'application/javascript');
//   next();
// });

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
