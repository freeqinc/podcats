$(window).load(function() {



	function placeCaretAtEnd(el) {
		if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
			var range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} 
		else if (typeof document.body.createTextRange != "undefined") {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}
	}

	var ssi = true;
	var ssiTime = 150;
	var ssiType = "linear";


	$('.interval-button').click(function(){
		if(ssi){
			ssi = false;
			$('.ssi-play').velocity({
				opacity: 0,
				rotateZ: '180deg'
			},{
				duration: ssiTime,
				easing: ssiType
			});
			$('.ssi-stop').velocity({
				opacity: 1,
				rotateZ: '180deg'
			},{
				duration: ssiTime,
				easing: ssiType
			});
			$('.it-1').velocity({
				opacity: 0,
			},{
				duration: ssiTime,
				easing: ssiType
			});
			$('.it-2').velocity({
				opacity: 1
			},{
				duration: ssiTime,
				easing: ssiType
			});

			var curHeight = $('.tags').height();
			$('.tags').css('height', 'auto');
			var autoHeight = $('.tags').height();

			$('.tags').height(curHeight).velocity({
				height: autoHeight
			},{
				duration: ssiTime,
				easing: ssiType
			});

			$(".interval-comment").attr("placeholder", "Optional comment").val("").focus().blur();
			$('.interval-comment').velocity({'backgroundColorAlpha':0.2},1);
			$('.interval-comment').focus();
		} 
		else {
			ssi = true;

			$('.ssi').velocity('reverse',ssiTime);
			$('.interval-comment').velocity({'backgroundColorAlpha':0},1);
			$(".interval-comment").attr("placeholder", "Press here to add tags").val("").focus().blur();

		}
	});

$('.control-button').click(function(){
	$(this).velocity({
		scale:1.1
	},{
		duration: ssiTime/2,
		easing: ssiType
	})
	.velocity({
		scale: 1
	},{
		duration: ssiTime/2,
		easing: ssiType
	});
});


$('#stack').on("click", ".bookmark-edit", function(){
	$(this).parent().find('.tag-close').addClass('tag-close-edit');
	$(this).parent().find('.tag-comment').addClass('tag-comment-point');
	var comment = $(this).siblings('.bookmark-comment');
	comment.attr('contenteditable','true');
	comment.focus();
	placeCaretAtEnd(comment.get(0));
	$(this).fadeOut(1);
	$(this).parent().find('.bookmark-check').fadeIn(1);
	rename.attr('contenteditable','true');

});

$('#stack').on("click", '.tag-comment-point', function(){
	$(this).remove();
});

$('#stack').on("click", ".bookmark-check", function(){
	$(this).parent().find('.tag-close').removeClass('tag-close-edit');
	$(this).parent().find('.tag-comment').removeClass('tag-comment-point');
	var comment = $(this).siblings('.bookmark-comment');
	comment.attr('contenteditable','false');
	$(this).fadeOut(1);
	$(this).parent().find('.bookmark-edit').fadeIn(1);
});


$('.interval-comment').keypress(function(e){
	if(e.which == 13){
		$(this).closest('.interval-button').trigger('click');
	}
});

$('.tag').click(function(){
	var tagsel = $(this).find('.tag-selected');
	$(this).toggleClass('tag-toggle');
	if(tagsel.html() == "false"){
		tagsel.html("true");
	}
	else{
		tagsel.html("false");
	}
	console.log(tagsel.html());
	$('.interval-comment').focus();
});

$("#stack").on("keypress", ".editable", function(e){
	if(e.which == 13){
		$(this).parent().find('.tag-close').removeClass('tag-close-edit');
		$(this).parent().find('.tag-comment').removeClass('tag-comment-point');
		var checkmark = $(this).siblings('.bookmark-check');
		$(this).attr('contenteditable','false');
		checkmark.fadeOut(1);
		checkmark.parent().find('.bookmark-edit').fadeIn(1);
	}
});

});
