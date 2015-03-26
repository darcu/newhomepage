<!DOCTYPE html>
<html>
<head>
	<?php include('../../head.php');?>
	<title>Deezer Player</title>
	<!-- <link rel="icon" type="image/png" href="SoundCloud_Color32.png"> -->
	<link rel="stylesheet" type="text/css" href="style.css" />
	<!-- <script src="/lib/jquery-1.10.2.min.js"></script> -->
	<script src="http://e-cdn-files.deezer.com/js/min/dz.js"></script>
	<script src="scripts.js"></script>
</head>
<body>
<?php //include('../../nav.php');?>
<div id="container">
	<div id="header">
		<input 
			class="statusbar ctrl" id="prev" type="button" value="prev"><input 
			class="statusbar ctrl" id="play" type="button" value="play"><input 
			class="statusbar ctrl" id="next" type="button" value="next"><input 
			class="statusbar ctrl" id="repeat" type="button" value="&#10561;"><div 
			class="statusbar" id="nowplaying">stopped</div><div 
			class="statusbar" id="currenttime">00:00 / 00:00</div><!-- <progress
			class="volume" value="50" max="100"></progress> --><input
			class="volume" type="range" name="vol" min="0" max="100" value="100"></progress>
		<div id="prog">
			<progress class="seek" value="0" max="100"></progress>
		</div>
	</div>
	<div id="content">
		<!-- <div id="search"> -->
			<div id="searchbar">
				<input id="searchterm" type="text" placeholder="Enter a music" value="ellie goulding"/><input id="searchbutton" class="greybutton" type="button" value="find"/>
			</div>
			<div id="listscontainer">
				<ol class="list searchlist"></ol><ol class="list playlist"></ol><div class="list info"></div>
			</div>
		<!-- </div> -->
		<!-- <div id="queue"> -->
			<!-- <ul class="list playlist"></ul> -->
		<!-- </div> -->
	</div>
	<!-- <div id="navbar">
		<input class="button" id="now" type="button" value="now" >
		<input class="button" id="search_button" type="button" value="search">
		<input class="button" id="library" type="button" value="library">
	</div> -->

	<div id="event_listener"></div>
	<!--div id='player'></div-->
	<div id="dz-root"></div>
	<div id="player"></div>
</div>
</body>
</html>