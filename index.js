//module
var express = require('express'),
    superagent = require('superagent'),
    consolidate = require('consolidate'),
    engine = require('ejs-locals');

//app
var port = 6969;
var app = module.exports = express();
var base_url = 'http://store.aksaramaya.com/apis';
//routes

require('./routes/routes.js')(app,port,superagent,base_url);

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/assets'));
    app.use("/content",express.static(__dirname+'/content'));
});

app.listen(port);
console.log("access aksaramaya miniserver http://hostname:"+port); 