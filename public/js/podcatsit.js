$(window).load(function() {

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

});
