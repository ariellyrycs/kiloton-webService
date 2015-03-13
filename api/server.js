
/*globals require, responder, process, __dirname*/
'use strict';
var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    app = express(),
    jsFiles;

app.set('port', process.env.PORT || 4000);
app.use(function (req, res, next){
    res.type('application/json');
    res.locals.respond = responder.setup(res);
    next();
});

jsFiles = new RegExp(".(js)$", "i");
fs.readdirSync(__dirname + '/routes').forEach(function (fileName) {
    if(jsFiles.test(fileName)) {
        require(__dirname + '/routes/' + fileName)(app);
    }
});

mongoose.connect('mongodb://localhost/pets', function(err) {
    if(err) {
        console.log('error connecting to MongoDB Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});
app.listen(app.get('port'), function () {
    console.log('listening on port ' + app.get('port'));
});
app.get('/', function(req, res) {
    res.send('Welcome');
});