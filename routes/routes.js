module.exports = function(app,port,superagent,async,base_url,client,fs,secret){
    var fake_token = '2c61911ad20356410b9c4551ddc93907abd492d0';
    
    app.get('/',function(req, res){
        if(!req.session.login){
            var login = "";
            var user = "";
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
        }
        return res.render('index',{"title":"Moco Store","login":login,"user":user});
    });
    
    app.get('/category/:id',function(req, res){
        var id = req.params.id;
        if(!req.session.login){
            var login = "";
            var user = "";
            var user_token = fake_token;
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
            var user_token = req.session.token;
        }
        superagent.post(base_url+"/books/recommended?access_token="+user_token+"&client_id="+client+"&per_page=10&category_ids="+id)
        .end(function(err,data){
            return res.render('category',{"title":"Moco Store","login":login,"user":user,"data":data.body.data});
        });       
    });
    
    app.post('/search',function(req, res){
        var query = req.body.query;
        if(!req.session.login){
            var login = "";
            var user = "";
            var user_token = fake_token;
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
            var user_token = req.session.token;
        }
        superagent.post(base_url+"/books/search?access_token="+user_token+"&client_id="+client+"&per_page=10000&q="+query)
        .end(function(err,data){
            return res.render('category',{"title":"Moco Store","login":login,"user":user,"data":data.body.data});
        });       
    });
    
    app.get('/detail',function(req, res){
        if(!req.session.login){
            var login = "";
            var user = "";
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
        }
        return res.render('bookDetail',{"title":"Moco Store","login":login,"user":user}); 
    });
    
    app.get('/user',function(req, res){
        if(!req.session.login){
            return res.redirect('/');
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
        }
        return res.render('user',{"title":"Moco Store","login":login,"user":user}); 
    });
    
    app.post('/signup',function(req, res){
        superagent.post(base_url+"/users/signup")
        .send({client_id : client,
               client_secret : secret,
               device_id : 1,
               name : req.body.name,
               username : req.body.email,
               password : req.body.password,
               confirm_password : req.body.repassword
              })
        .end(function(err,data){
            return res.send(data.text);
        });
    });
    
    app.post('/login',function(req, res){
        superagent.post(base_url+"/users/login")
        .send({client_id : client,
               client_secret : secret,
               device_id : 1,
               username : req.body.username,
               password : req.body.password
              })
        .end(function(err,data){
            var code = JSON.parse(data.text);
            if(code.meta.code == 200){
                req.session.login = code.data;
                req.session.token = code.data.access_token;
                superagent.get(base_url+"/users/profile?access_token="+code.data.access_token)
                .end(function(err,data){
                    req.session.user = JSON.parse(data.text).data.User;
                    return res.redirect('/user');
                });
            }
            else{
                return res.redirect('/');
            }
        });
    });
    
    app.get('/ses',function(req, res){
        console.log(JSON.stringify(req.session.login));
        console.log(JSON.stringify(req.session.user));
        return false;
    });
    
    app.get('/logout',function(req, res){
        req.session.destroy();
        return res.redirect('/');
    });
};