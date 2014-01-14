module.exports = function(app,port,superagent){
    app.get('/',function(req, res){
      var url_data = "http://localhost:"+port+"/content/index.json";
      superagent.get(url_data)
        .set({  Accept: 'application/json' })
        .end(function(e, storifyResponse){  
           return res.render('index',storifyResponse.body.content);
      })
    })
    
    app.get('/category',function(req, res){
      var url_data = "http://localhost:"+port+"/content/index.json";
      superagent.get(url_data)
        .set({  Accept: 'application/json' })
        .end(function(e, storifyResponse){  
          return res.render('category',storifyResponse.body.content);   
        })
    
    })
    
    app.get('/layout',function(req, res){
      var url_data = "http://localhost:"+port+"/content/index.json";
      superagent.get(url_data)
        .set({  Accept: 'application/json' })
        .end(function(e, storifyResponse){  
          return res.render('layout',storifyResponse.body.content);   
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
};