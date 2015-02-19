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
			$(".interval-comment").attr("placeholder", "Comment here!").val("").focus().blur();
			$('.interval-comment').focus();
		}
		else {
			ssi = true;
			$('.ssi, .interval-text').velocity('reverse',ssiTime);
			$(".interval-comment").attr("placeholder", "Press start to comment here").val("").focus().blur();

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


	$('.bookmark-edit').click(function(){
		var comment = $(this).siblings('.bookmark-comment');
		comment.attr('contenteditable','true');
		comment.focus();
		placeCaretAtEnd(comment.get(0));
		$(this).fadeOut(1);
		$(this).parent().find('.bookmark-check').fadeIn(1);
		rename.attr('contenteditable','true');
	});

	$('.bookmark-check').click(function(){
		var comment = $(this).siblings('.bookmark-comment');
		comment.attr('contenteditable','false');
		$(this).fadeOut(1);
		$(this).parent().find('.bookmark-edit').fadeIn(1);
	});

});