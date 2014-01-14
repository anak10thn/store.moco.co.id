module.exports = function(app,port,superagent,base_url){
    app.get('/',function(req, res){
//        var newbook = superagent.get(base_url+"/books/newbooks?client_id=NTEwMzg4M2IxYjdjM2M3&limit=10")
//                    .set({  Accept: 'application/json' });
//        var popular = superagent.get(base_url+"/books/popular?client_id=NTEwMzg4M2IxYjdjM2M3&limit=10")
//                    .set({  Accept: 'application/json' });
//        var recommended = superagent.get(base_url+"/books/global_recommended?client_id=NTEwMzg4M2IxYjdjM2M3&limit=10")
//                    .set({  Accept: 'application/json' });
//        newbook.end(function(e,res_newbook){
//            popular.end(function(e,res_popular){
//                recommended.end(function(e,res_recommended){
//                    var nb = JSON.parse(res_newbook.text);
//                    var pp = JSON.parse(res_popular.text);
//                    var rc = JSON.parse(res_recommended.text);
//                    var datares = {"title":"Moco Store","newbook":nb,"popular":pp,"recommended":rc};
//                });
//            }); 
//        });
        return res.render('index',{"title":"Moco Store","app":"index","controller":"indexController"});
    })
    
    app.get('/category',function(req, res){
      var url_data = "http://localhost:"+port+"/content/index.json";
      superagent.get(url_data)
        .set({  Accept: 'application/json' })
        .end(function(e, storifyResponse){  
          return res.render('category',{"title":"Moco Store","app":"index","controller":"indexController"});   
        })
    
    })
    
    app.get('/detail',function(req, res){
        return res.render('bookDetail',{"title":"Moco Store","app":"index","controller":"indexController"}); 
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