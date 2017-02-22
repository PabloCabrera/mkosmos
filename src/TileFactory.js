TileFactory = {
}

TileFactory.getTileColor = function (surface) {
	var color = 'black';
	if (SurfaceColor[surface] != undefined) {
		color = SurfaceColor[surface];
	}
	return color;
}
