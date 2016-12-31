AreaRenderer = function (area) {
	this.area = area;
	this.viewOrigin = [0, 0];
	this.viewSize = [64, 64];
	this.renderSize = [300, 300];
	this.drawSvg = null;
	this.tileCache = [];
}

/* Crear elemento SVG y poner en container */
AreaRenderer.prototype.render = function (container) {
	this.drawSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.adjust();
	this.draw();
	container.appendChild (this.drawSvg);
}

/* Ajustar posicion y tamanio */
AreaRenderer.prototype.adjust = function () {
	this.drawSvg.setAttributeNS(null, "width", this.renderSize[0]);
	this.drawSvg.setAttributeNS(null, "height", this.renderSize[1]);
	this.drawSvg.setAttributeNS(null, "viewBox",
		+ this.viewOrigin[0] + " "
		+ this.viewOrigin[1] + " "
		+ this.viewSize[0] + " "
		+ this.viewSize[1]
	);
	this.refresh();
}

/* Dibujar */
AreaRenderer.prototype.draw = function () {
	var start_x = this.viewOrigin[0];
	var end_x = start_x + this.viewSize[0];

	var start_y = this.viewOrigin[1];
	var end_y = start_y + this.viewSize[1];


	for (var x = start_x; x < end_x; x++) {
		for (var y = start_y; y < end_y; y++) {
			var surface = this.area.getSurfaceAt(x, y);
			var tile = TileFactory.getTile(surface);
			this.putTile (tile, x, y);
		}
	}
}

/* Dibuja un tile y lo guarda en cache*/
AreaRenderer.prototype.putTile = function (tile, x, y) {
	tile.setAttributeNS (null, "x", x);
	tile.setAttributeNS (null, "y", y);
	this.drawSvg.appendChild(tile);
	this.cacheTile (tile, x, y);
}

/* Guarda un tile en cache */
AreaRenderer.prototype.cacheTile = function (tile, x, y) {
	if(this.tileCache[x] == undefined) {
		this.tileCache[x] = [];
	}
	this.tileCache[x][y] = tile;
}

/* Actualizar imagen */
AreaRenderer.prototype.refresh = function () {
	this.deleteTilesOutsideView();
	this.drawRemainingTiles();
}

/* Eliminar los tiles de la cache  que estan fuera del area dibujable */
AreaRenderer.prototype.deleteTilesOutsideView = function () {
	var column = Math.floor(this.viewOrigin[0]);
	var limitColumn = column + this.viewSize[0] + 1;
	
	var row = Math.floor (this.viewOrigin[1]);
	var limitRow = row + this.viewSize[1] + 1;

	this.deleteElementsOutsideRange(this.tileCache, column, limitColumn);
	this.deleteCacheRowsOutside(row, limitRow);
}

/* Eliminar los valores de un vector que estan fuera de un rango */
AreaRenderer.prototype.deleteElementsOutsideRange = function (vector, inferior, superior) {
	var index;
	for (index = inferior-1; vector[index] != undefined; index--){
		delete vector[index];
	}

	for (index = superior+1; vector[index] != undefined; index++){
		delete vector[index];
	}
}

/* Eliminar filas de cache fuera de un rango */
AreaRenderer.prototype.deleteCacheRowsOutside = function (inferior, superior) {
	var self = this;
	this.tileCache.forEach(function (vector) {
		self.deleteElementsOutsideRange (vector, inferior, superior);
	});
}


/* Dibujar los tiles que faltan para completar la zona de vision */
AreaRenderer.prototype.drawRemainingTiles = function () {
	var start_x = Math.floor(this.viewOrigin[0]);
	var start_y = Math.floor(this.viewOrigin[1])
	
	var limit_x = Math.ceil(this.viewOrigin[0] + this.viewSize[0]);
	var limit_y = Math.ceil(this.viewOrigin[1] + this.viewSize[1]);


	
	for (var x = start_x; x < limit_x; x++) {
		for (var y = start_y;y < limit_y; y++) {
			if (this.tileCache[x] == undefined) {
				this.tileCache[x] = [];
			}
			if (this.tileCache[x][y] == undefined) {
				var tile = TileFactory.getTile (this.area.getSurfaceAt(x, y));
				this.putTile(tile, x, y);
			}

		}
	}
}

/* Moverse a un punto determinado */
AreaRenderer.prototype.goTo = function (destination) {
	this.setViewOrigin (destination);
	this.adjust();
}

/* Establecer un nivel de zoom */
AreaRenderer.prototype.setZoomLevel = function (zoomLevel) {
	this.setViewSize ([10/zoomLevel, 10/zoomLevel]);
	this.adjust();
}

/* Establecer la esquina superior izquierda de la vista en el area
	origin: [x, y] */
AreaRenderer.prototype.setViewOrigin = function (origin) {
	this.viewOrigin = origin;
}

/* Establecer la coordenada izquierda de la vista */
AreaRenderer.prototype.setViewLeft = function (x) {
	this.viewOrigin[0] = x;
}

/* Establecer la coordenada superior de la vista */
AreaRenderer.prototype.setViewTop = function (y) {
	this.viewOrigin[1] = y;
}

/* Establecer el tamanio de la vista
	size: [width, height] */
AreaRenderer.prototype.setViewSize = function (size) {
	this.viewSize = size;
}

/* Establecer el ancho de la vista */
AreaRenderer.prototype.setViewWidth = function (width) {
	this.viewSize[0] = width;
}

/* Establecer el alto de la vista */
AreaRenderer.prototype.setViewHeight = function (height) {
	this.viewSize[1] = height;
}

/* Establecer el tamanio de la renderizacion
size: [width, height], expresado en pixeles */
AreaRenderer.prototype.setRenderSize = function (size) {
	this.renderSize = size;
}

/* Establecer el ancho de la renderizacion */
AreaRenderer.prototype.setRenderWidth = function (width) {
	this.renderSize[0] = width;
}

/* Establecer el alto de la renderizacion */
AreaRenderer.prototype.setRenderHeight = function (height) {
	this.renderSize[1] = height
}
