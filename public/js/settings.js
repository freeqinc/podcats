$(window).load(function() {


	var ssiTime = 150;
	var ssiTime2 = 10;
	var ssiType = "linear";
	


	/* intialize page */

	$('.setting-group').each(function(){
		var toggle = $(this).find('.toggle-text');
		if(toggle.html()=="true"){
			$(this).find('.setting-yes').addClass('setting-selected');
		}
		else{
			$(this).find('.setting-no').addClass('setting-selected');
		}
		// if(toggle.html() =="true"){
		// 	$(this).find('.setting-yes').velocity({
		// 		backgroundColorAlpha: 0.1
		// 	},{
		// 		duration: ssiTime2,
		// 		easing: ssiType
		// 	});
		// }
		// else{
		// 	$(this).find('.setting-no').velocity({
		// 		backgroundColorAlpha: 0.1
		// 	},{
		// 		duration: ssiTime2,
		// 		easing: ssiType
		// 	});
		// }
	});


	$('.setting-yes').click(function(){
		$(this).addClass('setting-selected');
		$(this).parent().find('.setting-no').removeClass('setting-selected');
		// $(this).velocity({
		// 	backgroundColorAlpha: 0.1
		// },{
		// 	duration: ssiTime2,
		// 	easing: ssiType
		// });
		// $(this).parent().find('.setting-no').velocity({
		// 	backgroundColorAlpha: 0
		// },{
		// 	duration: ssiTime2,
		// 	easing: ssiType
		// });
		// var option = $(this).parent().attr("class").slice(-1);
		// var url = "/setting_preference?option="+option+"&toggle=true";
		// $.post(url);
		$(this).siblings('.toggle-text').html("true");
	});

	$('.setting-no').click(function(){
		$(this).addClass('setting-selected');
		$(this).parent().find('.setting-yes').removeClass('setting-selected');
		$(this).siblings('.toggle-text').html("false");
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
