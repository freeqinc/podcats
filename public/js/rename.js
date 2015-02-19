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
			rename.html("Click here when done!");
			renaming = true;
			return false;
		}
		else{
			renaming = false;
			rename.html("Rename");
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
