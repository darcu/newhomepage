//calc an-a2000 v2.0b2
//key+mouse input - select/delete/backspace/insert
//to do: - paranteze, advanced stuff, 

//insertAtCaret
jQuery.fn.extend({
	insertAtCaret: function(myValue){
	  return this.each(function(i) {
	    if (document.selection) {
	      //For browsers like Internet Explorer
	      this.focus();
	      sel = document.selection.createRange();
	      sel.text = myValue;
	      this.focus();
	    }
	    else if (this.selectionStart || this.selectionStart == '0') {
	      //For browsers like Firefox and Webkit based
	      var startPos = this.selectionStart;
	      var endPos = this.selectionEnd;
	      var scrollTop = this.scrollTop;
	      this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos,this.value.length);
	      this.focus();
	      this.selectionStart = startPos + myValue.length;
	      this.selectionEnd = startPos + myValue.length;
	      this.scrollTop = scrollTop;
	    } else {
	      this.value += myValue;
	      this.focus();
	    }
	  })
	}
});
//backspace
jQuery.fn.extend({
	backspace: function() {
		return this.each(function(i) {
			//console.log(this);
			if (this.selectionStart || this.selectionStart == '0') {
		      //For browsers like Firefox and Webkit based
		      var startPos = this.selectionStart;
		      var endPos = this.selectionEnd;
		      var scrollTop = this.scrollTop;
		      if(startPos == endPos) 
		      	startPos--;
		      this.value = this.value.substring(0, startPos) + this.value.substring(endPos,this.value.length);
		      this.focus();
			  this.selectionStart = startPos;
			  this.selectionEnd = startPos;
		      
		      // console.log('iff');
			} else {
		      this.value = this.value.substring(0, this.value.length - 1);
		      this.focus();
		    }
		})
	}
});
//delete
jQuery.fn.extend({
	del: function() {
		return this.each(function(i) {
			//console.log(this);
			if (this.selectionStart || this.selectionStart == '0') {
		      //For browsers like Firefox and Webkit based
		      var startPos = this.selectionStart;
		      var endPos = this.selectionEnd;
		      var scrollTop = this.scrollTop;
		      if(startPos == endPos) 
		      	endPos++;
		      this.value = this.value.substring(0, startPos) + this.value.substring(endPos,this.value.length);
		      this.focus();
			  this.selectionStart = startPos;
			  this.selectionEnd = startPos;
		      
		      // console.log('iff');
			} else {
		      this.value = this.value.substring(0, this.value.length - 1);
		      this.focus();
		    }
		})
	}
});

$(document).ready(function() {
	/*mobile only*/
	var mobi = false;
	if(/Android/i.test(navigator.userAgent)) {
		//$('body').append("<p>Droider</p>");
		mobi = true;
	}
	/*end mobile only*/

	// repaint for vh bug
	causeRepaintsOn = $("button, input");

	$(window).resize(function() {
		causeRepaintsOn.css("z-index", 1);
	});

	var reset = true;
	var lastKey;
	var numcheck = /[0-9]/;
	var input = $('#calc_input');

	function calc() 				{ return Parser.evaluate(input.val()); }
	if(mobi)
		function insertVal(valToSet){ input.val(input.val() + valToSet); }
	else {
		function insertVal(valToSet){ input.insertAtCaret(valToSet); };
		// console.log('puli');
	}
	function setVal(valToSet) 		{ input.val(valToSet); };
	function backspace()			{ input.backspace(); };
	function del()					{ input.del(); };
	
	function process()			{
		switch(lastKey) {
			case "equal":
				setVal(calc());
				reset = true;
				break;
			case "clear":
				setVal("");
				reset = true;
				break;
			case "back":
				backspace();
				break;
			case "del":
				del();
				break;
			default: 
				if(reset){
					if(numcheck.test(lastKey))
						setVal(lastKey);
					else
						insertVal(lastKey);
					reset = false;
				} 
				else 
					insertVal(lastKey);
		}
		input.focus();
	};
	
	$('button').bind(mobi ? 'touchend':'click', function() {
		lastKey = $(this).val();
		process();
	});

	if(mobi) {
		input.attr('readonly', true);
	}
	else {
		input.keydown(function(e) {
			e.preventDefault();

			shiftPressed = e.shiftKey;
			code = e.which;
			chared = String.fromCharCode(code);
			//console.log('code ' + code + ' - ' + String.fromCharCode(e.which));

			if(code == 13 || (!shiftPressed && code == 187)) 
				lastKey = "equal";			
			else if(code == 8) 
				lastKey = "back";			
			else if(code == 46) 
				lastKey = "del";			
			else if(code == 107 || (shiftPressed && code == 187)) 
				lastKey = "+";			
			else if(code == 109 || code == 189) 
				lastKey = "-";			
			else if(code == 106 || (shiftPressed && code == 56)) 
				lastKey = "*";			
			else if(code == 111 || code == 191) 
				lastKey = "/";			
			else if(shiftPressed && code == 54) 
				lastKey = "^";	
			else if(code == 110 || code == 190) 
				lastKey = ".";			
			else if(code >=96 && code <= 105)
				lastKey = String.fromCharCode(code - 48);
			else if(numcheck.test(chared))
		 		lastKey = chared; 		
		 	else return;
		 	process();
		});
	}
});
