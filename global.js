window.onload = function() {
	area = new RemoteArea (CONFIG_SERVER_ADDRESS);
	renderer = new CanvasAreaRenderer (area);
	renderer.setViewSize([128, 128]);
	renderer.setRenderSize([600, 600]);
	window.setTimeout (function(){renderer.render (document.body, 20)}, 1000);
}

generateCircle = function () {
	var x = Math.floor (Math.random()*area.width);
	var y = Math.floor (Math.random()*area.height);
	var radius = Math.floor (Math.random ()*6);
	area.setSurfaceCircle (x, y, radius, Surface.SAND);
}

generateRect = function () {
	var left = Math.floor (Math.random()*area.width);
	var top = Math.floor (Math.random()*area.height);
	var right = left+4;
	var bottom = top+4;
	area.setSurfaceRect (left, top, right, bottom, Surface.SAND);
}

createObject = function () {
	var x = Math.floor (Math.random()*area.width);
	var y = Math.floor (Math.random()*area.height);
	area.createObject(x, y);
}

moveObjects = function () {
	area.ownObjects.forEach(function (object) {
		var speed_x = -1 + 2*Math.random();
		var speed_y = -1 + 2*Math.random();
		object.speed_x = speed_x;
		object.speed_y = speed_y;
		var msg = {
			entity: "object",
			action: "update status",
			id: object.id,
			speed_x: speed_x,
			speed_y: speed_y
		}
		area.sendMessage (msg);
	});
}


