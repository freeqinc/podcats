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


	var renaming = false;

	$('.ce1-text').click(function(){
		var rename = $(this).find('.rename-text');
		var lecture = $(this).closest('.course').find('.lecture-name');
		if(!renaming){
			lecture.attr('contenteditable','true');
			lecture.focus();
			placeCaretAtEnd(lecture.get(0));
			rename.html("Click here or press enter when done!");
			renaming = true;
			return false;
		}
		else{
			renaming = false;
			rename.html("Rename");
			var index = $(this).closest('.course').attr("class").split("-")[1];
			var label = lecture.text().trim();
			//var label = $(".lecture-name").text().trim();
			//alert(label);

			var url = "/rename_lecture?index="+index+"&label="+label;
			$.post(url);
		}
	});

	$(".editable").keypress(function(e){
		if(e.which == 13){
			var rename = $(this).siblings('.course-expand').find('.rename-text');
			console.log(rename);
			var lecture = $(this).closest('.course').find('.lecture-name');
			renaming = false;
			lecture.attr('contenteditable','false');
			rename.html("Rename");
			var index = $(this).closest('.course').attr("class").split("-")[1];
			var label = lecture.text().trim();
			//var label = $(".lecture-name").text().trim();
			//alert(label);

			var url = "/rename_lecture?index="+index+"&label="+label;
			$.post(url);
		}
	});



	// $('.course').click(function(){
	// 	if(renaming){
	// 		var rename = $(this).find('.rename-text');
	// 		var lecture = $(this).find('.lecture-name');

	// 		lecture.html(rename.html());
	// 		rename.html('Rename');
	// 		rename.attr('contenteditable','false');

	// 		renaming = false;
	// 	}
	// });

});
