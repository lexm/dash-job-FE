'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var server = app.listen(process.env.PORT || 3003, function(){
  console.log('server is running at %s', server.address().port);
});
