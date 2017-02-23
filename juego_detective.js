player = {
	moveX: 0,
	moveY: 0,
	lastPressed:"down",
	pressingUp: false,
	pressingDown: false,
	pressingLeft: false,
	pressingRight: false,
	dead: false,
	shootTime: 0,
	bombPlantedTime: 0,
	foundJewels: 0
}

game_jewels = [];

window.onload = function() {
	area = new RemoteArea (CONFIG_SERVER_ADDRESS);
	renderer = new CanvasRenderer (area);
	renderer.setViewSize([16, 12]);
	renderer.setRenderSize([800, 600]);
	var container = document.getElementById ('game_container');
	window.setTimeout (function(){
		renderer.render (container, 20);
		initArchetypes ();
		initKeyListeners ();
		initPlayer ();
		initJewels ();
	}, 1000);
}

initArchetypes = function () {
		area.resourceHandler.preloadArchetype ("/res/characters/detective/01.json")
		area.resourceHandler.preloadArchetype ("/res/objects/bullet/01.json")
		area.resourceHandler.preloadArchetype ("/res/objects/bomb/01.json")
		area.resourceHandler.preloadArchetype ("/res/objects/explosion/01.json")
		area.resourceHandler.preloadArchetype ("/res/objects/jewel/01.json")
}

initKeyListeners = function () {
	window.onkeydown = function (event) {
		switch (event.keyCode) {
			case 37: //Izquierda
				event.preventDefault();
				pressLeft();
				break;
			case 38: //Arriba
				event.preventDefault();
				pressUp();
				break;
			case 39: //Derecha
				event.preventDefault();
				pressRight();
				break;
			case 40: //Abajo
				event.preventDefault();
				pressDown();
				break;
			case 32: //Espacio
				event.preventDefault();
				pressSpace();
				break;
		}
	}
	window.onkeyup = function (event) {
		event.preventDefault();
		switch (event.keyCode) {
			case 37: //Izquierda
				releaseLeft();
				break;
			case 38: //Arriba
				releaseUp();
				break;
			case 39: //Derecha
				releaseRight();
				break;
			case 40: //Abajo
				releaseDown();
				break;
			case 32: //Espacio
				releaseSpace();
				break;
			case 66: //b
				releaseB();
				break;
		}
	}
}

pressLeft = function () {
	if (player.dead) { return null; }
	player.object.speed_x = -2;
	player.pressingLeft = true;
	updatePlayer ();
}

releaseLeft = function () {
	if (player.dead) { return null; }
	player.object.speed_x = 0;
	player.pressingLeft = false;
	player.lastPressed = "left";
	updatePlayer ();
}

pressRight = function () {
	if (player.dead) { return null; }
	player.object.speed_x = 2;
	player.pressingRight = true;
	updatePlayer ();
}

releaseRight = function () {
	if (player.dead) { return null; }
	player.object.speed_x = 0;
	player.pressingRight = false;
	player.lastPressed = "right";
	updatePlayer ();
}

pressUp = function () {
	if (player.dead) { return null; }
	player.object.speed_y = -2;
	player.pressingUp = true;
	updatePlayer ();
}

releaseUp = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 0;
	player.pressingUp = false;
	player.lastPressed = "up";
	updatePlayer ();
}

pressDown = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 2;
	player.pressingDown = true;
	updatePlayer ();
}

releaseDown = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 0;
	player.pressingDown = false;
	player.lastPressed = "down";
	updatePlayer ();
}

pressSpace = function () {
}

releaseSpace = function () {
	if (player.dead) { return null; }
	playerShoot();
}

releaseB = function () {
	playerPlantBomb();
}

initPlayer = function () {
	var initialPos = searchSolidSurface ();
	if (initialPos == null) {
		window.alert ("No se puede iniciar el juego, no superficie solida donde pisar.");
	} else {
		createPlayer (initialPos[0], initialPos[1], onPlayerCreated);
		initPlayerConstraint();
	}
}

