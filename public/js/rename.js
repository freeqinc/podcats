$(window).load(function() {

	var renaming = false;

	$('.ce1-text').click(function(){
		var rename = $(this).find('.rename-text');
		var lecture = $(this).closest('.course').find('.lecture-name');
		rename.attr('contenteditable','true');
		rename.html("");
		rename.focus();
		lecture.html("Click here when done!");
		renaming = true;
		return false;
	});

	$('.course').click(function(){
		if(renaming){
			var rename = $(this).find('.rename-text');
			var lecture = $(this).find('.lecture-name');

			lecture.html(rename.html());
			rename.html('Rename');
			rename.attr('contenteditable','false');

			renaming = false;
		}
	});

});
