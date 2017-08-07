var express = require('express');
var app = express();
var path = require('path');

app.use('/shartan', express.static(path.resolve(__dirname + '/../build')));

var port = 3002;
app.listen(port, () => {
    console.log('listening on: ', port);
})