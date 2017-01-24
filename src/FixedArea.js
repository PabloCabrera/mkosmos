/* Clase FixedArea:
 * Puede utilizarse para mundos de tamanio reducido
 * Siempre esta cargada completamente en memoria
 * Utiliza siempre coordenadas absolutas
 */

/* size: [width, height] */
FixedArea = function (size) {
	this.width = size[0];
	this.height = size[1];
	this.initMap(Surface.WATER);
}

/* Crea el mapa con un tipo de superficie  */
FixedArea.prototype.initMap = function (surface) {
	this.map = [];
	var size = this.width * this.height;
	for (var position = 0; position < size; position++) {
		this.map[position] = surface;
	}
}

/* Obtener el tipo de superficie en las coordenadas dadas
 position: [x, y] */
FixedArea.prototype.getSurfaceAtPosition = function (position) {
	return this.getSurfaceAt(position[0], position[1]);
}

/* Obtener el tipo de superficie en las coordenadas dadas */
FixedArea.prototype.getSurfaceAt = function (x, y) {
	if (x<0 || x>this.width || y<0 || y>this.height) {
		return null;
	}

	return this.map[(y*this.height)+x];
}

/* Obtener el tipo de superficie en un rectangulo */
FixedArea.prototype.getSurfaceRect = function (left, top, right, bottom) {
	var region = [];
	region.left = Math.max(left, 0);
	region.top = Math.max(top, 0);
	region.right = Math.min(right, this.width-1);
	region.bottom = Math.min(bottom, this.height-1);

	for (var x = left; x <= right; x++) {
		region[x] = [];
		for (var y = top; y <= bottom; y++) {
			region[x][y] = this.map[(y*this.height)+x];
		}
	}
	return region;
}

/* Obtener el tipo de superficie en un rectangulo */
FixedArea.prototype.execOnSurfaceRect = function (left, top, right, bottom, handler, args) {
	var region = this.getSurfaceRect (left, top, right, bottom);
	handler (region, args);
}

/* Establecer el tipo de superficie en un punto especifico */
FixedArea.prototype.setSurfaceAtPosition = function (position, surface) {
	this.setSurfaceAt (position[0], position[1], surface);
}

/* Establecer el tipo de superficie en un punto especifico */
FixedArea.prototype.setSurfaceAt = function (x, y, surface) {
	var index = (this.height * y) + x
	this.map[index] = surface;
}

/* Establecer el tipo de superficie en un area rectangular */
FixedArea.prototype.setSurfaceRectPosition = function (position, size, surface) {
	this.setSurfaceRect(position[0], position[1], size[0], size[1], surface);
}

/* Establecer el tipo de superficie en un area rectangular */
FixedArea.prototype.setSurfaceRect = function (x, y, width, height, surface) {
	var mapIndex;
	for (var yCount = 0; yCount < height; yCount++) {
		for (var xCount = 0; xCount< width; xCount++) {
			mapIndex = (this.height * (y+yCount)) + (x+xCount);
			this.map[mapIndex] = surface;
		}
	}
}

/* Establecer el tipo de superficie en un area circular */
FixedArea.prototype.setSurfaceCirclePosition = function (position, radius, surface) {
	this.setSurfaceCircle (position[0], position[1], radius, surface);
}

/* Establecer el tipo de superficie en un area circular */
FixedArea.prototype.setSurfaceCircle = function (x, y, radius, surface) {
	for (var yPos = y-radius; yPos < y+radius; yPos++) {
			var hip2 = Math.pow(radius, 2);
			var b2 = Math.pow ((y-yPos), 2);
			xLimit = Number( Math.sqrt (hip2 - b2).toFixed() );
		for (var xPos = (x-xLimit); xPos < (x+xLimit); xPos++) {
			var mapIndex = (this.height * (yPos)) + (xPos);
			this.map[mapIndex] = surface;
		}
	}
}

