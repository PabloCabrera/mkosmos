SVGTileFactory = {
}

SVGTileFactory.getTile = function (surface) {
	var tile = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	tile.setAttributeNS (null, "width", 1);
	tile.setAttributeNS (null, "height", 1);
	var color = this.getTileColor (surface);
	tile.setAttributeNS (null, "style", "stroke:black;stroke-width:0.02;fill:"+color);
	return tile;
}

SVGTileFactory.getTileColor = function (surface) {
	var color = 'black';
	if (SurfaceColor[surface] != undefined) {
		color = SurfaceColor[surface];
	}
	return color;
}
