$(document).ready(function(){
	var limit = 100;
	var typed = 0;
	$(".numleft").html(limit);

	$("#text").keyup(function(){
		typed = $(".interval-comment").val().length;
		var remaining = limit-typed;
		$(".numleft").html(remaining);
		if(remaining <= 10) {
			$(".charlim").css({"color":"red"});
		}
		else {
			$(".charlim").css({"color":"white"});
		}
	});

	$("#text").keydown(function(){
		typed = $(".interval-comment").val().length;
		var remaining = limit-typed;
		$(".numleft").html(remaining);
		if(remaining <= 10) {
			$(".charlim").css({"color":"red"});
		}
		else {
			$(".charlim").css({"color":"white"});
		}
	});

	$(".interval-comment").click(function(){
		limit = 100;
		$(".numleft").html(limit);
		$(".charlim").css({"color":"white"});
	});

	$('.interval-comment').keypress(function(e){
		if(e.which == 13){
			limit = 100;
			$(".numleft").html(limit);
			$(".charlim").css({"color":"white"});
		}
	});
});

