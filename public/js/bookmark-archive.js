$(document).ready(function(){
	/*$(".bookmark-delete").click(function(){
        var answer = confirm("Your mark will be deleted permanently. Is this still OK?");
        if(answer == false) {
            return;
        }
        var index = $(this).attr("id");
        $.post("/watch/mod_mark?action=delete&index="+index);
        location.reload();
    });*/

    $("#stack").on("click", ".bookmark-delete", function(){
        var answer = confirm("Your mark will be deleted permanently. Is this still OK?");
        if(answer == false) {
            return;
        }
        var index = $(this).attr("id");
        $.post("/watch/mod_mark?action=delete&index="+index, function(data){
            $("#"+index).slideUp();
            $("#"+index).next(".bookmark-divider").hide();
            //$("#"+(index-added)).next(".bookmark-divider").remove();
            $("#"+index).remove();
            var bookmarks = document.getElementsByClassName("bookmark");
            if(bookmarks.length == 0){
                $(".empty").show();
            }
        });
    });

    $("#stack").on("click", ".bookmark-check", function(){
        var index = $(this).attr("id");
        var newComment = $("#c"+index.substring(1)).text();
        $.post("/watch/mod_mark?action=edit&index="+index+"&comment="+newComment);
    });

    /*$(".bookmark-check").click(function(){
        var index = $(this).attr("id");
        var newComment = $("#c"+index.substring(1)).text();
        $.post("/watch/mod_mark?action=edit&index="+index+"&comment="+newComment);
        location.reload();
    });*/

    $("#stack").on("keypress", ".editable", function(e){
        if(e.which == 13){
            var index = $(this).attr("id");
            var newComment = $("#c"+index.substring(1)).text();
            $.post("/watch/mod_mark?action=edit&index="+index+"&comment="+newComment);
        }
    });

    /*$(".editable").keypress(function(e){
        if(e.which == 13){
            var index = $(this).attr("id");
            var newComment = $("#c"+index.substring(1)).text();
            $.post("/watch/mod_mark?action=edit&index="+index+"&comment="+newComment);
            location.reload();
        }
    });*/
});