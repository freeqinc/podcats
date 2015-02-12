$(window).load(function() {

	var focus = false;
	$('.the-input').focusin(function() {
		if (!focus) {
			focus = true;
			$('.the-text').velocity('stop').velocity({
				scaleX : 0.8,
				scaleY : 0.8,
				top : 30,
				left : 0,
				marginLeft : -10,

			}, {
				duration : 150,
				easing : 'linear'
			});
		}

	}).focusout(function() {
		if (($('.ti-1').val().length == 0) && ($('.ti-2').val().length == 0) && focus) {
			focus = false;
			$('.the-text').velocity('stop').velocity("reverse", {
				duration : 150,
				easing : 'linear'
			});
		}
	});

	$('.button, .link-button').click(function(){
		$(this).find('.hidden-link')[0].click();
	});

	$('.button2').click(function(event){
		event.stopPropagation();
		$(this).find('.hidden-link2')[0].click();
	});


	$('.menu-button').click(function(){
		$('.nav-menu').velocity({
			left: 0
		},{
			duration: 200,
			easing: 'linear'
		});
		$('.home-icons').velocity({
			paddingLeft: 0
		},{
			duration: 200,
			easing: 'linear'
		});

	});



	$('.menu-close').click(function(){
		$('.nav-menu').velocity({
			left: -300
		},{
			duration: 200,
			easing: 'linear'
		});
		$('.home-icons').velocity({
			paddingLeft: 0
		},{
			duration: 200,
			easing: 'linear'
		});

	});



});
