player = {
	moveX: 0,
	moveY: 0,
	lastPressed:"up",
	pressingUp: false,
	pressingDown: false,
	pressingLeft: false,
	pressingRight: false
}

window.onload = function() {
	area = new RemoteArea (CONFIG_SERVER_ADDRESS);
	renderer = new CanvasAreaRenderer (area);
	renderer.setViewSize([20, 15]);
	renderer.setRenderSize([800, 600]);
	var container = document.getElementById ('game_container');
	window.setTimeout (function(){
		renderer.render (container, 20);
		initKeyListeners ();
		initPlayer();
	}, 1000);
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
		}
	}
}

pressLeft = function () {
	player.object.speed_x = -2;
	player.pressingLeft = true;
}

releaseLeft = function () {
	player.object.speed_x = 0;
	player.pressingLeft = false;
	player.lastPressed = "left";
}

pressRight = function () {
	player.object.speed_x = 2;
	player.pressingRight = true;
}

releaseRight = function () {
	player.object.speed_x = 0;
	player.pressingRight = false;
	player.lastPressed = "right";
}

pressUp = function () {
	player.object.speed_y = -2;
	player.pressingUp = true;
}

releaseUp = function () {
	player.object.speed_y = 0;
	player.pressingUp = false;
	player.lastPressed = "up";
}

pressDown = function () {
	player.object.speed_y = 2;
	player.pressingDown = true;
}

releaseDown = function () {
	player.object.speed_y = 0;
	player.pressingDown = false;
	player.lastPressed = "down";
}

pressSpace = function () {
}

releaseSpace = function () {
	playerShoot();
}

initPlayer = function () {
	var initialPos = searchSurface (Surface.GRASS);
	if (initialPos == null) {
		window.alert ("No se puede iniciar el juego, no hay pasto donde pisar.");
	} else {
		createPlayer (initialPos[0], initialPos[1], onPlayerCreated);
		initPlayerConstraint();
	}
}

searchSurface = function (surface) {
	var x;
	var y;
	var found = false;
	var retries = 0;
	while (!found && retries < 10000) {
		x = Math.floor (Math.random()*area.width);
		y = Math.floor (Math.random()*area.height);
		if (area.getSurfaceAt(x, y) == surface) {
			found = true;
			return [x, y];
		}
		retries++;
	}
	return null;
}

onPlayerCreated = function (object) {
	player.object = object;
	renderer.goTo (object.x-10, object.y-8)
	renderer.follow (object);
}

createPlayer = function (x, y, callback) {
	area.createObject(x, y, callback);
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
	console.log ("Orientation: "+orientation);
	area.createObject (player.object.x, player.object.y, function (obj){
		obj.radius = 0.1;
		obj.speed_x = orientation[0]*5;
		obj.speed_y = orientation[1]*5;
		window.setTimeout (function () {
			area.destroyObject (obj);
		}, 1000);
	});
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