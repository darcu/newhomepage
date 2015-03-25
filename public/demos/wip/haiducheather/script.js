$('document').ready(function(){
	var minw = $(document).width() - 1000;
	var wid  = Math.round($(document).width()/2 - 72);
	console.log(wid);
	// $('#unu .centru img').css("left", wid + "px");
	if($(document).width() < 1000) {
		$('#unu .stanga img').css("left", minw);
		$('#unu .dreapta img').css("right", minw);
	}

	//animation test
	$('.toplink').click(function(){
		$('html,body').animate({ scrollTop: 0 }, 1000);	
		return false;
	});

	$(window).scroll(function () {
		if($(window).scrollTop() === 0) {
			$('header').css("background", "none");
			//console.log("top");
		}
		else {
			$('header').css("background", "linear-gradient(to bottom, #ffc924, #ffe080)");
			//console.log("shieet");
		}
	});

	$(window).resize(function() {
		var minw = $(document).width() - 1000;
		var wid  = $(document).width()/2 - 72;
		//console.log($(window).width() + ' ' + $(document).width() + ' ' + minw);

		// $('#unu .centru img').css("left", wid);
		if($(document).width() < 1000) {
			$('#unu .stanga img').css("left", minw);
			$('#unu .dreapta img').css("right", minw);
		}
	});
});