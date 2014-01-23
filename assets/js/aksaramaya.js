var base_url = 'http://store.aksaramaya.com/apis';
var client = 'NTEwMzg4M2IxYjdjM2M3';

main = (function(){
    return{
        lenghtObject : function(obj){
          var result = 0;
          for(var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              result++;
            }
          }
          return result;
        }
    }
})();

book = (function(){
    return{
        slider : function(value){
            $(value).lemmonSlider({'infinite' : true});
        },
        prev : function(value){
            $(value).trigger('prevPage');   
        },
        next : function(value){
            $(value).trigger('nextPage');   
        },
        json : function(data){
            return $.ajax(data);   
        }
    }
})();

$(function(){
//menu
    book.json({
        url : base_url+"/categories/top_categories?client_id="+client,
        type : "GET",
        dataType : "json"
    }).success(function(data){
        var obj = [];
        var lenghtObj = Math.round(main.lenghtObject(data.data)/9);
        for(t=0; t<lenghtObj; t++){
            obj[t] = [];
        }
        var i = 0;
        var j = 0;
        $.each(data.data,function(k,v){
            if(i < 9){
                obj[j][i] = '<li><a href="/category/'+v.Category.id+'">'+v.Category.name+'</a></li>';
                i++;
            }
            else{
                i = 0;
                j++;   
            }
        });
        for(var a = 0; a < lenghtObj; a++){
            var b = a + 1;
            var html = "";
            for(var k = 0; k < 9; k++){
                html += obj[a][k];
            }
            $("#top-menu"+b).html(html);
            console.log(html);
        }
    });
});