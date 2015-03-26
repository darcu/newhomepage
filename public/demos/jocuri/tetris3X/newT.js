/*
new tetris Quad 1.0b 

bugz:
 - scoru e futut
 - themes length for theme button

todo:
 - scalable, replace fixed sizes with vars
 - +/- buttons
 - mobile responsive design
 - mouse input - click rotate / rclick go down
 - touch input
 - animations with set interval
 - rounded corners with pixel transparency, manipulation
 - gradients / better graphics
 - space go down
 - sunete 
 - moother shit
 - move with one
 - pause when land/hit
 - font loading
 - classic theme

 - graphic library crap for game canvas fuck yea
 - 3D webgl shit game shit fuck yea

 http://diveintohtml5.info/canvas.html

 */


/**** vars ****/

var colors = {
	// sidebar | lines | squares | L | I | -L | T | square | z | -z | brick
	0: ["#59b", "#59b", "#379", "#ff0", "#f0f", "#0ff", "#f00", "#0f0", "#00f", "#f80", "#fff"], // classic
	1: ["#28284a", "#28284a", "#224", "#C794FF", "#871EB7", "#FFA7B4", "#6A14C8", "#FF0072", "#8EB5F1", "#40BCCB", "#fff"], // lilac
	2: ["#803008", "#803008", "#4d1d05", "#C23302", "#68910C", "#871C0A", "#CA2B1D", "#CF4935", "#DE9546", "#F4B806", "#fff"], // bonfire
	3: ["#008C9E", "#00DFFC", "#00B4CC", "#69D2E7", "#E0E4CC", "#A7DBD8", "#fa3600", "#68a8e8", "#F38630", "#FA6900", "#fff"], // giant goldfish
	4: ["#59b", "#59b", "#379", "#aa0", "#a0a", "#0aa", "#a00", "#0a0", "#00a", "#a80", "#eee"], // lego
	5: ["#8b956d", "#c4cfa1", "#c4cfa1", "#6b7353", "#8b956d", "#6b7353", "#8b956d", "#6b7353", "#8b956d", "#6b7353", "#414141"], // lego
};

var shapes = {
	0:  [
	
	    1, 0, 0, 0,
	    1, 0, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 1, 0,
	    1, 0, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 0, 0, 0,

	    0, 0, 1, 0,
	    1, 1, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,
	    
		],
	1:  [
	
	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 1, 0, 0,

	    0, 0, 0, 0,
	    1, 1, 1, 1,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 1, 0, 0,

	    0, 0, 0, 0,
	    1, 1, 1, 1,
	    0, 0, 0, 0,
	    0, 0, 0, 0,
	    
	    ],
	2:  [
	
	    1, 1, 0, 0,
	    1, 0, 0, 0,
	    1, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 1, 0,
	    0, 0, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    0, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,

	    1, 0, 0, 0,
	    1, 1, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,
	    
	    ],
	3:  [
	
	    1, 0, 0, 0,
	    1, 1, 0, 0,
	    1, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 1, 0,
	    0, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    1, 1, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    ],

	4: [
	    
	    1, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 0, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    ],

	5:  [
	
	    0, 1, 1, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 0, 0, 0,
	    1, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 1, 0,
	    1, 1, 0, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 0, 0, 0,
	    1, 1, 0, 0,
	    0, 1, 0, 0,
	    0, 0, 0, 0,

	    ],

	6:  [
    
	    1, 1, 0, 0,
	    0, 1, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    1, 1, 0, 0,
	    1, 0, 0, 0,
	    0, 0, 0, 0,

	    1, 1, 0, 0,
	    0, 1, 1, 0,
	    0, 0, 0, 0,
	    0, 0, 0, 0,

	    0, 1, 0, 0,
	    1, 1, 0, 0,
	    1, 0, 0, 0,
	    0, 0, 0, 0,

	    ]
};

var canvas  = document.getElementById('canvas');
var ctx 	= null, cw = 480, ch = 540;
var wall 	= new Array();
var wallCol = new Array();

var level 	= 1;
var speed 	= [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3];
var ss 		= 30;
var theme   = 5;

var moving, pause, score, curBrick, nextBrick, wall, wallCol, theme, advanceId, moveId;

var grd;

