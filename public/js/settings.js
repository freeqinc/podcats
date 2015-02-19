$(window).load(function() {


	var ssiTime = 150;
	var ssiTime2 = 10;
	var ssiType = "linear";
	


	/* intialize page */

	$('.setting-group').each(function(){
		var toggle = $(this).find('.toggle-text');
		if(toggle.html() =="true"){
			$(this).find('.setting-yes').velocity({
				backgroundColorAlpha: 0.3
			},{
				duration: ssiTime2,
				easing: ssiType
			});
		}
		else{
			$(this).find('.setting-no').velocity({
				backgroundColorAlpha: 0.3
			},{
				duration: ssiTime2,
				easing: ssiType
			});
		}
	});


	$('.setting-yes').click(function(){
		$(this).velocity({
			backgroundColorAlpha: 0.3
		},{
			duration: ssiTime2,
			easing: ssiType
		});
		$(this).parent().find('.setting-no').velocity({
			backgroundColorAlpha: 0
		},{
			duration: ssiTime2,
			easing: ssiType
		});
		$(this).sibling('.toggle-text').html("true");
	});

	$('.setting-no').click(function(){
		$(this).velocity({
			backgroundColorAlpha: 0.3
		},{
			duration: ssiTime2,
			easing: ssiType
		});
		$(this).parent().find('.setting-yes').velocity({
			backgroundColorAlpha: 0
		},{
			duration: ssiTime2,
			easing: ssiType
		});
		$(this).sibling('.toggle-text').html("false");
	});


	$('.setting-toggle').click(function(){
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
