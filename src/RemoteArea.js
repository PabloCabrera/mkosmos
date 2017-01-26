/* Interface RemoteArea:
 * Area que sera cargada desde un servidor remoto
 */

/* size: [width, height] */
RemoteArea = function (uri) {
	this.uri = uri;
}

/* Obtener el tipo de superficie en las coordenadas dadas
 position: [x, y] */
RemoteArea.prototype.getSurfaceAtPosition = function (position) {
}

/* Obtener el tipo de superficie en las coordenadas dadas */
RemoteArea.prototype.getSurfaceAt = function (x, y) {
}

/* Establecer el tipo de superficie en un punto especifico */
RemoteArea.prototype.setSurfaceAtPosition = function (position, surface) {}

/* Obtener el tipo de superficie en un rectangulo */
RemoteArea.prototype.getSurfaceRect = function (left, top, right, bottom) {
}

/* Obtener el tipo de superficie en un rectangulo */
RemoteArea.prototype.execOnSurfaceRect = function (left, top, right, bottom, handler) {
		$.ajax (this.uri+"/GetSurfaceRect", {
		method: "GET",
		dataType: "json",
		data: {
			left: left,
			top: top,
			right: right,
			bottom: bottom
		}
		success: handler
	});
}

/* Establecer el tipo de superficie en un punto especifico */
RemoteArea.prototype.setSurfaceAt = function (x, y, surface) {
	$.ajax (this.uri+"/SetSurfaceAt", {
		method: "POST",
		dataType: "json",
		data: {
			x: x,
			y: y
		}
	}
}

/* Establecer el tipo de superficie en un area rectangular */
RemoteArea.prototype.setSurfaceRectPosition = function (position, size, surface) {
	this.setSurfaceRect (position[0], position[1], position[0]+size[0], position[1]+size[1], surface);
}

/* Establecer el tipo de superficie en un area rectangular */
RemoteArea.prototype.setSurfaceRect = function (left, top, width, height, surface) {
	$.ajax (this.uri+"/SetSurfaceRect", {
		method: "POST",
		dataType: "json",
		data: {
			left: left,
			top: top,
			right: right,
			bottom: bottom,
			surface: surface
		}
	});
}

/* Establecer el tipo de superficie en un area circular */
RemoteArea.prototype.setSurfaceCirclePosition = function (positon, radius, surface) {	
	this.setSurfaceCircle (position[0], position[1], radius, surface);
}

/* Establecer el tipo de superficie en un area circular */
RemoteArea.prototype.setSurfaceCircle = function (x, y, radius, surface) {
	$.ajax (this.uri+"/SetSurfaceRect", {
		method: "POST",
		dataType: "json",
		data: {
			x: x,
			y: y,
			radius: radius,
			surface: surface
		}
	});
}