var oneTimeIni = function (){
	//ini work, create canvas, and listeners
	if( canvas && canvas.getContext ){
	    ctx 			= canvas.getContext('2d');
	    canvas.width 	= cw;
	    canvas.height 	= ch;
	}

	ctx.lineWidth = 2;
	
	addEventListener ( "keydown", keydown );
	addEventListener ( "keyup", keyup );

	document.getElementById('canvas').style.border = "8px solid " + colors[theme][10];


// create radial gradient
grd = ctx.createRadialGradient(150, 150, 100, 150, 150, 300);
// light blue
grd.addColorStop(0, '#8ED6FF');
// dark blue
grd.addColorStop(1, '#004CB3');
};

var iniVars = function() {
	moving 	  = 0; 
	pause  	  = 0; 
	score  	  = 0;
	curBrick  = {
		x: 	  	  4,
		y: 	  	  0,
		shape: 	  0,
		rotation: 0
	};
	nextBrick = {
		shape: 	  0,
		rotation: 0
	};
	for ( i=0; i<180; i++ ){
	    wall[i] = 0;
	}
};

var ini = function() {
	oneTimeIni();
	iniVars();
				
	curBrick.shape 		= Math.floor(Math.random()*7);
	curBrick.rotation 	= Math.floor(Math.random()*4);
	
	nextBrick.shape 	= Math.floor(Math.random()*7);
	nextBrick.rotation 	= Math.floor(Math.random()*4);

	if(moveId) 	  clearInterval(moveId);
	moveId 	 	= setInterval(move, 60);
	
	setSpeed(speed[level]);
	
	draw();
};

var setSpeed = function (speed) {
	if(advanceId) 	clearInterval(advanceId);
	advanceId = setInterval(advance, 500/speed);
}

var setShadow = function ( color, blur, offsetX, offsetY ) {
	if( arguments[0] === undefined) {
		ctx.shadowColor   = '#000';
		ctx.shadowBlur 	  = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}
	else {
		ctx.shadowColor   = color;
		ctx.shadowBlur    = blur;
		ctx.shadowOffsetX = offsetX;
		ctx.shadowOffsetY = offsetY;
	}
}

var roundedSquare = function ( x, y, width, height, radius ) {
	ctx.beginPath();
	ctx.moveTo(x,y+radius);
	ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
	ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y+radius);
	ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y);
	ctx.quadraticCurveTo(x,y,x,y+radius);

	setShadow('rgba(0,0,0,0.4)', 4, 4, 4);
	ctx.fill();
	setShadow();
	ctx.stroke();
}

var roundedSquareSet = function ( x, y ) {
	roundedSquare( x, y, ss, ss, 8 );
}

var draw = function () {
	ctx.clearRect(0, 0, 480, 540);
	drawBG();
	drawCurBrick();
	drawSidebar();
};

var drawBG = function () {
	// square background
	ctx.fillStyle 	= colors[ theme ][ 2 ];
	// ctx.fillStyle 	= grd;
	ctx.fillRect	( 0, 0, 300, 540 );
	// roundedSquare 	( 0, 0, 300, 540, 16 );
	
	// sidebar
	ctx.fillStyle 	= colors[ theme ][ 0 ];
	ctx.fillRect	( 300, 0, 180, 540 );
	
	// lines
	ctx.strokeStyle = colors[ theme ][ 1 ];
	// ctx.lineWidth   = 1;
	for ( i = 0; i < 300; i+=30 ) 
		for ( j = 0; j < 540; j+=30 )
			ctx.strokeRect( i, j, 30, 30 );

	//wall
	ctx.strokeStyle = colors[theme][10];
	for ( i=0; i<180; i++ ) {
	    if( wall[i] == 1 ) {
			// pickCol( wallCol[i] );
			ctx.fillStyle 	= colors[theme][wallCol[i]+3];
			roundedSquareSet ( i%10 * ss, Math.floor(i/10) * ss )
			// ctx.fillRect	( i%10 * 30, Math.floor(i/10)*30, 30, 30 );
			// ctx.strokeRect	( i%10 * 30, Math.floor(i/10)*30, 30, 30 );
	    }
	}
};

