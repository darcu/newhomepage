var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.font = '28px Squada One';

var cfg = {
	s: 32,
	d: [{
		title: 'Easy',
		col: 9,
		row: 9,
		mines: 10
	}, {
		title: 'Medium',
		col: 16,
		row: 16,
		mines: 40
	}, {
		title: 'Expert',
		col: 30,
		row: 16,
		mines: 99
	}, {
		title: 'Epic',
		col: 30,
		row: 30,
		mines: 250
	}],
	// difficulty index
	di: 0,
	// current difficulty
	cd: {},
	// bg theme
	mt: ['#eee', '#3f51c1', '#286300', '#af090d', '#840284', '#040284', '#844204', '#848284', '#040204'],
	// color theme
	t: [{
		title: 'Darc',
		fgColor: '#aaa',
		bgColor: '#444',
		stColor: '#eee'
	}],
	// color theme index
	ti: 0,
	// current color theme
	ct: {}
};

//cell object
var Cell = function() {
	this.cx = 0;
	this.cy = 0;
	this.state = 1; //empty 0, cover 1, flag 2, question 3
	this.mine = false;
	this.minesNear = 0;
}

var board = (function() {
	var col;
	var row;
	var mines;
	var flaggedMines;
	var end;
	var uncovered;
	var paddX;
	var paddY;
	var cell;
	var b = {};

	var iniCells = function() {
		paddX = (canvas.width - (col * cfg.s)) / 2;
		paddY = (canvas.height - (row * cfg.s)) / 2;

		cell = [];
		for (i = 0; i < col; i++) {
			cell[i] = [row];
		}
		for (i = 0; i < col; i++)
			for (j = 0; j < row; j++) {
				cell[i][j] = new Cell();
				cell[i][j].cx = i * cfg.s + paddX;
				cell[i][j].cy = j * cfg.s + paddY;
			}
	}

	var randMines = function() {
		var minesToPlace = mines;
		while (minesToPlace) {
			var px = Math.floor(Math.random() * col);
			var py = Math.floor(Math.random() * row);
			if (!(cell[px][py].mine)) {
				cell[px][py].mine = true;
				minesToPlace--;
			}
		}
	};

	var countMines = function() {
		for (i = 0; i < col; i++)
			for (j = 0; j < row; j++) {
				if (!cell[i][j].mine) {
					for (a = Math.max(i - 1, 0); a <= Math.min(i + 1, col - 1); a++)
						for (b = Math.max(j - 1, 0); b <= Math.min(j + 1, row - 1); b++) {
							if (!(a === i && b === j)) {
								if (cell[a][b].mine === true) {
									cell[i][j].minesNear++;
								}
							}
						}
				}
			}
	};

	/*
	args = {
		text: '',
		txColor: '',
		fgColor: '',
		bgColor: '',
		stColor: ''
	}
	*/
	var drawSquare = function(x, y, args) {
		ctx.fillStyle = args.bgColor || '#eee';
		ctx.fillRect(x, y, cfg.s, cfg.s);

		if (args.bgColor && args.fgColor) {
			// grad
			// var grad = ctx.createLinearGradient(x, y, x + cfg.s, y + cfg.s);
			var grad = ctx.createRadialGradient(x, y, cfg.s, x + cfg.s, y + cfg.s, cfg.s / 2);
			grad.addColorStop(0, args.fgColor);
			grad.addColorStop(1, args.bgColor);

			ctx.fillStyle = grad;
			ctx.fillRect(x, y, cfg.s, cfg.s);
		}

		if (args.stColor) {
			ctx.strokeStyle = args.stColor;
			ctx.strokeRect(x, y, cfg.s, cfg.s);
		}

		if (args.text) {
			var w = ctx.measureText(args.text).width;
			ctx.textBaseline = 'top';

			ctx.fillStyle = args.txColor || '#eee';
			ctx.fillText(args.text, x + (cfg.s - w) / 2, y + 2);
		}
	};

	var drawCell = function(c) {
		//is covered
		if (c.state === 1) {
			// ctx.drawImage(atlas, cfg.s, 64, cfg.s, cfg.s, c.cx, c.cy, cfg.s, cfg.s);
			drawSquare(c.cx, c.cy, cfg.ct);
		}
		//is flag
		else if (c.state === 2) {
			ctx.drawImage(atlas, 64, 64, cfg.s, cfg.s, c.cx, c.cy, cfg.s, cfg.s);
		}
		//is ?
		else if (c.state === 3) {
			ctx.drawImage(atlas, 96, 64, cfg.s, cfg.s, c.cx, c.cy, cfg.s, cfg.s);
		}
		//is mine
		else if (c.mine) {
			drawSquare(c.cx, c.cy, {
				text: '☢',
				txColor: '#000',
				bgColor: '#ff8'
			});
		}
		//is number
		else if (c.state === 0) {
			drawSquare(c.cx, c.cy, {
				text: c.minesNear,
				txColor: cfg.mt[c.minesNear]
			});
			// drawSquare(c.cx, c.cy, , );
		}
	};

	var flip = function(i, j) {
		for (var a = Math.max(i - 1, 0); a <= Math.min(i + 1, col - 1); a++) {
			for (var b = Math.max(j - 1, 0); b <= Math.min(j + 1, row - 1); b++) {
				if (cell[a][b].state === 1 && !cell[a][b].mine) {
					cell[a][b].state = 0;
					if (cell[a][b].minesNear === 0)
						flip(a, b);
				}
			}
		}
	};

	canvas.addEventListener('click', function(e) {
		if (!end) {
			var coordX = Math.floor((e.pageX - canvas.offsetLeft - paddX) / cfg.s);
			var coordY = Math.floor((e.pageY - canvas.offsetTop - paddY) / cfg.s);

			if (coordX >= 0 && coordY >= 0 && coordX < col && coordY < row) {
				if (cell[coordX][coordY].state === 1) {
					cell[coordX][coordY].state = 0;
					if (cell[coordX][coordY].mine) {
						youDie();
						drawCell(cell[coordX][coordY]);
					} else if (cell[coordX][coordY].minesNear === 0) { //zero mines
						flip(coordX, coordY);
						drawBoard();
					} else {
						cell[coordX][coordY].state = 0;
						//covered--;

						drawCell(cell[coordX][coordY]);
					}
					tryWin();
				}
			}
		} else {
			ini();
		}
	});

	canvas.addEventListener('contextmenu', function(e) {
		e.preventDefault();
		if (!end) {
			var coordX = Math.floor((e.pageX - canvas.offsetLeft - paddX) / cfg.s);
			var coordY = Math.floor((e.pageY - canvas.offsetTop - paddY) / cfg.s);

			if (coordX >= 0 && coordY >= 0 && coordX < col && coordY < row) {
				//is hidden set to flag
				if (cell[coordX][coordY].state === 1) {
					cell[coordX][coordY].state = 2;
					drawCell(cell[coordX][coordY]);

					flaggedMines++;
					document.getElementById('mines').innerHTML = 'Mines ' + (mines - flaggedMines);
				}
				//is flag set to ?
				else if (cell[coordX][coordY].state === 2) {
					cell[coordX][coordY].state = 3;
					drawCell(cell[coordX][coordY]);

					flaggedMines--;
					document.getElementById('mines').innerHTML = 'Mines ' + (mines - flaggedMines);
				}
				//is ? set to hidden
				else if (cell[coordX][coordY].state === 3) {
					cell[coordX][coordY].state = 1;
					drawCell(cell[coordX][coordY]);
				}
			}
		} else {
			ini();
		}
	});

	var tryWin = function() {
		for (var i = 0; i < col; i++)
			for (var l = 0; l < row; l++) {
				if (cell[i][l].state === 0)
					uncovered++;
			}
		if ((col * row - uncovered) === mines) {
			for (i = 0; i < col; i++)
				for (l = 0; l < row; l++) {
					if (cell[i][l].state === 2 && !cell[i][l].mine)
						return false;
				}
			win();
		} else {
			uncovered = 0;
			return false;
		}
	};

	var win = function() {
		console.log('HAHA you win!');
		for (i = 0; i < col; i++)
			for (j = 0; j < row; j++) {
				cell[i][j].state = 0;
			}
		drawBoard();
		end = 1;
		startTime = null;
		document.getElementById('mines').innerHTML = 'Mines 0';
		//alert('You win asshole!! Click on the board to play some more.')
	};

	var youDie = function() {
		console.log('HAHA you dead!');
		for (i = 0; i < col; i++)
			for (j = 0; j < row; j++) {
				cell[i][j].state = 0;
			}
		drawBoard();
		end = 1;
		startTime = null;
		//alert('You lose asshole!! Click on the board to play some more.')
	};

	var drawBoard = function() {
		//clear canvas
		//canvas.width = canvas.width
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#aaa';
		ctx.strokeRect(paddX - 4, paddY - 4, canvas.width - paddX * 2 + 8, canvas.height - paddY * 2 + 8);

		for (i = 0; i < col; i++)
			for (j = 0; j < row; j++) {
				drawCell(cell[i][j]);
			}
	};

	b.drawBoard = drawBoard;

	b.ini = function() {
		flaggedMines = 0;
		end = 0;
		uncovered = 0;
		paddX = 0;
		paddY = 0;

		col = cfg.cd.col;
		row = cfg.cd.row;
		mines = cfg.cd.mines;

		iniCells();
		randMines();
		countMines();
		drawBoard();
		document.getElementById('mines').innerHTML = 'Mines ' + (mines - flaggedMines);
	};

	return b;
}());

