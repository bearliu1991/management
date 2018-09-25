const express = require('express');
const path = require('path')

const app = express();
app.use(express.static(path.join(__dirname, 'dist')))

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
