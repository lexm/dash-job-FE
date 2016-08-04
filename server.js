'use strict';
var express = require('express');
var app = express();
const staticDir = process.env.NODE_ENV == 'production' ? '/public' : '/build';
app.use(express.static(__dirname + staticDir));
var server = app.listen(process.env.PORT || 3003, function(){
  console.log('server is running at %s', server.address().port);
});