//img
var atlas = new Image();
atlas.addEventListener('load', function() {
	board.drawBoard();
});
atlas.src = 'images/atlas default.png';

var theme = function() {
	if (cfg.ti + 1 >= cfg.t.length) {
		cfg.ti = 0;
	} else {
		cfg.ti++;
	}
	cfg.ct = cfg.t[cfg.ti];
	document.getElementById('theme').value = cfg.ct.title;


	// switch (curTheme) {
	// 	case 0:
	// 		curTheme = 1;
	// 		document.getElementById('theme').value = 'Whitey';
	// 		atlas.src = 'images/atlas white.png';
	// 		break;
	// 	case 1:
	// 		curTheme = 2;
	// 		document.getElementById('theme').value = 'Red';
	// 		atlas.src = 'images/atlas red.png';
	// 		break;
	// 	case 2:
	// 		curTheme = 0;
	// 		document.getElementById('theme').value = 'Darc';
	// 		atlas.src = 'images/atlas default.png';
	// 		break;
	// }
};

var startTime = 0;
var time = function() {
	if (startTime) {
		var cTime = Date.now();
		var diff = (cTime - startTime) / 1000;
		var min = '0' + String(Math.floor(diff / 60));
		var sec = '0' + String(Math.floor(diff % 60));

		document.getElementById('time').innerHTML = '<div>' + 'Time: ' + min.substring(min.length - 2) + ':' + sec.substring(
			sec.length - 2) + '</div>';
		setTimeout(time, 1000);
	}
};

var changeDifficulty = function() {
	if (cfg.di + 1 >= cfg.d.length) {
		cfg.di = 0;
	} else {
		cfg.di++;
	}
	cfg.cd = cfg.d[cfg.di];

	document.getElementById('diff').value = cfg.cd.title;
	canvas.width = cfg.s * cfg.cd.col;
	canvas.height = cfg.s * cfg.cd.row;

	ini();
};

var ini = function() {
	cfg.cd = cfg.d[cfg.di];
	cfg.ct = cfg.t[cfg.ti];
	board.ini();

	startTime = Date.now();
	time();
};

ini();

document.getElementById('restart').addEventListener('click', ini);
document.getElementById('diff').addEventListener('click', changeDifficulty);