var drawCurBrick = function () {
	//cur brick
	// pickCol( curBrick.shape );
	ctx.fillStyle 	= colors[ theme ][ curBrick.shape + 3 ];
	// ctx.fillStyle = grd;
	ctx.strokeStyle = colors[ theme ][ 10 ];
	
	for ( i = 0; i < 16; i++ ){
	    if( shapes[ curBrick.shape ][ curBrick.rotation * 16 + i ] ){
	    	roundedSquareSet( (Math.floor(i%4) + curBrick.x) * ss, (Math.floor(i/4) + curBrick.y) * ss );
			// ctx.fillRect((Math.floor(i%4)+ curBrick.x)*30, (Math.floor(i/4)+ curBrick.y)*30, 30, 30);
			// ctx.strokeRect((Math.floor(i%4)+ curBrick.x)*30, (Math.floor(i/4)+ curBrick.y)*30, 30, 30);
	    }
	}
};

var drawSidebar = function () {
	//sidebar
	
	// ctx.fillStyle	= colors[ theme ][ 2 ];
	// roundedSquare 	( 310, 40, ss*5, ss*5, 8 );

	ctx.fillStyle 	= colors[ theme ][ nextBrick.shape + 3 ];
	for ( i = 0; i < 16; i++ ) {
	    if( shapes[ nextBrick.shape ][ nextBrick.rotation * 16 + i ] ) {
			
			roundedSquareSet( ( Math.floor( i % 4 ) + 11 ) * ss, ( Math.floor( i/4 ) + 1) * ss + ss );
			// ctx.fillRect( (Math.floor(i%4)+ 11)*30, (Math.floor(i/4)+ 1)*30 + 30, 30, 30);
			// ctx.strokeRect( (Math.floor(i%4)+ 11)*30, (Math.floor(i/4)+ 1)*30 + 30, 30, 30);
	    }
	}

	setShadow(colors[theme][2], 2, 2, 2);

	//score
	ctx.fillStyle = colors[theme][10];
	ctx.font = "32px 'Digital-7'";
	ctx.fillText("Next", 320, 30);
	ctx.fillText("Score", 310, 360);
	ctx.fillText(score, 320, 400);
	ctx.fillText("Level", 310, 480);
	ctx.fillText(level, 320, 520);

	//pause
	ctx.fillStyle = "#ff0";
	if(pause){
		ctx.fillText("Pause", 310, 300); 
		// ctx.putImageData( filterImage(grayscale, [0,0,480,540]), 0, 0);
	}

	setShadow();
};

/**** filters ****/
/**** html5rocks.com/en/tutorials/canvas/imagefilters/ ****/
getPixels = function(x, y, w, h) {
  return ctx.getImageData(x,x,w,h);
};

filterImage = function(filter, var_args) {
  var args = [this.getPixels(var_args[0],var_args[1],var_args[2],var_args[3])];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
};

grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
    // d[i] = d[i]/2 + 70;
    // d[i+1] = d[i+1]/2 + 50;
    // d[i+2] = d[i+2]/2 + 30;
  }
  return pixels;
};
/**** end filters ****/

var anotherBrickInTheWall = function () {
	for( i=0; i<16; i++ ){
	    if ( shapes[curBrick.shape][curBrick.rotation*16+i] ){
			wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] = 1;
			wallCol[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] = curBrick.shape;
			//console.log ( (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 );
	    }
	}
};

var newBrick = function () {
	curBrick.x = 4;
	curBrick.y = 0;
	
	curBrick.shape = nextBrick.shape;
	curBrick.rotation = nextBrick.rotation;
	
	nextBrick.shape = Math.floor(Math.random()*7);
	nextBrick.rotation = Math.floor(Math.random()*4);
	
	draw();
	
	if(noTouch("down") == 0)
	{
	    console.log("die");
	    pause = true;
	}
};

var clearLines = function () {
	var check, line = false, minus = 0;
	check = checkLines();
		
	if(check[0] != undefined)
	{
	    tempWall = new Array();
	    tempWall = wall;
	    
	    tempWallCol = new Array();
	    tempWallCol = wallCol;
	    
	    for(var i = 17; i >= 0; i--)
	    {
		for(var k = 0; k < check.length; k++)
		{
		    if(check[k] == i)
		    {
			//console.log("logg");
			line = true;
			break;
		    }
		}
		if(line == false)
		{
		    //console.log("logxg");
		    for(j = i*10; j < i*10+10; j++){
			wall[j+(minus*10)] = tempWall[j];
			wallCol[j+(minus*10)] = tempWallCol[j];
		    }
		}
		else
		{
		    minus++;
		    line = false;
		}
	    }
	}
};

