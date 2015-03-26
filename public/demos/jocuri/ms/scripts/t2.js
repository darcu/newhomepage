var _canvas = document.getElementById('canvas');
var _canvasContext = null;
var ga = 0.0;
if( _canvas && _canvas.getContext ){
	_canvasContext = _canvas.getContext('2d');			
}
else{
	alert("");
	//exit();
}

//cell object
Cell = function () {
	this.cx = 0;
	this.cy = 0;
	this.state = 1; //empty 0, cover 1, flag 2, question 3
	this.mine = false;
	this.minesNear = 0;
}

board = function() {
	var col = 9;
	var row = 9;
	var mines = 10;
	var flaggedMines = 0;
	var end = 0;
	var uncovered = 0;
	var paddX = 0;
	var paddY = 0;
	
	this.iniCells = function (){
		paddY = (_canvas.height - (row*32))/2;
		paddX = (_canvas.width - (col*32))/2;
		
		this.cell = [];
		for(i=0; i<col; i++){
			this.cell[i] = [row];
		}
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.cell[i][j] = new Cell();
			this.cell[i][j].cx = i*32 + paddX;
			this.cell[i][j].cy = j*32 + paddY;
		}
	}
	
	this.ini = function(){
		switch(difficulty){
				case 0:
						col = 9;
						row = 9;
						mines = 10;
						break;
				case 1:
						col = 16;
						row = 16;
						mines = 40;
						break;
				case 2:
						col = 30;
						row = 16;
						mines = 99;
						break;
				case 3:
						col = 30;
						row = 30;
						mines = 250;
						break;
		}
		
		this.end = 0;
		this.iniCells();
		this.randMines();
		this.countMines();
		this.drawBoard();
		document.getElementById("mines").innerHTML = "Mines " + (mines-flaggedMines);
	};
	this.randMines = function(){
		var minesToPlace = mines;
		while(minesToPlace){
			var px = Math.floor(Math.random()*col);
			var py = Math.floor(Math.random()*row);
			if(!(this.cell[px][py].mine)){
				this.cell[px][py].mine = true;
				minesToPlace--;
			}
		}
	};
	this.countMines = function(){
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			if(!this.cell[i][j].mine){
				for(a = Math.max(i-1, 0); a <= Math.min(i+1, col-1); a++)
				    for(b = Math.max(j-1, 0); b <= Math.min(j+1, row-1); b++){
					//console.log(a+" : "+b);
					if(!(a == i && b == j)){
						if(this.cell[a][b].mine == true){
							this.cell[i][j].minesNear++;
						}
					}
				}
			}
		}	
	};
	this.drawBoard = function(){
		//clear canvas
		//canvas.width = canvas.width
		_canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		
		_canvasContext.strokeStyle = "#aaa";
		_canvasContext.strokeRect(paddX - 4, paddY - 4, _canvas.width - paddX*2 + 8, _canvas.height - paddY*2 + 8);
		
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.drawCell(i, j);
						
		}
	};
	this.drawCell = function(dx, dy){
		//is covered
		if(this.cell[dx][dy].state == 1){
			_canvasContext.drawImage(atlas, 32, 64, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
		}
		//is flag
		else if(this.cell[dx][dy].state == 2){
			_canvasContext.drawImage(atlas, 64, 64, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
		}
		//is ?
		else if(this.cell[dx][dy].state == 3){
			_canvasContext.drawImage(atlas, 96, 64, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
		}
		//is mine
		else if(this.cell[dx][dy].mine){
			_canvasContext.drawImage(atlas, 0, 64, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
		}
		//is number
		else if(this.cell[dx][dy].state == 0){
			switch (this.cell[dx][dy].minesNear){
			case 0:
				_canvasContext.fillStyle = "#eee"
				_canvasContext.fillRect(this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 1:
				_canvasContext.drawImage(atlas, 0, 0, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 2:
				_canvasContext.drawImage(atlas, 32, 0, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 3:
				_canvasContext.drawImage(atlas, 64, 0, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 4:
				_canvasContext.drawImage(atlas, 96, 0, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 5:
				_canvasContext.drawImage(atlas, 0, 32, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 6:
				_canvasContext.drawImage(atlas, 32, 32, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 7:
				_canvasContext.drawImage(atlas, 64, 32, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			case 8:
				_canvasContext.drawImage(atlas, 96, 32, 32, 32, this.cell[dx][dy].cx, this.cell[dx][dy].cy, 32, 32);
				break;
			default:
				_canvasContext.drawImage(qImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			};
		}
	};
	this.flip = function(i, j) {
		for(var a = Math.max(i-1, 0); a <= Math.min(i+1, col-1); a++){
		for(var b = Math.max(j-1, 0); b <= Math.min(j+1, row-1); b++){
			if(this.cell[a][b].state == 1 && !this.cell[a][b].mine){
				this.cell[a][b].state = 0;
				//this.covered--;
				if(this.cell[a][b].minesNear == 0)
					this.flip(a, b);
			}
		}}
	};
	
	//this.mouseMove = function() {
	//	var coordX = Math.floor((event.pageX - _canvas.offsetLeft - paddX)/32);
	//	var coordY = Math.floor((event.pageY - _canvas.offsetTop  - paddY)/32);
	//	
	//	if(coordX >= 0 && coordY >= 0 && coordX < col && coordY < row){
	//			console.log(this.cell[coordX][coordY].state + " ga " + _canvasContext.globalAlpha);
	//		
	//			_canvasContext.globalAlpha = 0.5;
	//			console.log(" ga " + _canvasContext.globalAlpha);
	//			this.drawCell(coordX, coordY);
	//			_canvasContext.globalAlpha = 1.0;
	//	}
	//};
	
	
	this.mouse1 = function(e){
	if(!end){
		var coordX = Math.floor((e.pageX - _canvas.offsetLeft - paddX)/32);
		var coordY = Math.floor((e.pageY - _canvas.offsetTop  - paddY)/32);
		
		//console.log("x " + coordX + " y " + coordY + " offsetLeft " + _canvas.offsetLeft + " offsetTop " + _canvas.offsetTop + " eX " + e.pageX + " evX " + (e.pageX - _canvas.offsetLeft - paddX));
		if(coordX >= 0 && coordY >= 0 && coordX < col && coordY < row){
				//console.log("clicky");
				if(this.cell[coordX][coordY].state == 1){	
					this.cell[coordX][coordY].state = 0;
					//this.covered--;					
					if(this.cell[coordX][coordY].mine){
						//console.log("ouch, you die");
						this.youDie();
						this.drawCell(coordX, coordY);
					}
					else if(this.cell[coordX][coordY].minesNear == 0){//zero mines
						this.flip(coordX, coordY);
						this.drawBoard();
					}
					else {
						this.cell[coordX][coordY].state = 0;
						//this.covered--;
						
						this.drawCell(coordX, coordY);
					}
					this.tryWin();
				}
		}
    }
	else {
		ini();
	}
	};
	this.mouse2 = function(e){
	if(!end){
		var coordX = Math.floor((e.pageX - _canvas.offsetLeft - paddX)/32);
		var coordY = Math.floor((e.pageY - _canvas.offsetTop - paddY)/32);
		
		if(coordX >= 0 && coordY >= 0 && coordX < col && coordY < row){
		//is hidden set to flag
		if(this.cell[coordX][coordY].state == 1){
			//console.log("1 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 2;
			this.drawCell(coordX, coordY);
			
			flaggedMines++;
			document.getElementById("mines").innerHTML = "Mines " + (mines-flaggedMines);
			
			//if(flaggedMines == mines){
			//	console.log("try");
			//	this.tryWin();
			//}
		}
		//is flag set to ?
		else if(this.cell[coordX][coordY].state == 2){
			//console.log("2 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 3;
			this.drawCell(coordX, coordY);
			
			flaggedMines--;
			document.getElementById("mines").innerHTML = "Mines " + (mines-flaggedMines);
		}
		//is ? set to hidden
		else if(this.cell[coordX][coordY].state == 3){
			//console.log("3 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 1;
			this.drawCell(coordX, coordY);
		}
		
		//console.log("mouse2 x " + coordX + " y " + coordY + " state " + this.cell[coordX][coordY].state);	
		
		}
	}
	else {
		ini();
	}
	};
	this.tryWin = function(){
		for(var i = 0; i < col; i++)
		for(var l = 0; l < row; l++){
				if(this.cell[i][l].state == 0)
						uncovered++;
		}
		if((col*row-uncovered) == mines){
		for(i = 0; i < col; i++)
		for(l = 0; l < row; l++){
				if(this.cell[i][l].state == 2 && !this.cell[i][l].mine)
					return false;
				}
				this.win();
		}
		else {
				uncovered = 0;
				return false;
		}
	};
	this.win = function(){
		console.log("HAHA you win!");
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.cell[i][j].state = 0;
		}
		this.drawBoard();
		end = 1;
		startTime = null;
		document.getElementById("mines").innerHTML = "Mines 0";
		//alert("You win asshole!! Click on the board to play some more.")
	};
	this.youDie = function (){
		console.log("HAHA you dead!");
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.cell[i][j].state = 0;
		}
		this.drawBoard();
		end = 1;
		startTime = null;
		//alert("You lose asshole!! Click on the board to play some more.")
	};
};
//img
var atlas = new Image();
atlas.src = "images/atlas default.png";
//atlas.onload = Board.drawBoard();
var curTheme = 0;
var theme = function(){
		switch(curTheme){
				case 0:
						atlas.src = "images/atlas white.png";
						curTheme = 1;
						document.getElementById("theme").value = "Whitey";
						Board.drawBoard();			
						break;
				case 1:
						atlas.src = "images/atlas red.png";
						curTheme = 2;
						document.getElementById("theme").value = "Red";
						Board.drawBoard();
						break;
				case 2:
						atlas.src = "images/atlas default.png";
						curTheme = 0;
						document.getElementById("theme").value = "Darc";
						Board.drawBoard();
						break;
		}
};

var startTime = 0;
var time = function (){
if(startTime){	
	var cTime = new Date().getTime();
	var diff = (cTime - startTime)/1000;
	var min = "0"+String(Math.floor(diff/60));
	var sec = "0"+String(Math.floor(diff%60));
	
	document.getElementById("time").innerHTML = "<span>" + "Time: " + min.substring(min.length - 2) + ":" + sec.substring(sec.length - 2) + "</span>";
	setTimeout(time, 1000);
}
};

var difficulty = 0;
var diff = function() {
		switch(difficulty){
				case 0:
						document.getElementById("diff").value = "Medium";
						difficulty = 1;						
						_canvas.width = 520;
						_canvas.height = 520
						ini();
						break;
				case 1:
						document.getElementById("diff").value = "Expert";
						difficulty = 2;
						_canvas.width = 968;
						_canvas.height = 520;
						ini();
						break;
				case 2:
						document.getElementById("diff").value = "Epic";
						difficulty = 3;
						_canvas.width = 968;
						_canvas.height = 968;
						ini();
						break;
				case 3:
						document.getElementById("diff").value = "Easy";
						difficulty = 0;
						_canvas.width = 320;
						_canvas.height = 320;
						ini();
						break;
		}
};

var ini = function(){
	Board = new board;
	Board.ini();
	
	startTime = new Date().getTime();	
	time();
	
	document.getElementById('canvas').onclick = function (e) {
		Board.mouse1(e);
		return false;
	};
	document.getElementById('canvas').oncontextmenu = function (e) {
		Board.mouse2(e);
		return false;
	};
	//document.getElementById('canvas').onmousemove = function () {
	//	Board.mouseMove();
	//	return false;
	//}
};