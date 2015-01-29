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

});