var checkLines = function () {
	//console.log("log");
	
	var ret   = new Array();
			
	var clear = false;
	var cnt   = 0;
	
	for(var i = 0; i < 18; i++)
	{
	    clear = false;
	    for(var j = 0; j < 10; j++)
	    {
		if (wall[i*10+j] == 0){
		    clear = true;
		    break;
		}
	    }
	    if(!clear)
	    {
		ret[cnt] = i;
		cnt++;
	    }
	}
	if ( cnt > 0 )
	{
	    var tmpScore = score;
	    score = score + 100*Math.pow(2,cnt-1);
	    
	 //    var speedMod = Math.round(score/1000);
	  //   	console.log(speed + ' ' + speedMod);

		// speed += 0.2*speedMod;

		level = level + Math.round(score/1000);
		if ( level + 1 >= speed.length )
			level = speed.length;
	}
	
	return ret;
};

var endBrick = function () {
	draw();
	
	moving = 0;
		
	anotherBrickInTheWall();
	clearLines();
	newBrick();
};

var advance = function () {
	if(!pause)
	{
	    curBrick.y++;
	    if( noTouch("down") == 0 )
	    {
			curBrick.y--;
			
			// clearInterval( advanceId );

			endBrick();
						
			//setTimeout( advanceId = setInterval(advance, 500/speed), 500);
			// advanceId = setInterval(advance, 500/speed[level])
	    }
	    draw();
	}
};

var noTouchold = function () {	
	var left = 0, right = 0, down = 0, ret = "";
	for( i=0; i<16; i++ )
	{
	    if( shapes[curBrick.shape][curBrick.rotation*16+i] )
	    {	
		if( curBrick.x + i%4 > 9 )
		    right = 2;
		else if ( wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4] == 1 )
		{
		    //console.log("no toci right ");
		    right = 2;
		}
		
		if( curBrick.x + i%4 < 0 )
		    left = 4;
		else if ( wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] == 1 )
		{
		    //console.log("no toci left");
		    left = 4;
		}
		
		if( curBrick.y + Math.floor(i/4) > 17 || wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] )
		    down = 8;
		
	    }
	}
		
	return right + left + down;
};

var noTouch = function (where) {	
	var left = 0, right = 0, down = 0;
	for( i=0; i<16; i++ )
	{
	    if( shapes[curBrick.shape][curBrick.rotation*16+i] )
	    {
	  //  console.log("not if");
		if( curBrick.x + i%4 > 9 )
		{
		    //console.log("no toci right 2 ");
		    right = 1;
		}
		else if ( wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4] == 1 )
		{
		   // console.log("no toci right ");
		    right = 1;
		}
		
		if( curBrick.x + i%4 < 0 )
		    left = 1;
		else if ( wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] == 1 )
		{
		    //console.log("no toci left");
		    left = 1;
		}
		
		if( curBrick.y + Math.floor(i/4) > 17 || wall[ (curBrick.y + Math.floor(i/4))  * 10 + curBrick.x + i%4 ] )
		    down = 1;
		
	    }
	}
	
	//console.log ("not " + where);
	if( where == "right" && right == 1)
	{
	    //console.log("right blocked");
	    return 0;
	}
	if( where == "left" && left == 1)
	{
	    //console.log("left blocked");
	    return 0;
	}
	if( where == "down" && down == 1)
	{
	    return 0;
	}
	if ( where == "rotate" && (right == 1 || left == 1 || down == 1))
	{
	    console.log("rotate");
	    return 0;
	}
	//console.log ("ret 1");
	return 1;
		
	//return right + left + down;
};

var move = function () {
	if ( !pause && moving != 0 )
	{
	   
	    switch ( moving )
	    {
		case 1:
		    curBrick.x++;
		    //console.log("no toci = " + noTouch() );
		    if ( noTouch("right") == 0 )
		    {
			//console.log (curBrick.x);
			curBrick.x--;
		    }
		    draw();
		    break;
		case -1:
		    curBrick.x--;
		    //console.log("no toci 2 = " + noTouch() );
		    if ( noTouch("left") == 0 )
		    {
			//console.log(noTouch());
			curBrick.x++;	
		    }
		    draw();
		    break;
		case 2:
		    curBrick.y++;
		    //console.log("no toci = 3 " + noTouch() );
		    if( noTouch("down") == 0 )
		    {
			curBrick.y--;
		    }
		    draw();
		    break;
	    }
	}
}; 

