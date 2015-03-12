$(document).ready(function() {
    var isLive = false;
    var sTime = "";
    var prevTime = "";
    var currID = "";
    var added = 0;
    var ptr = 0;
    var tag_selected = [false, false, false, false, false, false, false];

    $(".interval-comment").prop('disabled', true);

    function updateTime() {
        var timeArray = $(".time").text().split(':');
        var i = 2;
        do {
            if (i < 2)
                timeArray[i + 1] = 0;
            timeArray[i] = parseInt(timeArray[i]) + 1;
            i--;
        }
        while (i >= 0 && timeArray[i + 1] >= 60);
        for (var i = 0; i < timeArray.length; i++) {
            if (i > 0 && parseInt(timeArray[i] / 10) == 0)
                timeArray[i] = "0" + parseInt(timeArray[i]);
            else
                timeArray[i] = timeArray[i].toString();
        }
        $(".time").text(timeArray.join(":"));
    }

    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(
            window.location.href.indexOf('?') + 1
        ).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function timeParseStr(word) {
        var segments = word.split(':');
        var total = 0;
        for (var i = 0; i < segments.length; i++) {
            total += parseInt(segments[i]) * Math.pow(60, 2 - i);
        }
        return total;
    }

    function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function check_charcount(content_id, max, e) {
        var content = $(content_id).html().substring(0, $(content_id).html().indexOf('<br>'));
        console.log(content.length-30);
        //console.log($(content_id).text().length);
        if (e.which != 8 && (content.length - 30 )>= max) {
            // $('#'+content_id).text($('#'+content_id).text().substring(0, max));
            e.preventDefault();
        }
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

    $.getJSON("/timer", function(data) {
        $(".time").text(data['now']);
    });

    $.getJSON("/checkLive?course=" + query["course"], function(data) {
        isLive = data["status"];
    });

    setInterval(function() {
        if (isLive) {
            updateTime();
        }
    }, 1000);

    $(".interval-button").click(function() {
        var pushedAt = $(".time").text();
        if (sTime == "") {
            //currID = makeid();
            sTime = pushedAt;
            /*var markHTML = tag("div","bookmark", currID, 
                tag("div", "bookmark-start-time", '', sTime))
+ tag("div", "bookmark-divider",'','');*/
            //$("#stack").prepend(markHTML);
            $(".interval-comment").prop('disabled', false);
            woopra.track("b_version_tag_click");
        } else {
            var comment = $(".interval-comment").val();
            var tags = "";
            $('.tag').each(function() {
                if ($(this).find('.tag-selected').html() == "true") {
                    tags += '<span class="tag-comment">' + $(this).find('.tag-text').html();
                    tags += '<span class="tag-close icon-cross"></span></span> ';
                }
            });
            if (comment == "" && tags == "") {
                comment = '<div class="bk-comment">' + "No Comment" + '</div>';
                //comment = "No Comment";
            } else if (comment != '') {
                comment = '<div class="bk-comment">' + comment + '</div>';
                comment += "<br/>" + tags;
            } else {
                comment = '<div class="bk-comment">' + comment + '</div>';
                comment += tags;
            }
            if (sTime == pushedAt)
                return;
            //if(comment == " ")
            //    comment = "No Comment";
            $(".interval-comment").val("");
            ptr--;
            var url = "/add_mark?start=" + sTime + "&end=" + pushedAt + "&comment=" + comment;
            var markHTML = '<div id="' + ptr + '" class="bookmark">' +
                '<div class="bookmark-start-time">' + sTime + '</div>' +
                '<div id="d' + ptr + '" class="bookmark-delete bookmark-icon"><span class="icon-trash"></span></div>' +
                '<div class="bookmark-edit bookmark-icon"><span class="icon-pencil"></span></div>' +
                '<div id="e' + ptr + '" class="bookmark-check bookmark-icon"><span class="icon-checkmark"></span></div>' +
                '<div class="bookmark-end-time">' + pushedAt + '</div><br/><br/>' +
                '<div id="c' + ptr + '" class="bookmark-comment editable">' + comment + '</div></div>' +
                '<div class="bookmark-divider"></div>';
            added++;
            woopra.track("b_version_comment_input", {
                message: comment
            });
            $.post(url, function(data) {
                $("#stack").prepend(markHTML);
                $(".empty").hide();
            });
            sTime = "";
            $(".interval-comment").prop('disabled', true);
            //setTimeout(function(){location.reload();},125);
        }
    });

    $(".quick-bookmark-button").click(function() {
        var time = $(".time").text();
        if (prevTime == time) {
            alert("Do not spam!");
            return;
        }
        var url = "/add_mark?time=" + time;
        //var markHTML = '<div class="bookmark"><div class="bookmark-start-time">'+time+'</div>';
        //markHTML += '<span class="icon-bolt"></span></div>';
        prevTime = time;
        $.post(url);
        setTimeout(function() {
            location.reload();
        }, 125);
    });

    $("#stack").on("click", ".bookmark-delete", function() {
        var answer = confirm("Your mark will be deleted permanently. Is this still OK?");
        if (answer == false) {
            return;
        }
        var index = parseInt($(this).attr("id").substring(1)) + added;
        $.post("/mod_mark?action=delete&index=" + index, function(data) {
            $("#" + (index - added)).slideUp();
            $("#" + (index - added)).next(".bookmark-divider").hide();
            $("#" + (index - added)).remove();
            var bookmarks = document.getElementsByClassName("bookmark");
            woopra.track("b_version_delete_click");
            if (bookmarks.length == 0) {
                $(".empty").show();
            }
        });
    });

    /*$(".bookmark-check").click(function(){
        var index = $(this).attr("id");
        var newComment = $("#c"+index.substring(1)).text();
        $.post("/mod_mark?action=edit&index="+index+"&comment="+newComment);
        location.reload();
    });*/

    $("#stack").on("click", ".bookmark-check", function() {
        var index = $(this).attr("id");
        $("#c" + index.substring(1)).find('.tag-close').removeClass('tag-close-edit');
        $("#c" + index.substring(1)).find('.tag-comment').removeClass('tag-comment-point');
        var newComment = $("#c" + index.substring(1)).html().trim();
        index = parseInt(index.substring(1)) + added;
        woopra.track("b_version_edit_click");
        $.post("/mod_mark?action=edit&index=" + index + "&comment=" + newComment);
    });

    $("#stack").on("keypress", ".editable", function(e) {
        if (e.which == 13) {
            var index = $(this).attr("id");
            $("#c" + index.substring(1)).find('.tag-close').removeClass('tag-close-edit');
            $("#c" + index.substring(1)).find('.tag-comment').removeClass('tag-comment-point');
            var newComment = $("#c" + index.substring(1)).html().trim();
            index = parseInt(index.substring(1)) + added;
            woopra.track("b_version_edit_click");
            $.post("/mod_mark?action=edit&index=" + index + "&comment=" + newComment);
        }
    });

    $("#stack").on("keyup", ".editable", function(e) {
        check_charcount(".editable", 80, e);
    });

    $("#stack").on("keydown", ".editable", function(e) {
        check_charcount(".editable", 80, e);
    });

    /*** Woopra ***/
    $("#logistics").click(function() {
        if (!tag_selected[0]) {
            woopra.track("b_version_logistics_tag_click");
            tag_selected[0] = true;
        } else {
            tag_selected[0] = false
        }
    });

    $("#start").click(function() {
        if (!tag_selected[1]) {
            woopra.track("b_version_start_tag_click");
            tag_selected[1] = true;
        } else {
            tag_selected[1] = false
        }
    });

    $("#example").click(function() {
        if (!tag_selected[2]) {
            woopra.track("b_version_example_tag_click");
            tag_selected[2] = true;
        } else {
            tag_selected[2] = false
        }
    });

    $("#assignment").click(function() {
        if (!tag_selected[3]) {
            woopra.track("b_version_assignment_tag_click");
            tag_selected[3] = true;
        } else {
            tag_selected[3] = false
        }
    });

    $("#exam").click(function() {
        if (!tag_selected[4]) {
            woopra.track("b_version_exam_tag_click");
            tag_selected[4] = true;
        } else {
            tag_selected[4] = false
        }
    });

    $("#question").click(function() {
        if (!tag_selected[5]) {
            woopra.track("b_version_question_tag_click");
            tag_selected[5] = true;
        } else {
            tag_selected[5] = false
        }
    });

    $("#end").click(function() {
        if (!tag_selected[6]) {
            woopra.track("b_version_end_tag_click");
            tag_selected[6] = true;
        } else {
            tag_selected[6] = false
        }
    });
});
