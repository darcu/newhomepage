<!DOCTYPE html>
<html>
<head>
	<?php include('../../head.php');?>
	<title>Quqdtris</title>
	<style type="text/css">
		@font-face {
			font-family: Digital-7;
			src: local(☺), url(/apps/calc/digital-7.ttf) format(truetype);
		}
		body { 
			height: 100%;
	        text-align: center;
			background:
				linear-gradient(135deg, #446 22px, #224 22px, #224 24px, transparent 24px, transparent 67px, #224 67px, #224 69px, transparent 69px),
				linear-gradient(225deg, #446 22px, #224 22px, #224 24px, transparent 24px, transparent 67px, #224 67px, #224 69px, transparent 69px)0 64px;
			background-color:#446;
			background-size: 64px 128px;
		} /*#164466 269*/
		
		#wrapper {
			display: inline-block;
					
			margin: 30px auto;
			padding: 15px;
				
			box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.4);
			background-color: #fff;		
			border-radius: 8px;
			/*border: 15px solid rgba(255,255,255,0.6);*/
		}

		#shadow {
			box-shadow: inset 0px 0px 1px 1px rgba(0,0,0,0.4);
			padding: 4px;
			background: #557;
			/*background: rgba(85,85,119,0.6);*/
		}

		canvas {
			display: block;
			margin: 0;
			border: 8px solid #557;
			/*border: 8px solid rgba(85,85,119,0.6);*/

		}

		#buttonbar {
			padding-bottom: 8px;
		}

		.button {
			color: #fff;
			display: inline-block;
			position: relative;
			cursor: pointer;

			width: 94px;
			height: 20px;			
			padding: 10px;

			font-family: Digital-7;
			font-size: 24px;

			/*background: #224;*/

			margin: 4px;
			border-radius: 4px;

			box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.4);
		}

		.button:hover {
			top: 1px;
			left: 1px;
			/*background: #303050;*/
			/*box-shadow: 0px 0px 0px 2px #fff;*/
			/*box-shadow: none;*/
			box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.4);
		}
		.button:active {
			color: rgba(255,255,255,0.6);
		}

		#newGame {
			background: #b00;
		}

		#pause {
			background: #fb0;
		}

		#theme {
			background: #0b0;
		}

		#level {
			background: #00b;
		}

	</style>
</head>
<body>
	<?php include('../../nav.php');?>
	<div id="wrapper">
		<div id="shadow">
			<canvas id="canvas">Canvas not supported.</canvas>
			<div id="buttonbar">
				<div class="button" id="newGame">New Game</div><div class="button" id="pause">Pause</div><div class="button" id="theme">Theme</div><div class="button" id="level">Level!</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="newT.js"></script>
</body>
</html>