window.onload = function() {
	area = new RemoteArea (CONFIG_SERVER_ADDRESS);
	renderer = new CanvasRenderer (area);
	renderer.drawImages = false;
	renderer.setViewSize([128, 128]);
	renderer.setRenderSize([600, 600]);
	var container = document.getElementById ('global_map_section');
	window.setTimeout (function(){
		renderer.render (container, 20);
		initClickHandler();
	}, 1000);
	initSurfaceSelect();
}

initSurfaceSelect = function () {
	var select = document.querySelector ("select[name=surface_type]");
	for (surf in Surface) {
		if (Surface.hasOwnProperty (surf)) {
			var opt = document.createElement ("OPTION");
			opt.innerText = surf;
			opt.value = Surface[surf];
			select.appendChild (opt);
		}
	}
}

initClickHandler = function () {
	var canvas = document.querySelector("#global_map_section canvas");
	canvas.addEventListener ("click",  function (event) {
		var click_x = event.layerX-canvas.offsetLeft;
		var click_y = event.layerY-canvas.offsetTop;
		var tile_x = Math.floor((click_x / area.renderer.tileScale[0]) - area.renderer.viewOrigin[0]);
		var tile_y = Math.floor((click_y / area.renderer.tileScale[1]) - area.renderer.viewOrigin[1]);
		changeTile (tile_x, tile_y);
	});
}

changeTile = function (tile_x, tile_y) {
	var surface_type = document.querySelector ("select[name=surface_type]").value;
	var brush_shape = document.querySelector ("select[name=brush_shape").value;
	var brush_size = document.querySelector ("input[name=brush_size]").value;
	switch (brush_shape) {
		case "square":
			drawSquare (tile_x, tile_y, surface_type, parseInt(brush_size));
			break;
		case "circle":
			drawCircle (tile_x, tile_y, surface_type, parseInt(brush_size));
			break;
	}
}

drawCircle = function (x, y, surface, brush_size) {
	area.setSurfaceCircle (x, y, Math.floor(brush_size/2), surface);
}

drawSquare = function (x, y, surface, brush_size) {
	var left = Math.floor (x-(brush_size/2));
	var top = Math.floor (y-(brush_size/2));
	var right = (left + brush_size) -1;
	var bottom = (top + brush_size) -1;
	area.setSurfaceRect (left, top, right, bottom, surface);
}
