/* v2.0b */
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
/- animate scroll
- butoane homepage produse
- hide scroll
- fara scroll / pagini / keyboard
/- text shadow text descriere
/- promesh titlu/meniu
- reposition on resize so scroll works

fonturi serif sans wtf
culori all over the place
puncte puncte in buton wtf
*/


$('document').ready(function(){
	$("#prod").css("background", "#EECD87 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAKCAYAAADGmhxQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAASZJREFUeNrMlN1xgzAMx39wXcAZoWyAMwKMACM0I9Qb1B2BjAAjhBGCNyAj1CPQF/lO5wt56EMT3fmQZAn99eVi2zZemd5i8LluA47A8h8ATO0e3pd7fs+sWgy+icGbRwCfTRfAAhQ/yxdAA4xABN6BVgxS/x3wLe2fxc6JjxX5kI1HPioWuIpsgRNwltiDdM0BnegA+lIh7uUkmoACqARoavuiwCWbw8543ONPEmcQeRTdERhM7VrRt6Z2U6nQztliWGCVk+RkdxP5L4u0SMXTP40UaAViDN7mSzIL3ygQOrNqJ9AtsydLLtGnjM0e2FStAqhM7ZIu6iXpJYtRXZ7v6PS3Bz5k1lY1qxfVvigAO+VHxrfAEIPfVKwJuMbgu+LVH+rfAQCng16klwO2QQAAAABJRU5ErkJggg==') no-repeat");

	//select class
	var selclass = function(sel){
		var classy = sel.attr('class');
		classy = classy.split(" ");
		return "." + classy[0];
	}

	// calc offset for thumb slider
	var offSet = function (setoff){
		var offset = (-$("#thumbs_cont li a img").index( setoff ) * 110 + 120) + 'px';
		$('#thumbs_cont').css('left', offset);
	}
	
	//applies positional css
	var scrollCss = function () {
		var scroll = $(window).scrollTop();
		var height = $("#home").height()
		if( scroll === 0 ) {
			$('header').toggleClass("top", true); 
			// $('#logo').toggleClass("top", true);
		}
		else {
			$('header').toggleClass("top", false); 
			// $('#logo').toggleClass("top", false);
			if (scroll < height)
				$('header').css({
					"background": "none",
					"box-shadow": "none"
				});
			// else 
				// $('header').css("box-shadow", "0px 6px 12px rgba(0,0,0,0.1)");
			if(scroll >= height && scroll < 2*height ){
				$('header').css("background-image", "linear-gradient(to bottom, rgba(1,70,48,1) 55%, rgba(1,70,48,0.7)");
				$('#logo, nav a').toggleClass("black", false); 
			}
			else if(scroll >= 2*height  && scroll < 3*height ){
				$('header').css("background-image", "linear-gradient(to bottom, rgba(238,205,135,1) 55%, rgba(238,205,135,0.7)");
				$('#logo, nav a').toggleClass("black", true);
			}
			else if(scroll >= 3*height  && scroll < 4*height ){
				$('header').css("background-image", "linear-gradient(to bottom, rgba(181,124,59,1) 55%, rgba(181,124,59,0.7)");
				$('#logo, nav a').toggleClass("black", true);
			}
			else if(scroll >= 4*height  && scroll < 5*height ){
				$('header').css("background-image", "none");
				$('#logo, nav a').toggleClass("black", true);
			}
		}
	}

	//applies initial css
	scrollCss();


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
					sel2 = ".p1";
					break;
			}
		} else {
			switch(sel2) {
				case ".p1":
					sel2 = ".p6";
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

	$("nav a").click( function(event){
		event.preventDefault();

		$('nav a').removeClass('active');
		$(this).addClass('active');
		
		var tg = this.hash;
		$('html,body').animate({ 
			scrollTop: $(tg).offset().top
		}, 500);	
	});

	$(window).scroll(function(){
		scrollCss();
	});


});
