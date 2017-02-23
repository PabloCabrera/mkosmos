player = {
	moveX: 0,
	moveY: 0,
	lastPressed:"right",
	dead: false,
}

window.onload = function() {
	area = new RemoteArea (CONFIG_SERVER_ADDRESS);
	renderer = new CanvasRenderer (area);
	renderer.setViewSize([20, 15]);
	renderer.setRenderSize([800, 600]);
	var container = document.getElementById ('game_container');
	window.setTimeout (function(){
		renderer.render (container, 20);
		initArchetypes ();
		initKeyListeners ();
		initPlayer ();
	}, 1000);
}

initArchetypes = function () {
		area.resourceHandler.preloadArchetype ("/res/characters/allosaurus/01.json")
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
		}
	}
}

pressLeft = function () {
	if (player.dead) { return null; }
	player.object.speed_x = -5;
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
	player.object.speed_x = 5;
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
	player.object.speed_y = -3;
	player.pressingUp = true;
	updatePlayer ();
}

releaseUp = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 0;
	player.pressingUp = false;
	updatePlayer ();
}

pressDown = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 3;
	player.pressingDown = true;
	updatePlayer ();
}

releaseDown = function () {
	if (player.dead) { return null; }
	player.object.speed_y = 0;
	player.pressingDown = false;
	updatePlayer ();
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
	object.current_sprite = "idle_right";
	renderer.goTo (object.x-10, object.y-8)
	renderer.follow (object);
	area.collisionChecker.addCheckByAttribute (object, "material", "fire", function (obj, target) {
		playerDie();
	});
	playerFootPrint ();
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
	}, 500);

	window.setTimeout (function () {
		player.object.current_sprite = "dying_03";
		player.object.updater.update();
	}, 1000);
	
	window.setTimeout (function () {
		player.object.current_sprite = "dying_04";
		player.object.updater.update();
	}, 1500);
	
	window.setTimeout (function () {
		player.object.current_sprite = "dying_05";
		player.object.updater.update();
		player.object.updater = null;
		area.renderer.stopFollow ();
		area.renderer.stopRenderLoop ();
	}, 2000);

	window.setTimeout (function () {
		area.renderer.showMessage ("GAME OVER");;
	}, 5000);
}

playerFootPrint = function () {
	if (!player.dead) {
		var feetX = Math.floor (player.object.x)
		var feetY = Math.floor (player.object.y+1)
		var feetOn = area.getSurfaceAt (feetX, feetY); 
		if (
			Surface.isSolid (feetOn)
			&& ((player.object.speed_x != 0) || (player.object.speed_y != 0))
		) {
			area.setSurfaceAt (feetX, feetY, Surface.EARTH);
		}
		window.setTimeout (playerFootPrint, 500+Math.floor(Math.random()*2000));
	}
}
createPlayer = function (x, y, callback) {
	area.createObject(
		x, y, //position
		0, 0, //speed
		2.5, //radius
		"/res/characters/allosaurus/01.json", //archetype
		callback //run on creation successful
	);
}

updatePlayer = function () {
	if (player.object.speed_x < 0) {
		player.object.current_sprite = "running_left";
	} else if (player.object.speed_x > 0) {
		player.object.current_sprite = "running_right";
	} else if (player.object.speed_y !=0) {
		player.object.current_sprite = "running_"+player.lastPressed;
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
