//module
var eyes = require('eyes');
var xml2js = require('xml2js');
var fs = require('fs');
var superagent = require('superagent');

//app
var count = 0;
//get data xml
setInterval(function(){
    var parser = new xml2js.Parser();
    parser.on('end', function(result) {
        var rss = JSON.stringify(result);
        fs.writeFile(__dirname+'/content/rss.json',rss,function(err){
            if(!err){
                count = count + 1;
                var date = new Date();
                console.log("Update Interval "+count+" on :"+date);
            }
        });
    });
    superagent.get('http://readingsocially.com/feed/index.php')
        .end(function(e,res){
            parser.parseString(res.text);
        });
},15 * 60 * 1000);
