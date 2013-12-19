function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function limitWords(textToLimit, wordLimit)
{
    var finalText = "";
    
    var text2 = textToLimit.replace(/\s+/g, ' ');
    
    var text3 = text2.split(' ');
    
    var numberOfWords = text3.length;
    
    var i=0;
    
    if(numberOfWords > wordLimit)
    {
        for(i=0; i< wordLimit; i++)
        finalText = finalText+" "+ text3[i]+" ";
        
        return finalText+"...";
    }
    else return textToLimit;
}

$(function(){
    $.getJSON('content/rss.json',function(data){
        var rss = data.rss.channel[0].item;
        $.each(rss,function(i,rssdata){
            var desc = limitWords(rssdata.description[0],19);
            var description = rssdata.description[0].substr(0,140);
            $('#feed'+i+' h4').html("<a href='"+rssdata.link[0]+"' target='_blank'>"+ucfirst(rssdata.title[0].toLowerCase())+"</a>");
            $('#feed'+i+' i').html(rssdata.pubDate[0].replace(" +0000",""));
            $('#feed'+i+' p').html(desc+"<br><a href='"+rssdata.link[0]+"' target='_blank'>READ MORE &#10095;&#10095;</a>");
            return i<2;
        });
    });
});