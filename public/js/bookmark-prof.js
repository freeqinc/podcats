$(document).ready(function(){
    var isLive = false;
    var startTime = "";
    var prevTime = "";
    var currID = "";

    function updateTime(){
        var timeArray = $(".time").text().split(':');
        var i = 2;
        do {
            if(i < 2)
                timeArray[i+1] = 0;
            timeArray[i] = parseInt(timeArray[i])+1;
            i--;
        }
        while(i >= 0 && timeArray[i+1] >= 60);
        for(var i=0; i < timeArray.length; i++)
        {
            if(i > 0 && parseInt(timeArray[i]/10) == 0)
                timeArray[i] = "0"+parseInt(timeArray[i]);
            else 
                timeArray[i] = timeArray[i].toString();
        }
        $(".time").text(timeArray.join(":"));
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1
            ).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function timeParseStr(word) {
        var segments = word.split(':');
        var total = 0;
        for(var i = 0; i < segments.length; i++) {
            total += parseInt(segments[i]) * Math.pow(60, 2-i);
        }
        return total;
    }

    function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    var query = getUrlVars();

    $.getJSON("/timer", function(data){
        $(".time").text(data['now']);
    });

    $.getJSON("/checkLive?course="+query["course"], function(data){
        isLive = data["status"];
    });

    setInterval(function(){
        if(isLive) {
            updateTime();
        }
    }, 1000);

    $(".interval-button").click(function(){
        //var time = $(".time").text();
        var url = "/record?course="+query["course"]+"&status="+(!isLive)+"&pause=false";
        $.post(url, function(data){
            isLive = !isLive;
            if(!isLive){
                $(".time").text("0:00:00");
            }
        });
    });

    $(".quick-bookmark-button").click(function(){
        var url = "/record?course="+query["course"]+"&status=false&pause=true";
        $.post(url, function(data){
            isLive = !isLive;
        });
    });
});