initJewels = function () {
	for (var jewel_number=0; jewel_number<4; jewel_number++) {
		window.setTimeout (function () {
			var pos = searchSolidSurface ();
			if (pos != null) {
				createJewel (pos[0], pos[1], onJewelCreated);
			}
		} , (jewel_number+1)*100);
	}
}

searchSolidSurface = function (surface) {
	var x;
	var y;
	var found = false;
	var retries = 0;
	while (!found && retries < 10000) {
		x = Math.floor (Math.random()*area.width);
		y = Math.floor (Math.random()*area.height);
		if (Surface.isSolid (area.getSurfaceAt (x, y))) {
			found = true;
			return [x, y];
		}
		retries++;
	}
	return null;
}

onPlayerCreated = function (object) {
	player.object = object;
	object.current_sprite = "idle_down";
	renderer.goTo (object.x-10, object.y-8)
	renderer.follow (object);
	area.collisionChecker.addCheckByAttribute (object, "isKiller", true, function (obj, target) {
		playerDie();
	});
	area.collisionChecker.addCheckByAttribute (object, "isJewel", true, function (obj, target) {
		if (isJewelForeign (target)){
			area.collisionChecker.removeCheck (obj, target);
			area.renderer.showMessage ("Esta no es la joya que estoy buscando");
		};
	});
}

playerDie = function () {
	player.dead = true;
	player.object.speed_x = 0;
	player.object.speed_y = 0;
	player.object.current_sprite = "dying_01";
	player.object.updater.update();
	area.collisionChecker.removeChecksForObject (player.object);

	window.setTimeout (function () {
		player.object.current_sprite = "dying_02";
		player.object.updater.update();
	}, 1000);

	window.setTimeout (function () {
		player.object.current_sprite = "dying_03";
		player.object.updater.update();
	}, 3000);

	window.setTimeout (function () {
		player.object.updater = null;
		area.renderer.stopFollow ();
		area.renderer.stopRenderLoop ();
	}, 3500);

	window.setTimeout (function () {
		area.renderer.showMessage ("GAME OVER");;
	}, 5000);
}

createPlayer = function (x, y, callback) {
	area.createObject(
		x, y, //position
		0, 0, //speed
		0.5, //radius
		"/res/characters/detective/01.json", //archetype
		callback //run on creation successful
	);
}

updatePlayer = function () {
	if (player.object.speed_y > 0) {
		player.object.current_sprite = "walking_down";
	} else if (player.object.speed_y < 0) {
		player.object.current_sprite = "walking_up";
	} else if (player.object.speed_x < 0) {
		player.object.current_sprite = "walking_left";
	} else if (player.object.speed_x > 0) {
		player.object.current_sprite = "walking_right";
	} else {
		player.object.current_sprite = "idle_"+player.lastPressed;
	}
	player.object.updater.update();
}

initPlayerConstraint = function () {
	/* Prevent player walk on the water */
	window.setInterval (function () {
		if (player.object.speed_x > 0) {
			var nextSurface = area.getSurfaceAt (Math.floor (player.object.x+player.object.radius), Math.ceil (player.object.y));
			if (!Surface.isSolid (nextSurface)) {
				player.object.speed_x = 0;
				player.object.x = Math.floor(player.object.x);
			}
		} else if (player.object.speed_x < 0) {
			var nextSurface = area.getSurfaceAt (Math.floor (player.object.x-player.object.radius), Math.ceil (player.object.y));
			if (!Surface.isSolid (nextSurface)) {
				player.object.speed_x = 0;
				player.object.x = Math.ceil(player.object.x);
			}
		}

		if (player.object.speed_y > 0) {
			var nextSurface = area.getSurfaceAt (Math.floor (player.object.x), Math.floor (player.object.y+player.object.radius));
			if (!Surface.isSolid (nextSurface)) {
				player.object.speed_y = 0;
				player.object.y = Math.floor(player.object.y);
			}
		} else if (player.object.speed_y < 0) {
			var nextSurface = area.getSurfaceAt (Math.floor (player.object.x), Math.floor (player.object.y-player.object.radius));
			if (!Surface.isSolid (nextSurface)) {
				player.object.speed_y = 0;
				player.object.y = Math.ceil(player.object.y);
			}
		}

	}, 100);
}

