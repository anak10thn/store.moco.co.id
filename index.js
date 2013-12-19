//module
var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

//app
var port = 8080;
var app = express();

//Configure tempate engine
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
app.use("/content",express.static(__dirname+'/content'));


app.get('/',function(req, res){
  var url_data = "http://localhost:"+port+"/content/index.json";
  superagent.get(url_data)
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){  
       return res.render('index',storifyResponse.body.content);
  })
})

app.get('/about',function(req, res){
  var url_data = "http://localhost:"+port+"/content/index.json";
  superagent.get(url_data)
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){  
      return res.render('about',storifyResponse.body.content);   
    })

})

app.get('/contact',function(req, res){
  var url_data = "http://localhost:"+port+"/content/index.json";
  superagent.get(url_data)
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){  
      return res.render('contact',storifyResponse.body.content);   
    })

})

app.get('/product',function(req, res){
  var url_data = "http://localhost:"+port+"/content/index.json";
  superagent.get(url_data)
    .set({  Accept: 'application/json' })
    .end(function(e, storifyResponse){  
      return res.render('product',storifyResponse.body.content);   
    })

})

app.listen(port);
console.log("access aksaramaya miniserver http://hostname:"+port); 