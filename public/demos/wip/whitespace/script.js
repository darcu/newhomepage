$(document).ready(function(){
	// mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	// jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	// jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

	if (webkit) { $('.active img').css('width', $(window).height() - 375); }

	$('.imajlink').hover( 
		function(){
			$('.imajbox').eq($(this).index()).addClass('hoverfx');
		}, 
		function(){
			$('.imajbox').removeClass('hoverfx');
		}
	);

	$('.imajlink, .imajbox').click( function(e){
		e.preventDefault();
		$('.imajbox, .imajlink').removeClass('active');
		
		$('.imajlink').eq($(this).index()).addClass('active');
		$('.imajbox').eq($(this).index()).addClass('active');

		if (webkit) { $('.active img').css('width', $(window).height() - 375); } //for chrome bug with calc and vw, vh, etc.

		$('#imajboxxob').css('left', '-' + ($(this).index() * 440) + 'px');
	});

	$('body').mousewheel( function(event, delta) {
		event.preventDefault();

		var currentleft = $('#imajboxxob').offset().left;
		var wid 		= $('#imajboxxob').width();

		var offset = (220 * delta) + currentleft;
		if 		(offset > 0) 		  { offset = 0; }
		else if (-offset > wid - 440) {	offset = 440 - wid;	}

		$('#imajboxxob').css('left', offset);
	});
});