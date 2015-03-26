$(document).ready(function(){
	var off = $('#menu').offset().top;

	$(window).scroll(function(){		
		if( $(window).scrollTop() > off ) {
			if( !$('#menu').hasClass("sticky") ){
		    	$('#menu').addClass("sticky");
		    }
		}
        else {
        	if( $('#menu').hasClass("sticky") ) {
        		$('#menu').removeClass("sticky");
        	}

            var oppa = 1 - $(window).scrollTop()/500;
	        if ( oppa > 0) {
		        $('#heather').css({ 'opacity': oppa });
		    }
        }
	});
});