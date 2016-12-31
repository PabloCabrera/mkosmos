var map = [
	'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h',
	'h', 'h', 'd', 'h', 'h', 'd', 'h', 'h',
	'h', 'h', 'd', 'd', 'd', 'a', 'd', 'h',
	'h', 'd', 'a', 'c', 'c', 'd', 'h', 'h',
	'd', 'a', 'c', 'c', 'a', 'd', 'h', 'h',
	'd', 'a', 'a', 'c', 'a', 'd', 'h', 'h',
	'h', 'd', 'd', 'a', 'd', 'h', 'h', 'h',
	'h', 'h', 'd', 'd', 'h', 'h', 'd', 'h',
];

var map_width = 8;
var map_height = 8;

var view_top = 0;
var view_left = 0;

var view_width = 4;
var view_height = 4;

var draw_width = 300;
var draw_height = 300;

var svgNS = "http://www.w3.org/2000/svg";

var draw_area = document.createElementNS(svgNS, "svg");
draw_area.setAttributeNS(null, "width", draw_width);
draw_area.setAttributeNS(null, "height", draw_height);

draw_area.setAttributeNS(null, "viewBox",
	+ view_left + " "
	+ view_top + " "
	+ view_width + " "
	+ view_height
);


/* function */
var cositos = [];

function redraw (map, cositos, draw_area) {
	map.forEach(function (tile_id, position) {
		var tile = getTile(tile_id);
		if (cositos[position] != undefined) {
			draw_area.removeChild(cositos[position]);
		}
		cositos[position] = tile;
		tile.setAttributeNS (null, "x", position % map_width);
		tile.setAttributeNS (null, "y", Math.floor(position/map_width));
		draw_area.appendChild(tile);
	});
}

function getTile(tile_id) {
	var tile = document.createElementNS(svgNS, "rect");
	tile.setAttributeNS (null, "width", 1);
	tile.setAttributeNS (null, "height", 1);
	var color = getTileColor (tile_id);
	tile.setAttributeNS (null, "style", "stroke:black;stroke-width:0.05;fill:"+color);
	return tile;
}

function getTileColor(tile_id) {
	var color = 'black';
	switch (tile_id) {
		case 'h':
			color = 'blue';
			break;
		case 'd':
			color = 'yellow';
			break;
		case 'c':
			color = 'green';
			break;
		case 'a':
			color = '#ca5';
			break;
	}
	return color;
}

function slide (x, y){
	draw_area.setAttributeNS (null, "viewBox",
	+ x + " "
	+ y + " "
	+ view_width + " "
	+ view_height
	);
	redraw(map,cositos, draw_area);
}

function adjust_viewbox() {
	draw_area.setAttributeNS(null, "viewBox",
		+ view_left + " "
		+ view_top + " "
		+ view_width + " "
		+ view_height
	);
}

function activateControllers() {
	activateZoomController();
	activateXController();
	activateYController();
}

function activateZoomController() {
	var controller = document.getElementById("zoom-controller");
	controller.addEventListener("change", function () {
		setZoom (this.value);
		adjust_viewbox();
	});
}

function activateXController() {
	var controllerX = document.getElementById("x-controller");
	controllerX.addEventListener("change", function () {
		setX (this.value);
		slide(view_left, view_top);
	});
}

function activateYController() {
	var controllerY = document.getElementById("y-controller");
	controllerY.addEventListener("change", function () {
		setY (this.value);
		slide(view_left, view_top);
	});
}

function setZoom(zoom) {
	view_width = 10/zoom;
	view_height = 10/zoom;
}

function setX(x) {
	view_left = x;
}

function setY(y) {
	view_top = y;
}

window.onload = function() {
	document.body.appendChild(draw_area);
	redraw (map, cositos, draw_area);
	activateControllers();
}