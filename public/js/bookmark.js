$(document).ready(function(){
    var isLive = false;
    var startTime = "";
    var prevTime = "";
    var currID = "";
    $(".interval-comment").prop('disabled', true);

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
    setInterval(updateTime, 1000);

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

    $(".interval-button").click(function(){
        var timePushed = $(".time").text();
        if(startTime == "") {
            currID = makeid();
            startTime = timePushed;
            var markHTML = '<div id="'+currID+'" class="bookmark">';
            markHTML += '<div class="bookmark-start-time">'+startTime+'</div></div>';
            $("#stack").prepend(markHTML);
            $(".interval-comment").prop('disabled', false);
        }
        else {
            var comment = $(".interval-comment").val();
            if(startTime == timePushed || comment == "")
                return;
            $(".interval-comment").val("");
            var url = "/bookmark?start="+startTime+"&end="+timePushed+"&comment="+comment;
            var markHTML = '<div class="bookmark-end-time">'+timePushed+'</div>';
            markHTML += '<div class="bookmark-comment">'+comment+'</div></div>';
            $.post(url, function(){
                $("#"+currID).append(markHTML);
            });
            startTime = "";
            $(".interval-comment").prop('disabled', true);
        }
    });

    $(".quick-bookmark-button").click(function(){
        var time = $(".time").text();
        if(prevTime == time){
            alert("Do not spam!");
            return;
        }
        var url = "/bookmark?time="+time;
        var markHTML = '<div class="bookmark"><div class="bookmark-start-time">'+time+'</div>';
        markHTML += '<span class="icon-bolt"></span></div>';
        prevTime = time;
        $.post(url, function(){
            $("#stack").prepend(markHTML);
        });
    });
});