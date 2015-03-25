/*
todo:
/- variable height
/- font prod 2 alt font fara acolade
/- prod thumb centrat	
/- galerie + text
/- sageti
/- laturi despre noi
/- footer
/- logo homepage
/- harta lipita
- animate scroll
- butoane homepage produse
- fara scroll / pagini / keyboard



fonturi serif sans wtf
culori all over the place
puncte puncte in buton wtf
*/


$('document').ready(function(){
	var selclass = function(sel){
		var classy = sel.attr('class');
		classy = classy.split(" ");
		return "." + classy[0];
	}

	var offSet = function (setoff){
		var offset = (-$("#thumbs_cont li a img").index( setoff ) * 110 + 120) + 'px';
		$('#thumbs_cont').css('left', offset);
	}


	$('#thumbs_cont li a img').click( function(event){
		event.preventDefault();

		var sel = selclass($(this));

		$('.prod_active').removeClass('prod_active');
		$(sel).addClass('prod_active');	

		offSet(this);
	});

	$(".thumbs_but").click( function(event){
		event.preventDefault();

		var sel2 = selclass($('.prod_active'));
		
		if($(this).hasClass("thumbs_but_right")) {
			switch(sel2) {
				case ".p1":
					sel2 = ".p2";
					break;
				case ".p2":
					sel2 = ".p3";
					break;
				case ".p3":
					sel2 = ".p4";
					break;
				case ".p4":
					sel2 = ".p5";
					break;
				case ".p5":
					sel2 = ".p6";
					break;
				case ".p6":
					sel2 = ".p6";
					break;
			}
		} else {
			switch(sel2) {
				case ".p1":
					sel2 = ".p1";
					break;
				case ".p2":
					sel2 = ".p1";
					break;
				case ".p3":
					sel2 = ".p2";
					break;
				case ".p4":
					sel2 = ".p3";
					break;
				case ".p5":
					sel2 = ".p4";
					break;
				case ".p6":
					sel2 = ".p5";
					break;
			}
		}
		
		$('.prod_active').removeClass('prod_active');
		$(sel2).addClass('prod_active');	

		offSet( $("#thumbs_cont li a img"+sel2) );
	});

	//animation test
	$('#link,#logo').click(function(){
		$('html,body').animate({ scrollTop: 0 }, 500);	
		return false;
	});

	// var topOff = $('#logo').offset().top;
	// console.log(topOff);

	$(window).scroll(function () {
		if( $(window).scrollTop() === 0 ) {
			$('header').addClass("top"); 
			$('#logo').addClass("bg_logo");
		}
		else {
			$('header').removeClass("top");
			$('#logo').removeClass("bg_logo");
		}
	});

	$('nav a').click( function(){
		$('nav a').removeClass('active');
		$(this).addClass('active');
	});
});