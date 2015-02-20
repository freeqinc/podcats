$(document).ready(function(){
	$(".bookmark-delete").click(function(){
        var answer = confirm("Your mark will be deleted permanently. Is this still OK?");
        if(answer == false) {
            return;
        }
        var index = $(this).attr("id");
        $.post("/watch/mod_mark?action=delete&index="+index);
        location.reload();
    });

    $(".bookmark-check").click(function(){
        var index = $(this).attr("id");
        var newComment = $("#c"+index.substring(1)).text();
        $.post("/watch/mod_mark?action=edit&index="+index+"&comment="+newComment);
        location.reload();
    });
});