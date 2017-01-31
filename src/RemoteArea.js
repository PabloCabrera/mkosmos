/* Interface RemoteArea:
 * Area que sera cargada desde un servidor remoto
 */

/* size: [width, height] */
RemoteArea = function (uri) {
	console.log ("RemoteArea constructor");
	var self = this;

	var onready = function () {
		self.requestMapStatus ();
	}

	this.uri = uri;
	this.map = null;
	this.connectToServer (onready);
}

/* Solicitar el estado actual del mapa al servidor */
RemoteArea.prototype.requestMapStatus = function () {
	console.log ("requestMapStatus");
	msg = {
		entity: "surface",
		action: "get"
	}

	this.sendMessage (msg);
}

/* Conectarse al servidor */
RemoteArea.prototype.connectToServer = function (onready) {
	console.log ("connectToServer");
	var self = this;
	var onmessage = function (msg) {
		self.recieveMessage (msg);
	}
	this.websocket = new WebSocket (this.uri);
	this.websocket.onopen = onready;
	this.websocket.onmessage = onmessage;
}

/* Procesar un mensaje recibido del servidor */
RemoteArea.prototype.recieveMessage = function (msg) {
	console.log ("recieveMessage");
	var msgData = JSON.parse (msg.data);
	if (msgData.entity != undefined) {
		switch (msgData.entity) {
			case "surface":
				console.log ("recieveMessage: surface");
				this.updateMapSurface (msgData);
				break;
		}
	}
}

/* Actualizar el mapa a partir de un mensaje recibido del servidor */
RemoteArea.prototype.updateMapSurface = function (msg) {
	console.log ("updateMapSurface");
	if (!this.map) {
		this.initMap (msg);
	} else if (msg.left != undefined) {
		this.setSurfaceRegion (msg.left, msg.top, msg.right, msg.bottom, msg.data);
	} else {
		this.setSurfaceAt (msg.x, msg.y, msg.surface);
	}
}

/* Inicializar el mapa a partir de un mensaje recibido del servidor */
RemoteArea.prototype.initMap = function (msg) {
	console.log ("initMap");
	this.width = msg.right+1;
	this.height = msg.bottom+1;
	this.map = Array ((msg.right+1)*(msg.bottom+1))
	this.updateMapSurface (msg);
}

/* Establecer la superficie una region del mapa */
RemoteArea.prototype.setSurfaceRegion = function (left, top, right, bottom, data) {
	if (left>=0 && top>=0 && right<=this.width && bottom<=this.height) {
		for (var x=left; x<=right; x++) {
			for (var y=top; y<=bottom; y++) {
				this.map[x*this.width + y] = data[x-left][y-top];
			}
		}
	}
}

/* Obtener el tipo de superficie en las coordenadas dadas
 position: [x, y] */
RemoteArea.prototype.getSurfaceAtPosition = function (position) {
	return this.getSurfaceAt(position[0], position[1]);
}

/* Obtener el tipo de superficie en las coordenadas dadas */
RemoteArea.prototype.getSurfaceAt = function (x, y) {
	if (x<0 || x>this.width || y<0 || y>this.height) {
		return null;
	}

	return this.map[(y*this.height)+x];
}

/* Establecer el tipo de superficie en un punto especifico */
RemoteArea.prototype.setSurfaceAtPosition = function (position, surface) {
	this.setSurfaceAt (position[0], position[1], surface);
}

/* Obtener el tipo de superficie en un rectangulo */
RemoteArea.prototype.getSurfaceRect = function (left, top, right, bottom) {
	var region = {
		left: Math.max(left, 0),
		top: Math.max(top, 0),
		right: Math.min(right, this.width-1),
		bottom: Math.min(bottom, this.height-1),
		data: []
	}

	for (var x = left; x <= right; x++) {
		region.data[x-left] = [];
		for (var y = top; y <= bottom; y++) {
			region.data[x-left][y-top] = this.map[(y*this.height)+x];
		}
	}
	return region;
}

/* Obtener el tipo de superficie en un rectangulo */
RemoteArea.prototype.execOnSurfaceRect = function (left, top, right, bottom, handler) {
	if (!this.map) {
		this.alertDisconnected();
		return null;
	}

	var region = this.getSurfaceRect (left, top, right, bottom);
	handler (region);
}

/* Establecer el tipo de superficie en un punto especifico */
RemoteArea.prototype.setSurfaceAt = function (x, y, surface) {
	var msg = {
		entity: "surface",
		action: "replace",
		x: x,
		y: y,
		surface: surface
	};
	this.sendMessage (msg);
}

/* Establecer el tipo de superficie en un area rectangular */
RemoteArea.prototype.setSurfaceRectPosition = function (position, size, surface) {
	this.setSurfaceRect (position[0], position[1], position[0]+size[0], position[1]+size[1], surface);
}

/* Establecer el tipo de superficie en un area rectangular */
RemoteArea.prototype.setSurfaceRect = function (left, top, right, bottom, surface) {
	var msg = {
		entity: "surface",
		action: "replace",
		shape: "rectangle",
		left: left,
		top: top,
		right: right,
		bottom: bottom,
		surface: surface
	};
	this.sendMessage (msg);
}

/* Establecer el tipo de superficie en un area circular */
RemoteArea.prototype.setSurfaceCirclePosition = function (position, radius, surface) {	
	this.setSurfaceCircle (position[0], position[1], radius, surface);
}

/* Establecer el tipo de superficie en un area circular */
RemoteArea.prototype.setSurfaceCircle = function (x, y, radius, surface) {
	var msg = {
		entity: "surface",
		action: "replace",
		shape: "circle",
		x: x,
		y: y,
		radius: radius,
		surface: surface
	}
	this.sendMessage (msg);
}

/* Enviar un mensaje al servidor */
RemoteArea.prototype.sendMessage = function (msg) {
	console.log ("sendMessage");
	if (this.websocket && this.websocket.readyState==1) {
		this.websocket.send(JSON.stringify(msg));
	} else {
		this.alertDisconnected ();
	}
}

/* Mostar alerta informando que no esta conectado */
RemoteArea.prototype.alertDisconnected = function () {
	window.alert ("No hay conexion con el servidor");
}