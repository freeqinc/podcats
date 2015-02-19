$(window).load(function() {

	var ssi = true;
	var ssiTime = 150;
	var ssiTime2 = 1;
	var ssiType = "linear";
	


	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1
			).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	var query = getUrlVars();

	$.getJSON("/checkLive?course="+query["course"], function(data){
		isLive = data["status"];
		if(isLive){
			$('.ssi-play').velocity({
				opacity: 0,
				rotateZ: '180deg'
			},{
				duration: ssiTime2,
				easing: ssiType
			});
			$('.ssi-stop').velocity({
				opacity: 1,
				rotateZ: '180deg'
			},{
				duration: ssiTime2,
				easing: ssiType
			});
			$('.it-1').velocity({
				opacity: 0,
			},{
				duration: ssiTime2,
				easing: ssiType
			});
			$('.it-2').velocity({
				opacity: 1
			},{
				duration: ssiTime2,
				easing: ssiType
			});
			ssi = false;
		}
	});

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
		}
		else {
			ssi = true;
			$('.ssi, .interval-text').velocity('reverse',ssiTime);
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
