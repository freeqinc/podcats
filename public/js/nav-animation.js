$(window).load(function() {

	var burger = true;
	var burgTime = 150;
	var burgType = "linear";
	$('.hamburger-button').click(function(){
		if(burger){
			burger = false;
			$('.burger-1').velocity({
				rotateZ : '45deg',
				top: 10
			},{
				duration: burgTime,
				easing: burgType
			});
			$('.burger-2').velocity({
				opacity: 0
			},{
				duration: burgTime,
				easing: burgType
			});
			$('.burger-3').velocity({
				rotateZ : '-45deg',
				top: 10
			},{
				duration: burgTime,
				easing: burgType
			});
			$('.navigation-expand').velocity({
				height: 110
			},{
				duration: burgTime,
				easing: burgType
			});
			$('.page-wrap').velocity({
				top: 170
			},{
				duration: burgTime,
				easing: burgType
			});
		}
		else{
			burger = true;
			$('.burger-1, .burger-2, .burger-3, .navigation-expand, .page-wrap').velocity('reverse',burgTime);
		}
	});

	$('.back-button').click(function(){
		window.history.back();
	});

	$('.refresh-button').click(function(){
		location.reload();
	});

});
