$(document).ready(function() {

	"use strict";

    var log = function (l) {
        console.log(l);
    };

    var tokk = "";

	DZ.init({
		appId  : '129045',
		channelUrl : 'http://darcu.net/wip/deez_api/channel.html',
		
		player : {
				onload : function () {
					log("player loaded");
				}                
			}
	});

	DZ.getLoginStatus(function(response) {
		if (response.authResponse) {				
			DZ.api('/user/me', function(data) {
				console.log('Good to see you, ' + data.name + '.');
                $("#userLogin").remove();
				$('#nowplaying').after('<input type="button" class="statusbar ctrl login" id="userLogoff" value="' + data.name + '">');
			});

            // log("tok " + response.authResponse.accessToken);
            tokk = response.authResponse.accessToken;

		} else {
            $("#userLogoff").remove();
			$('#nowplaying').after('<input type="button" class="statusbar ctrl login" id="userLogin" value="login">');
		}
	});

	$(document).on('click', '#userLogoff', function() {
		DZ.logout();
        $("#userLogoff").remove();
		$('#nowplaying').after('<input type="button" class="statusbar ctrl login" id="userLogin" value="login">');
	});

	$(document).on('click', '#userLogin', function() {
		DZ.login(function(response) {
		   if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');
			DZ.api('/user/me', function(data) {
				console.log('Good to see you, ' + data.name + '.');
                $("#userLogin").remove();
				$('#nowplaying').after('<input type="button" class="statusbar ctrl login" id="userLogoff" value="' + data.name + '">');
			});

            tokk = response.authResponse.accessToken;
		} else {
			 console.log('User cancelled login or did not fully authorize.');
		   }
		 }, {
            perms: 'email'
        });
	});
	
	/*
	if(loggedIn) {
		$('#awesomeheader').append('<div id="username" class="inline">' + data.name + '</div><input type="button" value="Logoff" id="logoff" class="inline">');
		$(document).on('click', '#logoff', function() {
			DZ.logout;
		});
	} else {
		$('#awesomeheader').append('<input type="button" value="Login" id="login">');
		$(document).on('click', '#login', function() {
			DZ.login(function(response) {
			   if (response.authResponse) {
				 console.log('Welcome!  Fetching your information.... ');
				 DZ.api('/user/me', function(response) {
				   console.log('Good to see you, ' + response.name + '.');
				   $('#awesomeheader').append('<div id="username" class="inline">' + username + '</div><input type="button" value="Logoff" id="logoff" class="inline">');
				});
			} else {
				 console.log('User cancelled login or did not fully authorize.');
			   }
			 }, {perms: 'email'});
		});
	}
		
	*/

		
	/*DZ.api('/user/me', function(response){
		console.log(response.name);
	});


	$('#login').click(function() {
			DZ.login(function(response) {
			   if (response.authResponse) {
				 console.log('Welcome!  Fetching your information.... ');
				 DZ.api('/user/me', function(response) {
				   console.log('Good to see you, ' + response.name + '.');
				 });
			   } else {
				 console.log('User cancelled login or did not fully authorize.');
			   }
			 }, {perms: 'email'});
	});

	*/



/***********/


    function Queue(c, l, uiInsert, uiRemove) {
        this.c = c;
        this.l = l;

        this.insertToList = function (track, index) {
            this.l[index] = track;
            uiInsert(this, track, index);
        };

        this.pushToList = function (track, index) {
            if (arguments.length < 2 || index >= this.l.length) {
                this.insertToList(track, this.l.length);
            } else {
                this.l.push(this.l[this.l.length]);
                var i;
                for (i = this.l.length - 1; i > index; i -= 1) {
                    this.insertToList(track, i);
                }
                this.insertToList(track, index);
            }
        };

        this.removeFromList = function (index) {
            this.l.splice(index, 1);
            uiRemove(this, index);
        };
    }

    function CurrentPlaylist(l) {
        var that = this,
            index = null;
        var list = [];
        this.lId = [];
        this.t = null;
        this.ct = null;
        this.cto = null;
        this.paused = true;
        this.repeat = 0;

        Object.defineProperties(CurrentPlaylist.prototype, {"l": {
            get : function () {
                return list;
            },
            set : function (val) {
                list = val;
                for (var i = 0; i < list.length; i++){
                	this.lId[i] = list[i].id;
                }
            },
            configurable: false
        }});

        Object.defineProperties(CurrentPlaylist.prototype, {"i": {
            get : function () {
                return index;
            },
            set : function (val) {
                index = val;
                this.ct = this.l[index];
            },
            configurable: false
        }});

        this.playTrack = function (trackIndex, q) {
            // if (q) { var k; for (k in q) { this[k] = q[k]; } }
            if (q) {
                this.l = q.l;
                log(this.l[selectedIndex].artist.name + ' - this.l | q.l - ' + q.l[selectedIndex].artist.name);
            }
            if (trackIndex !== undefined) { this.i = trackIndex; }
            if (this.lId) { DZ.player.playTracks(this.lId, index, function(respon){}); }
        };

        this.playSelectedTrack = function () { 
            this.playTrack(selectedIndex, pickList($('.selected').parent())); 
        };

        this.playPrevTrack = function () {
            if (index === 0) {
                if (this.repeat === 1) {
                    this.playTrack(this.l.length - 1);
                } else {
                    this.playTrack(0);
                }
            } else if (this.repeat === 2) {
                this.playTrack(index);
            } else {
            	this.i -= 1;
                DZ.player.prev();
            }
        };

        this.playNextTrack = function () {
            if (index === this.l.length - 1) {
                if (this.repeat === 1) { // if end of playlist and repeat playlist is enabled
                    this.playTrack(0);
                } else {
                    this.playTrack(index);
                }
            } else if (this.repeat === 2) { // if repeat track
                this.playTrack(index);
            } else {
            	this.i += 1;
            	DZ.player.next();    
            }
        };

        this.togglePause = function () {
            if (!this.paused) {
            	this.paused = !this.paused;
            	DZ.player.pause();
            } else {
            	this.paused = !this.paused;
            	DZ.player.play();
            }
        };

        this.setVolume = function () {
            if (this.cto !== undefined) {
                DZ.player.setVolume($(".volume").val());
            }
        };

        // this.getInfo = function (index) {
        //     log(list[index] + ' - ' + list[0]);
        //     return list[index];
        // };
    }

    function UI() {
        this.insertToList = function (q, track, index) {
            if ($(q.c + ' li').length) {
                $(q.c + ' li').eq(index - 1).after('<li class="playlistitem" id="tr' + index + '"><a class="artist" href="#">' + track.artist.name + '</a> - ' + track.title + '<span class="listuser">' + track.album.title + '</span><a href="#" id="playbutton" class="listbutton">►</a>' + (q.c === '.searchlist' ? '<a href="#" id="addbutton" class="listbutton">★</a>' : '<a href="#" id="moveup" class="listbutton">▲</a><a href="#" id="movedown" class="listbutton">▼</a><a href="#" id="remove" class="listbutton">&#9473;</a></li>'));
            } else {
                $(q.c).append('<li class="playlistitem" id="tr' + index + '"><a class="artist" href="#">' + track.artist.name + '</a> - ' + track.title + '<span class="listuser">' + track.album.title + '</span><a href="#" id="playbutton" class="listbutton">►</a>' + (q.c === '.searchlist' ? '<a href="#" id="addbutton" class="listbutton">★</a>' : '<a href="#" id="moveup" class="listbutton">▲</a><a href="#" id="movedown" class="listbutton">▼</a><a href="#" id="remove" class="listbutton">&#9473;</a></li>'));
            }
        };

        this.removeFromList = function (q, index) {
            $(q.c + ' li').eq(index).remove();
        };

        this.buttonPress = function () {
            switch (cp.repeat) {
            case 0:
                $('#repeat').toggleClass("active", false);
                $("#repeat").prop("value", "\u2941");
                break;
            case 1:
                $('#repeat').toggleClass("active", true);
                break;
            case 2:
                $("#repeat").prop("value", "\u2941 1");
                break;
            }

            if (cp.paused) {
                log('paused ' + cp.paused);
                $("#play").prop("value", "play");
            } else {
                log('unpaused ' + cp.paused);
                $("#play").prop("value", "pause");
            }
        };

        this.activate = function () {
            $('.list li').removeClass("active");
            $(cp.c + ' li').eq(cp.i).addClass("active");
        };

        this.select = function (listOrlistSelector, index) {
            $('.selected').removeClass("selected");
            $(pickListClass(listOrlistSelector) + ' li').eq(index).addClass("selected");

            var o = $('.selected').offset().top,
                h = $(window).height(),
                t = $(window).scrollTop();

            if (h - o + t <= 14) {
                $(window).scrollTop(t + 28);
            }
            if (t - o >= -80) {
                $(window).scrollTop(t - 28);
            }
            selectedIndex = $('.selected').prevAll('li').length;
            // log('selectedIndex ' + selectedIndex);
        };

        this.nowplaying = function () {
            if (cp.ct) {
                $("#nowplaying").html("<span>" + cp.ct.artist.name + ' - ' + cp.ct.title + "</span>");
            } else {
                $("#nowplaying").html("<span>StoPPed</span>");
            }
        };

        this.currentTimePos = function (args) {
            if (args === 'reset') {
                $("#currenttime").html('00:00 / 00:00');
            }
            if (args[0] !== undefined && args[1] !== undefined) {
                $("#currenttime").html(toMinutes(args[0]) + " / " + toMinutes(args[1]));
                if (args[0] && args[1]) {
                	// log(100 / args[1] * args[0]);
                    $(".seek").prop("value", 100 / args[1] * args[0]);
                }
            }
        };

        this.info = function (artistId) {
            // DZ.api('/artist/' + artistId, function(response) {
            //     var i = 0;
            //     for (var key in response) {
            //         log(i + ': ' + key + ' - ' + response[key]);
            //         i += 1;
            //     }

            //     // $('.info').html('<img src="' + response["picture"] + '">');
            // });

            var printReq = function () {
                log(this);
            }

            var xrs = new XMLHttpRequest();
            xrs.onreadystatechange = printReq();
            // xrs.open("get", "https://api.deezer.com/artist/" + artistId + "/?access_token=frk9NY9kXT50c48c6edce52RoqlzVpv50c48c6edce8fQ5F02c", true);
            xrs.open("get", "http://api.deezer.com/artist/311820/?access_token=" + tokk, true);
            xrs.setRequestHeader('Content-Tye', 'application/json');
            xrs.send();
            // var JSONobj = 

        }
    }

    function search() {
        // SC.get('/tracks', { q: $('#searchterm').val() }, function (tracks) {
        DZ.api('search?q=' + $('#searchterm').val(), function(response) {
            if (searchlist.l) {
                searchlist.l.splice(0, searchlist.l.length);
            }
            $('.searchlist').html("");

            var i;
            for (i = 0; i < response.data.length; i += 1) {
                if (response.data[i]) {
                    searchlist.pushToList(response.data[i]);
                }
            }
        });
    }

    var ui = new UI(),
        searchlist = new Queue(".searchlist", [], ui.insertToList, ui.removeFromList),
        playlist = new Queue(".playlist", [], ui.insertToList, ui.removeFromList),
        cp = new CurrentPlaylist([], ui.activate, ui.buttonPress, ui.nowplaying),
        selectedIndex,
        duration = null;


    function pickList(obj) {
        if (obj.hasClass("searchlist")) {
            return searchlist;
        }
        if (obj.hasClass("playlist")) {
            return playlist;
        }
        log("you have no class " + obj.attr('class'));
    }

    function pickListClass(nameOrListOrObj) { //accepts playlist arrays or DOM objects
        if (typeof nameOrListOrObj === 'string') {
            return nameOrListOrObj;
        }
        if (Object.prototype.toString.call(nameOrListOrObj) === '[object Array]') {
            if (nameOrListOrObj === searchlist) {
                return ".searchlist";
            }
            if (nameOrListOrObj === playlist) {
                return ".playlist";
            }
            throw ("you have no class name array " + nameOrListOrObj[0]);
        }
        if (nameOrListOrObj.hasClass("searchlist")) {
            return ".searchlist";
        }
        if (nameOrListOrObj.hasClass("playlist")) {
            return ".playlist";
        }
        throw ("you have no class name obj " + nameOrListOrObj.attr('class'));
    }

    function toMinutes(time) {
        var sec = Math.floor(time) % 60, 
        	min = Math.floor(time / 60);
        return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    }

    /* event handlers */
    //Enter works on search button
    $('#play').on('click', function () {
        cp.togglePause();
    });

    $('#prev').on('click', function () {
        cp.playPrevTrack();
    });

    $('#next').on('click', function () {
        cp.playNextTrack();
    });

    $('#repeat').on('click', function () {
        cp.repeat = (cp.repeat + 1) % 3;
        ui.buttonPress();
    });

    $('.volume').on('change', function () {
        cp.setVolume();
    });

    $('.seek').on('click', function (e) {
        // if (cp.cto) {
            var parentOffset = $(this).parent().offset(),
                relX = e.pageX - parentOffset.left,
                w = $(this).width(),
                s = 100 / duration * ((relX / w) * duration);
            DZ.player.seek(s);
            // ui.currentTimePos();
        // }
    });

    $('#searchbutton').click(search);
    $('#searchterm').keydown(function (e) {
        if (e.keyCode === 13) {
            search();
        }
    });

    // $(document).on('keydown', function (e) {
    //     log(e.keyCode);
    //     if (e.keyCode === 38) {
    //         e.preventDefault();
    //         if (selectedIndex - 1 >= 0) {
    //             ui.select($('.selected').parent(), selectedIndex - 1);
    //         }
    //     }
    //     if (e.keyCode === 40) {
    //         e.preventDefault();
    //         if ($('.selected')) {
    //             if (selectedIndex + 1 < $('.searchlist li').length) { ///!!!fix searchlist index
    //                 ui.select($('.selected').parent(), selectedIndex + 1);
    //             }
    //         }
    //     }
    //     if (e.keyCode === 13) {
    //         e.preventDefault();
    //         if ($('.selected')) {
    //             cp.playSelectedTrack();
    //         }
    //     }
    // });

    //playlist item click
    $('.list').on('click', 'li', function () {
        ui.select($(this).parent(), $(this).prevAll('li').length);
    });

    $('.list').on('dblclick', 'li', function () {
        cp.playSelectedTrack();
    });





    $('.list').on('click', 'a.artist', function () {
        ui.select($(this).parent().parent(), $(this).prevAll('li').length);

        // cp.getInfo(selectedIndex);
        var list = pickList($(this).parent().parent());
        log(  list.l[selectedIndex].artist.id + ' - ' + list.l[selectedIndex].artist.link );

        ui.info(list.l[selectedIndex].artist.id);
    });






    $('.list').on('click', '#playbutton', function () {
        cp.playSelectedTrack();
    });

    $('.list').on('click', '#addbutton', function () {
        playlist.pushToList(searchlist.l[$(this).parent().prevAll('li').length]);
    });

    $('.list').on('click', '#moveup', function () {
        var sel = $('.selected');
        if (sel.prevAll('li').length - 1 >= 0) {
            var indx = sel.prevAll('li').length,
                list = pickList(sel.parent()),
                tmpList = list[indx - 1];
            list[indx - 1] = list[indx];
            list[indx] = tmpList;

            ui.select(sel.parent(), indx - 1);
        }
    });

    $('.list').on('click', '#remove', function () {
        log('remove');
        cp.removeFromList($(this).parent(), $(this).parent().prevAll('li').length);
    });

    $(document).on('mouseleave', function () {
        $('.selected').toggleClass('out', true);
    });

    $(document).on('mouseenter', function () {
        $('.selected').toggleClass('out', false);
    });



/***********/

	
	
	//player events
	function event_listener_append() {
		var pre = document.getElementById('event_listener');
		var line = [];
		for (var i = 0; i < arguments.length; i++) {
			line.push(arguments[i]);
		}
		pre.innerHTML += line.join(' ') + "\n" + "<br>";
	};
	 
	DZ.Event.subscribe('current_track', function(arg, evt_name){
		event_listener_append('current_track', arg.index, arg.track.title);
		
		cp.i = arg.index;
        cp.paused = 

        ui.buttonPress();
        ui.nowplaying();
		ui.activate();

        document.title = arg.track.title + ' - ' + arg.track.artist.name + 'Deezer Player';
	});

	DZ.Event.subscribe('player_position', function(args, evt_name){
		// event_listener_append('player_position', arg.index, arg.artist.name, arg.track.title);
		// log(args);
		ui.currentTimePos(args);
		duration = args[1];
	});

    DZ.Event.subscribe('player_paused', function(args, evt_name) {
        cp.paused = !cp.paused;
        ui.buttonPress();
    });
	
    // work
    // setInterval(function () { ui.currentTimePos(); }, 1000);
    search(); // auto search
    // Search();
});