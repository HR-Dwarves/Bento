var path = require('path');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('app.get("env")', app.get('env'))



if (process.env.NODE_ENV === 'local') {
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


app.use(function (req, res, next) {
  origin = req.get('Origin') || '*';
  res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', origin);
  next();
});


// hack for now
if (process.env.NODE_ENV !== 'local') {

  app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname, './dist/bundle.js'));
  });
}

if (process.env.NODE_ENV === 'local') {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });
}




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
