module.exports = function(app,port,superagent,async,base_url,client,fs,secret){

    app.get('/',function(req, res){
        console.log(req.session.name);
        return res.render('index',{"title":"Moco Store"});
    });
    
    app.get('/category',function(req, res){
      var url_data = "http://localhost:"+port+"/content/index.json";
      superagent.get(url_data)
        .set({  Accept: 'application/json' })
        .end(function(e, storifyResponse){  
          return res.render('category',{"title":"Moco Store"});   
        })
    
    });
    
    app.get('/detail',function(req, res){
        return res.render('bookDetail',{"title":"Moco Store"}); 
    });
    
    app.get('/user',function(req, res){
        return res.render('user',{"title":"Moco Store"}); 
    });
    
    app.post('/signup',function(req, res){
        superagent.post(base_url+"/users/signup")
        .send({client_id : client,
               client_secret : secret,
               device_id : 1,
               name : req.body.name,
               username : req.body.email,
               password : req.body.password
              })
        .end(function(err,data){
            return res.send(data.text);
        });
    });
    app.get('/ses',function(req, res){
        req.session.name = "ibnu";
        return res.send(req.session.name);
    });
};