module.exports = function(app,port,superagent,async,base_url,client,fs,secret){

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
    
    app.get('/category',function(req, res){
        if(!req.session.login){
            var login = "";
            var user = "";
        }
        else{
            var login = req.session.login;
            var user = req.session.user;
        }
        return res.render('category',{"title":"Moco Store","login":login,"user":user});       
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
};