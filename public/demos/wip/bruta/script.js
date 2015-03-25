$(document).ready(function(){
	//stick big ass logo as well

	var off = $('#logo').offset().top;
	//console.log(off);
	$(window).scroll(function(){		
			if( $(window).scrollTop() > off ) 
			    $('#logo').addClass("sticky");
	        else
	            $('#logo').removeClass("sticky");

	        // var oppa = 1 - $(window).scrollTop()/1000;
	        // $('#heather').css({
	        // 	'opacity': oppa,
	        // });
	});




	var adjust = Math.round( ($(window).width() - 2000)/2 );
	console.log(adjust);
	$('#headerbg').css("left", adjust);


	var adjustspic = Math.round( ($(window).width() - $("#menu").width())/2 - 11 );
	console.log($(window).width() + ' ' + adjustspic);
	$('#menu').css("left", adjustspic);


	$(window).resize(function() {
		var adjust = Math.round( -(2000 - $(window).width())/2 );
		console.log(adjust);
		$('#headerbg').css("left", adjust);


		var adjustspic = Math.round( ($(window).width() - $("#menu").width())/2 - 11 );
		console.log($(window).width() + ' ' + adjustspic);
		$('#menu').css("left", adjustspic);
	});
});