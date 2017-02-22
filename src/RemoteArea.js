/* Clase RemoteArea:
 * Area que sera cargada desde un servidor remoto
 */

/* size: [width, height] */
RemoteArea = function (uri) {
	this.uri = uri;
	this.map = null;
	this.width = null;
	this.height = null;
	this.objects = [];
	this.requestCallbacks = [];
	this.ownObjects = [];
	this.lastRequestId = 0;
	this.resourceHandler = new ResourceHandler ();
	this.collisionChecker = new CollisionChecker (this.objects);
	this.renderer = null;
	
	var self = this;
	var onready = function () {
		self.subscribeToMap ();
		self.requestMapStatus ();
	}

	this.connectToServer (onready);
}

/* Suscribirse para recibir las actualizaciones en el mapa */
RemoteArea.prototype.subscribeToMap = function () {
	msg = {
		entity: "surface",
		action: "subscribe",
		left: 0,
		top: 0,
		right: 128,
		bottom: 128
	}
	this.sendMessage (msg);

	msg.entity="object";
	this.sendMessage (msg);
}

/* Solicitar el estado actual del mapa al servidor */
RemoteArea.prototype.requestMapStatus = function () {
	msg = {
		entity: "surface",
		action: "get"
	}

	this.sendMessage (msg);
}

/* Conectarse al servidor */
RemoteArea.prototype.connectToServer = function (onready) {
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
	var msgData = JSON.parse (msg.data);
	if (msgData.entity != undefined) {
		switch (msgData.entity) {
			case "surface":
				this.updateMapSurface (msgData);
				break;
			case "object":
				this.updateObjects (msgData);
				break;
		}
	}
}

/* Actualizar el mapa a partir de un mensaje recibido del servidor */
RemoteArea.prototype.updateMapSurface = function (msg) {
	if (!this.map) {
		this.initMap (msg);
	} else if (msg.left != undefined) {
		this.setSurfaceRegion (msg.left, msg.top, msg.right, msg.bottom, msg.data);
	} else {
		this.setSurfaceAt (msg.x, msg.y, msg.surface);
	}
	if (this.renderer != null) {
		this.renderer.refresh ();
	}
}

/* Inicializar el mapa a partir de un mensaje recibido del servidor */
RemoteArea.prototype.initMap = function (msg) {
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

	return this.map[(x*this.width)+y];
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
			region.data[x-left][y-top] = this.map[(x*this.width)+y];
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
		action: "set",
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
		action: "set",
		shape: "circle",
		x: x,
		y: y,
		radius: radius,
		surface: surface
	}
	this.sendMessage (msg);
}

RemoteArea.prototype.updateObjects = function (msg) {
	if (msg.action == undefined) {
		this.updateObject (msg);

		if (this.map != null && this.renderer != null) {
			this.renderer.refresh();
		}
	} else {
		switch (msg.action) {
			case "grant control":
				console.log ("Se ha recibido el control sobre el objeto con id "+msg.object_id);
				this.takeObjectControl (msg);
				break;
			case "destroy":
				console.log ("Objeto con id "+msg.id+" ha sido destruido");
				this.removeObject (msg.id);
				break;
		}
	}
}

RemoteArea.prototype.updateObject = function (obj) {
	if (this.objects[obj.id] == undefined) {
		this.insertObject (obj);
	} else if (this.ownObjects[obj.id] != undefined) {
		/* Si el objeto es manejado por nosotros, ignoramos el mensaje */
	} else {
		var cached = this.objects[obj.id];
		cached.x = obj.x;
		cached.y = obj.y;
		cached.speed_x = obj.speed_x;
		cached.speed_y = obj.speed_y;
		cached.radius = obj.radius;
		cached.state = obj.state;
	}
}

RemoteArea.prototype.takeObjectControl = function (msg) {
	var object = this.objects [msg.object_id];
	if (object != undefined) {
		this.ownObjects [msg.object_id] = object;
		if (!object.updater) {
			object.updater = new ObjectUpdater (obj);
		}
		object.updater.setAreaToSendUpdates (this);

		var callback = this.requestCallbacks [msg.request_id];
		if (callback) {
			callback (object)
		}

		if (callback != undefined) {
			this.requestCallbacks.splice (msg.request_id, 1);
		}

	} else {
		console.log ("Error: se ha recibido el control sobre un objeto desconocido (id: "+msg.id+")");
	}
}

RemoteArea.prototype.insertObject = function (obj) {
	this.objects[obj.id] = obj;
	obj.updater = new ObjectUpdater (obj);
	if (obj.archetype_url) {
		this.resourceHandler.execOnArchetype (obj.archetype_url, function (arc) {
			obj.archetype = arc;
			if (obj.attribs == undefined) {
				obj.attribs = {};
			}
			for (var atr_name in arc.attribs) {
				if (arc.attribs.hasOwnProperty (atr_name) && !obj.attribs.hasOwnProperty (atr_name)) {
					obj.attribs[atr_name] =  arc.attribs[atr_name];
				}
			}
		});
	}
}

RemoteArea.prototype.removeObject = function (id) {
	if (this.objects[id] != undefined) {
		this.objects.splice (id, 1);
	}
	if (this.ownObjects[id] != undefined) {
		this.ownObjects.splice (id, 1);
	}
}

RemoteArea.prototype.recalcObjectPositions = function (now) {
	this.objects.forEach(function (object) {
		object.updater.step (now);
	});
}

/* Crear un objeto. Se llamara al callback cuando se haya creado correctamente */
RemoteArea.prototype.createObject = function (x, y, radius, archetype_url, callback) {
	var req_id = ++this.lastRequestId;
	this.requestCallbacks[req_id] = callback;

	var msg = {
		entity: "object",
		action: "create",
		archetype_url: archetype_url,
		request_id: req_id,
		radius: radius,
		x: x,
		y: y,
		speed_x: 0,
		speed_y: 0
	
	}

	this.sendMessage (msg);
}

/* Destruir un objeto. */
RemoteArea.prototype.destroyObject = function (object) {

	var msg = {
		entity: "object",
		action: "destroy",
		id: object.id,
	}

	this.sendMessage (msg);
	this.removeObject (object.id);
}

/* Enviar un mensaje al servidor */
RemoteArea.prototype.sendMessage = function (msg) {
	if (this.websocket && this.websocket.readyState==1) {
		this.websocket.send(JSON.stringify(msg));
	} else {
		this.alertDisconnected ();
	}
}

/* Mostar alerta informando que no esta conectado */
RemoteArea.prototype.alertDisconnected = function () {
	if (this.renderer != null) {
		this.renderer.showMessage ("No hay conexion con el servidor");
	}
}

RemoteArea.prototype.setRenderer = function (renderer) {
	this.renderer = renderer;
}

RemoteArea.prototype.setCollisionChecker = function (checker) {
	this.collisionChecker = checker;
}