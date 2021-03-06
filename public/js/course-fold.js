$(window).load(function() {

	$('.course-expand-1').velocity({
		rotateX: '90deg',
	},0);

	$('.course-expand-2').velocity({
		rotateX: '-90deg',
	},0);

	var windowH = window.innerHeight;
	$('.page-wrap').css('paddingBottom',windowH - 355);


/*	var numCourses = 0;
	$('.course').each(function(i, obj){
		numCourses++;
	});

	var newHeight = numCourses*150 + 200 + windowH - 210 - 150;
	$('.page-wrap').css('height', newHeight);*/

	var animateTime = 250;
	var animateTime2 = 250;
	function expand(course){
		//console.log("expanding");
		if(course.height() == 150){


			course.velocity('stop').velocity({
				height: 350
			},{
				duration: animateTime,
			});


			course.find('.course-expand').velocity('stop').velocity({
				height: 200
			},{
				duration: animateTime,
			});

			course.find('.course-expand-1').velocity('stop').velocity({
				rotateX: '20deg',
			},{
				duration: animateTime,
			});

			course.find('.course-expand-2').velocity('stop').velocity({
				rotateX: '-20deg',
			},{
				duration: animateTime,
			});


		}
	}

	function contract(course){
		//console.log("contracting");
		if(course.height() == 350){

			course.velocity('stop').velocity(
				'reverse'
				,{
					duration: animateTime2,
					queue: false
				});

			course.find('.course-expand').velocity('stop').velocity(
				'reverse'
				,{
					duration: animateTime2,
					queue: false
				});

			course.find('.course-expand-1').velocity('stop').velocity(
				'reverse'
				,{
					duration: animateTime2,
					queue: false
				});

			course.find('.course-expand-2').velocity('stop').velocity(
				'reverse'
				,{
					duration: animateTime2,
					queue: false
				});
			
		}
	}




	function animateCourse(i, course, scrollingDown){
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var top = course.offset().top;
		var bottom = top + course.height();


		if(docViewBottom > $(document).height() || docViewTop < 0)
			return;

		if(docViewTop > top) {
			//contract(course);
		} else if(docViewBottom > bottom + 300) {
			//$(document).off('scroll');

			var above = '.course-' + i;
			var below = '.course-' + (i +2);

			expand(course);
			//contract($(above));
			if(!scrollingDown)
				contract($(below));
			else
				contract($(above));
		} 

	}


	function animateCourse2(i, course, scrollingDown){
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var top = course.offset().top;
		var bottom = top + course.height();


		if(docViewBottom > $(document).height() || docViewTop < 0)
			return;

		if(docViewTop > top || docViewBottom < bottom) {
			contract(course);
		} 
	}


	setTimeout(function(){
		$('.course-expand').fadeIn(0);



		//expand($('.course-1'));
		//expand($('.course-1'));

		$('.course').click(function(){
			//console.log($(this).innerHeight());
			if($(this).height() < 151){
				expand($(this));
				$('.course').not(this).each(function(){
					contract($(this));
				});
			} else { 
				contract($(this));
			}
		});


		var lastScrollTop = 0;
/*		$(window).on("scroll", function() {

			$.doTimeout( 'scroll', 100, function(){
				console.log("hello");
				$('.course').each(function(i, obj){
					animateCourse2(i, $(this), false);
				});
			});

			var st = $(window).scrollTop();
			var scrollingDown = st > lastScrollTop;
			lastScrollTop = st;

			$('.course').each(function(i, obj){
				animateCourse(i, $(this), scrollingDown);
			});
});*/

},50);


});
