$(document).ready(function(){
    var isLive = false;
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

    function getUrlVars()
    {
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

    var query = getUrlVars();

    $.getJSON("/timer", function(data){
        $(".time").text(data['now']);
    });

    $(".podcats-button").click(function(){
        var time = $(".time").text();
        var type = "";
        if($(this).attr('id').toString() == "pb-1") {
            type = "GOOD";
        }
        else if($(this).attr('id').toString() == "pb-2") {
            type = "BAD";
        }
        var markHTML = '<br/><div class="bookmark-time">'+time+'</div><div class="bookmark-type">'+type+'</div>';
        $.ajax({
            url: '/bookmark?time='+time+'&type='+type,
            type: 'POST',
            contentType: false,
            cache: false,
            data: {},
            success: function(data){
                $("#stack").prepend(markHTML);
            },
            error: function(jqXHR, textStatus, err){
                alert("error");    
            }
        });
    });
});