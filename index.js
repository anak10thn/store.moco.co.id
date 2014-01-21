//module
var express = require('express'),
    superagent = require('superagent'),
    consolidate = require('consolidate'),
    engine = require('ejs-locals'),
    async = require('async'),
    fs = require('fs');

//app
var port = 6969;
var app = module.exports = express();
var base_url = 'http://store.aksaramaya.com/apis';
var client = 'NTEwMzg4M2IxYjdjM2M3';
var secret = '943d78835a24d012fac359241e1e57d41522291e';
//routes

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'SEKR37'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/assets'));
    app.use("/content",express.static(__dirname+'/content'));
});

require('./routes/routes.js')(app,port,superagent,async,base_url,client,fs,secret);
//post data

app.listen(port);
console.log("access aksaramaya miniserver http://hostname:"+port); 