SVGAreaRenderer = function (area) {
	this.area = area;
	this.viewOrigin = [0, 0];
	this.viewSize = [16, 16];
	this.renderSize = [300, 300];
	this.drawingSvg = null;
	this.tileCache = [];
}

/* Establecer un nivel de zoom */
SVGAreaRenderer.prototype.setZoomLevel = function (zoomLevel) {
	this.setViewSize ([20/zoomLevel, (20/zoomLevel)*(this.renderSize[1]/this.renderSize[0])]);
	this.adjust();
	this.refresh();
}


/* Crear elemento SVG y poner en container */
SVGAreaRenderer.prototype.render = function (container) {
	this.drawingSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.adjust();
	this.refresh();
	container.appendChild (this.drawingSvg);
}

/* Ajustar posicion y tamanio */
SVGAreaRenderer.prototype.adjust = function () {
	this.drawingSvg.setAttributeNS(null, "width", this.renderSize[0]);
	this.drawingSvg.setAttributeNS(null, "height", this.renderSize[1]);
	this.drawingSvg.setAttributeNS(null, "viewBox",
		+ this.viewOrigin[0] + " "
		+ this.viewOrigin[1] + " "
		+ this.viewSize[0] + " "
		+ this.viewSize[1]
	);
}

/* Dibuja un tile y lo guarda en cache*/
SVGAreaRenderer.prototype.putTile = function (tile, x, y) {
	tile.setAttributeNS (null, "x", x);
	tile.setAttributeNS (null, "y", y);
	this.drawingSvg.appendChild(tile);
	this.cacheTile (tile, x, y);
}

/* Guarda un tile en cache */
SVGAreaRenderer.prototype.cacheTile = function (tile, x, y) {
	if(this.tileCache[x] == undefined) {
		this.tileCache[x] = [];
	}
	this.tileCache[x][y] = tile;
}

/* Actualizar imagen */
SVGAreaRenderer.prototype.refresh = function () {
	this.deleteTilesOutsideView();
	this.drawRemainingTiles();
}

/* Eliminar los tiles de la cache  que estan fuera del area dibujable */
SVGAreaRenderer.prototype.deleteTilesOutsideView = function () {
	var column = Math.floor (this.viewOrigin[0]);
	var limitColumn = Math.ceil (this.viewOrigin[0] + this.viewSize[0]);
	
	var row = Math.floor (this.viewOrigin[1]);
	var limitRow = Math.ceil (this.viewOrigin[1] + this.viewSize[1]);

	this.deleteCacheColumnsOutsideRange(column, limitColumn);
	this.deleteCacheRowsOutside(row, limitRow);
}

/* Eliminar los valores de un vector que estan fuera de un rango */
SVGAreaRenderer.prototype.deleteCacheColumnsOutsideRange = function (inferior, superior) {
	var index;
	for (index = inferior-1; this.tileCache[index] != undefined; index--){
		this.deleteCacheColumn(index);
	}

	for (index = superior+1; this.tileCache[index] != undefined; index++){
		this.deleteCacheColumn(index);
	}
}

SVGAreaRenderer.prototype.deleteCacheColumn = function (column) {
	var area_renderer = this;
	this.tileCache[column].forEach(function(tile, row) {
		area_renderer.dropTileAt(column, row);
	});
	delete this.tileCache[column];
}

SVGAreaRenderer.prototype.dropTileAt = function (x, y){
	this.tileCache[x][y].parentNode.removeChild(this.tileCache[x][y]);
	delete this.tileCache[x][y];
}

/* Eliminar filas de cache fuera de un rango */
SVGAreaRenderer.prototype.deleteCacheRowsOutside = function (inferior, superior) {
	var renderer = this;
	this.tileCache.forEach(function (vector, column) {
		var index;
		for (index = inferior-1; vector[index] != undefined; index--){
			renderer.dropTileAt (column, index);
		}
		for (index = superior+1; vector[index] != undefined; index++){
			renderer.dropTileAt (column, index);
		}
	});
}


/* Dibujar los tiles que faltan para completar la zona de vision */
SVGAreaRenderer.prototype.drawRemainingTiles = function () {
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
				var tile = SVGTileFactory.getTile (this.area.getSurfaceAt(x, y));
				this.putTile(tile, x, y);
			}

		}
	}
}

/* Moverse a un punto determinado */
SVGAreaRenderer.prototype.goToPosition = function (destination) {
	this.goTo (destination[0], destination[1]);
}

/* Moverse a unas coordenadas determinadas */
SVGAreaRenderer.prototype.goTo = function (x, y) {
	this.viewOrigin[0] = x;
	this.viewOrigin[1] = y;
	this.adjust();
	this.refresh();
}

/* Moverse a una ubicacion relativa  */
SVGAreaRenderer.prototype.move = function (x, y) {
	this.viewOrigin[0] += x;
	this.viewOrigin[1] += y;
	this.adjust();
	this.refresh();
}

/* Establecer la esquina superior izquierda de la vista en el area
	origin: [x, y] */
SVGAreaRenderer.prototype.setViewOrigin = function (origin) {
	this.viewOrigin = origin;
}

/* Establecer la coordenada izquierda de la vista */
SVGAreaRenderer.prototype.setViewLeft = function (x) {
	this.viewOrigin[0] = x;
}

/* Establecer la coordenada superior de la vista */
SVGAreaRenderer.prototype.setViewTop = function (y) {
	this.viewOrigin[1] = y;
}

/* Establecer el tamanio de la vista
	size: [width, height] */
SVGAreaRenderer.prototype.setViewSize = function (size) {
	this.viewSize = size;
}

/* Establecer el ancho de la vista */
SVGAreaRenderer.prototype.setViewWidth = function (width) {
	this.viewSize[0] = width;
}

/* Establecer el alto de la vista */
SVGAreaRenderer.prototype.setViewHeight = function (height) {
	this.viewSize[1] = height;
}

/* Establecer el tamanio de la renderizacion
size: [width, height], expresado en pixeles */
SVGAreaRenderer.prototype.setRenderSize = function (size) {
	this.renderSize = size;
}

/* Establecer el ancho de la renderizacion */
SVGAreaRenderer.prototype.setRenderWidth = function (width) {
	this.renderSize[0] = width;
}

/* Establecer el alto de la renderizacion */
SVGAreaRenderer.prototype.setRenderHeight = function (height) {
	this.renderSize[1] = height
}
