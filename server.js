import express from 'express';
import path from 'path';

const PORT = 7000;
const PUBLIC_PATH = __dirname + '/public';
const app = express();

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel');
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  stats: {
    colors: true
  }
}));
app.use(require('webpack-hot-middleware')(compiler));


app.all("*", function(req, res) {
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});


app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '...');
});