playerShoot = function () {
	var orientation = getPlayerOrientation();
	var now = Date.now();
	if ((now - player.shootTime) > 1000) {
		player.shootTime = now;
		area.createObject (
			player.object.x+orientation[0], player.object.y+orientation[1], //position
			orientation[0]*5, orientation[1]*5, //speed
			0.1, //radius
			"res/objects/bullet/01.json", //archetype
			function (obj){ //run on creation successful
				window.setTimeout (function () {
					area.destroyObject (obj);
				}, 1000);
			}
		);
	}
}

playerPlantBomb = function () {
	var now = Date.now ();
	if ((!player.dead) &&(now - player.bombPlantedTime) > 3500) {
		player.bombPlantedTime = now;
		var orientation = getPlayerOrientation ();
		area.createObject (
			player.object.x-orientation[0]*0.6, player.object.y-orientation[1]*0.6, //position
			0, 0, //speed
			0.3, //radius
			"res/objects/bomb/01.json", //archetype
			function (obj){ //run on creation successful
			obj.current_sprite = "bomb";
			obj.updater.update ();
				window.setTimeout (function () {
					bombExplode (obj);
				}, 2000);
			}
		);
	}
}

bombExplode = function (bomb) {
	var x = bomb.x;
	var y = bomb.y;
	area.destroyObject (bomb);
	area.createObject (
		x, y, //position
		0, 0, //speed
		3, //radius
		"res/objects/explosion/01.json", //archetype
		function (obj){ //run on creation successful
			obj.current_sprite = "explosion";
			obj.updater.update ();
			window.setTimeout (function () {
				area.destroyObject (obj);
			}, 1000);
			var surface = area.getSurfaceAt (Math.floor(x), Math.floor(y));
			if (Surface.isSolid (surface)) {
				area.setSurfaceCircle (Math.floor (x), Math.floor (y), 1, Surface.SAND);
				area.setSurfaceAt (Math.floor (x), Math.floor (y), Surface.COBBLE);
			}
		}
	);
}

getPlayerOrientation = function () {
	var orient_x = 0;
	var orient_y = 0;

	if (player.pressingLeft) {
		orient_x = -1;
	} else if (player.pressingRight) {
		orient_x = 1;
	}

	if (player.pressingUp) {
		orient_y = -1;
	} else if (player.pressingDown) {
		orient_y = 1;
	}

	if (orient_x == 0 && orient_y == 0) {
		switch (player.lastPressed) {
			case "up":
				return [0, -1];
			case "down":
				return [0, 1];
			case "left":
				return [-1, 0];
			case "right":
				return [1, 0];
		}
	} else {
		return [orient_x, orient_y];
	}

}

createJewel = function (x, y, callback) {
	area.createObject(
		x, y, //position
		0, 0, //speed
		0.3, //radius
		"/res/objects/jewel/01.json", //archetype
		callback //run on creation successful
	);
}

onJewelCreated = function (jewel) {
	game_jewels.push (jewel);
	jewel.current_sprite = "jewel0"+game_jewels.length;
	jewel.updater.update ();
	area.collisionChecker.addCheck (jewel, player.object, function (jewel, detective) {
		area.collisionChecker.removeCheck (jewel, detective);
		area.destroyObject (jewel);
		player.foundJewels++;
		if (player.foundJewels == 4) {
			area.renderer.showMessage ("Encontraste todas las Joyas! ");
			player.foundJewels=0;
			game_jewels = [];
			initJewels ();
		} else {
			area.renderer.showMessage ("Joyas encontradas: "+player.foundJewels);
		}
	});
}

isJewelForeign = function (jewel) {
	var foreign = true;
	game_jewels.forEach (function (game_jewel) {
		if (jewel.id == game_jewel.id) {
			foreign = false;
		}
	});
	return foreign;
}