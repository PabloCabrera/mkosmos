window.onload = function() {
	area = new RemoteArea ("ws://10.12.13.72:8000");
	renderer = new CanvasAreaRenderer (area);
	renderer.setViewSize([128, 128]);
	renderer.setRenderSize([600, 600]);
	window.setTimeout (function(){renderer.render (document.body)}, 1000);
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