var moveOne = function ( where ) {
	if ( !pause && moving == 0 ) {
	    switch ( where )
	    {
		case 1:
		    curBrick.x++;
		    //console.log("no toci = " + noTouch() );
		    if ( noTouch("right") == 0 )
		    {
			//console.log (curBrick.x);
			curBrick.x--;
		    }
		    draw();
		    break;
		case -1:
		    curBrick.x--;
		    //console.log("no toci 2 = " + noTouch() );
		    if ( noTouch("left") == 0 )
		    {
			//console.log(noTouch());
			curBrick.x++;	
		    }
		    draw();
		    break;
		case 2:
		    curBrick.y++;
		    //console.log("no toci = 3 " + noTouch() );
		    if( noTouch("down") == 0 )
		    {
			curBrick.y--;
		    }
		    draw();
		    break;
	    }
	}
};
	    
var rotate = function () {
	if(!pause)
	{
	    //console.log( "1 rotate: " + curBrick.rotation + " noTouch: " + noTouch() );
	    if ( curBrick.rotation < 3 )
	    {
	      //  console.log( "rotate: " + curBrick.rotation + " noTouch: " + noTouch() );
		curBrick.rotation++;
		if( noTouch("rotate") == 0)
		{
		    if(noTouch("down") == 0)
		    {
			curBrick.rotation--;
		    }
		    else
		    {
			while ( noTouch("right") == 0 && noTouch("left") == 1 )
			{
			    curBrick.x--;
			}
			while ( noTouch("right") == 1 && noTouch("left") == 0)
			{
			    curBrick.x++;
			}
			//else
			    //curBrick.rotation--;
		    }
		}	
	    }
	    else if ( curBrick.rotation == 3 )
	    {
		curBrick.rotation = 0;
		if( noTouch("rotate") == 0)
		{
		    if(noTouch("down") == 0)
		    {
			curBrick.rotation = 3;
		    }
		    else
		    {
			while ( noTouch("right") == 0 && noTouch("left") == 1 )
			{
			    curBrick.x--;
			}
			while ( noTouch("right") == 1 && noTouch("left") == 0)
			{
			    curBrick.x++;
			}
			//else
			    //curBrick.rotation = 3;
		    }
		}
	    }
	    draw();
	}
};

var keydown = function(e) {
	// console.log("key " + e.keyCode);
	if ( e.keyCode == 39 )
	{
	    //moveOne( 1 );
	    //setTimeout( function() { moving = 1; } , 1000 );
	    //move("right");

		moving = 1;
	}
	else if ( e.keyCode == 37 )
	{
	    //moveOne( -1 );
	    //setTimeout( moving = -1, 300 );
	    //move("left");

		moving = -1;
	}
	else if ( e.keyCode == 40 )
	{
	    //moveOne( 2 );
	    //setTimeout( moving = 2, 300 );
	    //move("down");


		moving = 2;
	}
	//else if ( e.keyCode == 32 )
	//    hard down
};

var keyup = function(e)
{
	if( (e.keyCode == 39 && moving ==  1)
	||  (e.keyCode == 37 && moving == -1)
	||  (e.keyCode == 40 && moving ==  2) )
	{
	    //console.log("uppy");
	    moving = 0;
	}
	if ( e.keyCode == 38 )
	    rotate();
	if ( e.keyCode == 27)
	{
	    pause = !pause;
	    draw();
	}
};

var pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', function(){
	pause = !pause;
	draw();
}, false);

var newButton = document.getElementById('newGame');
newButton.addEventListener('click', function(){
	ini();
}, false);

var themeButton = document.getElementById('theme');
themeButton.addEventListener('click', function(){
	if(theme < 5)
		theme++;
	else
		theme = 0;
	document.getElementById('canvas').style.border = "8px solid " + colors[theme][10];
	draw();
}, false);

var levelButton = document.getElementById('level');
levelButton.addEventListener('click', function(){
	// ini();
	// console.log('moar speed ' + speed[level] + " " + speed.length);
	pause = 1;
	if(level + 1 >= speed.length )
		level=-1;
	setSpeed(speed[++level]);

	draw();
}, false);

// window.onload = oneTimeIni();
window.onload = ini();