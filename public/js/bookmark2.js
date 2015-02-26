$(document).ready(function(){
    var isLive = false;
    var sTime = "";
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

    function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    /*function tag(attr, class_name, id_name, content) {
        var tag = '<'+attr;
        if(class_name) {
            tag += ' class="'+class_name+'"'
        }
        if(id_name) {
            tag += ' id="'+id_name+'"'
        }
        tag += '>'+content+'</div>'
        return tag;
    }*/

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
        var pushedAt = $(".time").text();
        if(sTime == "") {
            //currID = makeid();
            sTime = pushedAt;
            /*var markHTML = tag("div","bookmark", currID, 
                tag("div", "bookmark-start-time", '', sTime))
                + tag("div", "bookmark-divider",'','');*/
            //$("#stack").prepend(markHTML);
            $(".interval-comment").prop('disabled', false);
        }
        else {
            var comment = $(".interval-comment").val();
            var tags = "";
            $('.tag').each(function(){
                if($(this).find('.tag-selected').html()=="true")
                    tags += $(this).find('.tag-text').html() + " ";
            });
            comment += " " + tags;
            if(sTime == pushedAt)
                return;
            if(comment == " ")
                comment = "No Comment";
            $(".interval-comment").val("");
            var url = "/add_mark?start="+sTime+"&end="+pushedAt+"&comment="+comment;
            /*var markHTML = tag('div', "bookmark-delete bookmark-icon", '', tag("span","icon-trash",'',''))
                + tag('div', "bookmark-edit bookmark-icon", '', tag("span","icon-pencil",'',''))
                + tag("div","bookmark-end-time",'',pushedAt) + "<br/><br/>"
                + tag("div","bookmark-comment",'',comment);*/
            $.post(url);
            sTime = "";
            $(".interval-comment").prop('disabled', true);
            setTimeout(function(){location.reload();},125);
        }
    });

    $(".quick-bookmark-button").click(function(){
        var time = $(".time").text();
        if(prevTime == time){
            alert("Do not spam!");
            return;
        }
        var url = "/add_mark?time="+time;
        //var markHTML = '<div class="bookmark"><div class="bookmark-start-time">'+time+'</div>';
        //markHTML += '<span class="icon-bolt"></span></div>';
        prevTime = time;
        $.post(url);
        setTimeout(function(){location.reload();},125);
    });

    $(".bookmark-delete").click(function(){
        var answer = confirm("Your mark will be deleted permanently. Is this still OK?");
        if(answer == false) {
            return;
        }
        var index = $(this).attr("id");
        $.post("/mod_mark?action=delete&index="+index);
        location.reload();
    });

    $(".bookmark-check").click(function(){
        var index = $(this).attr("id");
        var newComment = $("#c"+index.substring(1)).text();
        $.post("/mod_mark?action=edit&index="+index+"&comment="+newComment);
        location.reload();
    });
});