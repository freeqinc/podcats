$(window).load(function() {
	$('.button, .link-button').click(function(){
		$(this).find('.hidden-link')[0].click();
	});

	$('.button2').click(function(event){
		event.stopPropagation();
		$(this).find('.hidden-link2')[0].click();
	});
	
});
