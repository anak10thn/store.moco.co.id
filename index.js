//module
var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');
var engine = require('ejs-locals');

//app
var port = 6969;
var app = module.exports = express();

//routes

require('./routes/routes.js')(app,port,superagent);

//Configure tempate engine
//app.configure(function(){
//    //app.engine('html', consolidate.handlebars);
//    //app.set('view engine', 'html');
//    app.set('view engine', 'ejs');
//    app.set('views', __dirname + '/views');
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(app.router);
//});
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