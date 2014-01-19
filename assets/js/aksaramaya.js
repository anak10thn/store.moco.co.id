var base_url = 'http://store.aksaramaya.com/apis';
var client = 'NTEwMzg4M2IxYjdjM2M3';

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