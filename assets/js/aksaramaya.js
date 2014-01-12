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
        }
    }
})();