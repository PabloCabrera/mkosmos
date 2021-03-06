CanvasRenderer = function (area) {
	this.area = area;
	this.viewOrigin = [0, 0];
	this.viewSize = [16, 16];
	this.renderSize = [300, 300];
	this.tileScale = [300/16, 300/16];
	this.drawingCanvas = null;
	this.canvasContext = null;
	this.mustExit = false;
	this.followTarget = null;
	this.followIntervalId = null;
	this.drawImages = true;
	this.textMessage = null;
	area.setRenderer (this);
}

/* Establecer un nivel de zoom */
CanvasRenderer.prototype.setZoomLevel = function (zoomLevel) {
	this.setViewSize ([20/zoomLevel, (20/zoomLevel)*(this.renderSize[1]/this.renderSize[0])]);
	this.adjust();
}

/* Iniciar el dibujado continuo */
CanvasRenderer.prototype.startRenderLoop = function (maxFps) {
	this.lastStep = Date.now ();
	this.stepGap = 1000/maxFps;
	this.renderStep()
}

/* Detener el dibujado continuo */
CanvasRenderer.prototype.stopRenderLoop = function () {
	this.mustExit = true;
}

CanvasRenderer.prototype.renderStep = function () {
	var beforeRender = Date.now ();
	this.area.recalcObjectPositions (beforeRender);
	this.refresh();
	var afterRender = Date.now ();
	var renderTime = afterRender - beforeRender;
	var wait = this.stepGap - renderTime;
	if (wait < 1) {
		wait = 1;
	}
	var self = this;
	window.setTimeout (function () {
		if (!self.mustExit) {
			self.renderStep();
		}
	}, wait);
}

/* Crear elemento canvas y poner en container */
CanvasRenderer.prototype.render = function (container, maxFps) {
	this.drawingCanvas = document.createElement("canvas");
	this.canvasContext = this.drawingCanvas.getContext ("2d");
	this.adjust();
	container.appendChild (this.drawingCanvas);
	if (maxFps == undefined) {
		maxFps = 60;
	}
	this.startRenderLoop (maxFps);
}

/* Ajustar posicion y tamanio */
CanvasRenderer.prototype.adjust = function () {
	this.drawingCanvas.setAttribute("width", this.renderSize[0]);
	this.drawingCanvas.setAttribute("height", this.renderSize[1]);
	this.tileScale = [
		this.renderSize[0]/this.viewSize[0],
		this.renderSize[1]/this.viewSize[1]
	];
}

/* Actualizar imagen */
CanvasRenderer.prototype.refresh = function () {
	var self = this;
	
	/* Callback para dibujar asincronicamente */
	var asyncDraw = function (rect) {
		debug_rect = rect;
		for (var x = rect.left; x <= rect.right; x++) {
			for (var y = rect.top; y <= rect.bottom; y++) {
				self.drawTile (rect.data[x-rect.left][y-rect.top], x, y);
			}
		}
	}
	
	this.area.execOnSurfaceRect (
		Math.floor(this.viewOrigin[0]),
		Math.floor(this.viewOrigin[1]),
		Math.ceil(this.viewOrigin[0] + this.viewSize[0]),
		Math.ceil(this.viewOrigin[1] + this.viewSize[1]),
		asyncDraw
	);

	this.drawObjects();
	if (this.textMessage != null) {
		this.renderMessage (this.textMessage);
	}
}

/* Dibujar un area rectangular */
CanvasRenderer.prototype.drawSurfaceRect = function (rect) {
	for (var x = rect.left; x <= rect.right; x++) {
		for (var y = rect.top; y <= rect.bottom; y++) {
			this.drawTile (rect[x-left][y-top], x, y);
		}
	}
}

/* Dibujar un tile particular */
CanvasRenderer.prototype.drawTile = function (surface, x, y) {
	var pos = this.coordTranslate (x, y);
	if (pos != null) {
		this.canvasContext.fillStyle = TileFactory.getTileColor (surface);
		this.canvasContext.fillRect (pos.x, pos.y, this.tileScale[0], this.tileScale[1]);
	}
	
}

/* Dibujar objetos visibles */
CanvasRenderer.prototype.drawObjects = function () {
	var self = this;
	var time = Date.now();
	this.area.objects.forEach (function (object) {
		if (
			(object.x+object.radius >= self.viewOrigin[0]) &&
			(object.x-object.radius <= self.viewOrigin[0]+self.viewSize[0]) &&
			(object.y+object.radius >= self.viewOrigin[1]) &&
			(object.y-object.radius <= self.viewOrigin[1]+self.viewSize[1])
		) {
			self.drawObject (object, time);
		}
	});
	
}

/* Dibujar un objeto */
CanvasRenderer.prototype.drawObject = function (object, time) {
	if (
		this.drawImages
		&& this.area.resourceHandler.hasObjectSprite (object)
		&& object.current_sprite
	){
		this.drawObjectImage (object, time);
	} else {
		this.drawObjectSimple (object);
	}
}

/* Dibujar un objeto */
CanvasRenderer.prototype.drawObjectSimple = function (object) {
	var drawX = (object.x - this.viewOrigin[0]) * this.tileScale[0];
	var drawY = (object.y - this.viewOrigin[1]) * this.tileScale[1];
	var radius = object.radius * this.tileScale[0];
	this.canvasContext.beginPath();
	this.canvasContext.arc(drawX, drawY, radius, 0, 6.28319);
	if (object.archetype && object.archetype.color){
		this.canvasContext.fillStyle = object.archetype.color;
	} else {
		this.canvasContext.fillStyle = 'red';
	}
	this.canvasContext.fill();
	this.canvasContext.closePath();}

/* Dibujar un objeto */
CanvasRenderer.prototype.drawObjectImage = function (object, time) {
	var drawX = (object.x - this.viewOrigin[0] - object.radius) * this.tileScale[0];
	var drawY = (object.y - this.viewOrigin[1] - object.radius) * this.tileScale[1];
	var drawWidth = 2* object.radius * this.tileScale[0];
	var drawHeight = 2* object.radius * this.tileScale[1];
	this.area.resourceHandler.drawObject (object, this.canvasContext, drawX, drawY, drawWidth, drawHeight, time);
}

/* Traducir las coordenadas del mapa a las coordenadas del canvas */
CanvasRenderer.prototype.coordTranslate = function (x, y) {
	var coords = {
		x: this.tileScale[0] * (x-this.viewOrigin[0]),
		y: this.tileScale[1] * (y-this.viewOrigin[1])
	}
	if (x < 0 || y < 0 ){
		return null;
	}
	return coords;
}

/* Moverse a un punto determinado */
CanvasRenderer.prototype.goToPosition = function (destination) {
	this.goTo (destination[0], destination[1]);
}

/* Moverse a unas coordenadas determinadas */
CanvasRenderer.prototype.goTo = function (x, y) {
	this.viewOrigin[0] = x;
	this.viewOrigin[1] = y;
}

/* Seguir a un objeto particular */
CanvasRenderer.prototype.follow = function (target) {
	this.followTarget = target;
	var shiftLeft = this.viewSize[0]/2;
	var shiftTop = this.viewSize[1]/2;
	var self = this;
	this.followIntervalId = window.setInterval (function () {
		var destination_x = target.x - shiftLeft;
		var destination_y = target.y - shiftTop;
		self.goTo (destination_x, destination_y);
	}, 80);
}

/* Dejar de seguir a un objeto */
CanvasRenderer.prototype.stopFollow = function () {
	this.followTarget = null;
	if (this.followIntervalId != null) {
		window.clearInterval (this.followIntervalId);
		this.followIntervalId = null;
	}
}

/* Moverse a una ubicacion relativa  */
CanvasRenderer.prototype.move = function (x, y) {
	this.viewOrigin[0] += x;
	this.viewOrigin[1] += y;
	this.adjust();
}

/* Establecer la esquina superior izquierda de la vista en el area
	origin: [x, y] */
CanvasRenderer.prototype.setViewOrigin = function (origin) {
	this.viewOrigin = origin;
}

/* Establecer la coordenada izquierda de la vista */
CanvasRenderer.prototype.setViewLeft = function (x) {
	this.viewOrigin[0] = x;
}

/* Establecer la coordenada superior de la vista */
CanvasRenderer.prototype.setViewTop = function (y) {
	this.viewOrigin[1] = y;
}

/* Establecer el tamanio de la vista
	size: [width, height] */
CanvasRenderer.prototype.setViewSize = function (size) {
	this.viewSize = size;
}

/* Establecer el ancho de la vista */
CanvasRenderer.prototype.setViewWidth = function (width) {
	this.viewSize[0] = width;
}

/* Establecer el alto de la vista */
CanvasRenderer.prototype.setViewHeight = function (height) {
	this.viewSize[1] = height;
}

/* Establecer el tamanio de la renderizacion
size: [width, height], expresado en pixeles */
CanvasRenderer.prototype.setRenderSize = function (size) {
	this.renderSize = size;
}

/* Establecer el ancho de la renderizacion */
CanvasRenderer.prototype.setRenderWidth = function (width) {
	this.renderSize[0] = width;
}

/* Establecer el alto de la renderizacion */
CanvasRenderer.prototype.setRenderHeight = function (height) {
	this.renderSize[1] = height
}

/* Mostrar mensaje */
CanvasRenderer.prototype.showMessage = function (text) {
	this.textMessage = text;
	var self = this;
	window.setTimeout (function () {
		self.textMessage = null;
	}, 2000);
}

CanvasRenderer.prototype.renderMessage = function () {
	this.canvasContext.font = "bold 24px Arial";
	this.canvasContext.fillStyle = "#000";
	this.canvasContext.strokeStyle = "#88f";
	this.canvasContext.textAlign = "center";
	this.canvasContext.textWeight = "bold";
	this.canvasContext.strokeText (this.textMessage, this.renderSize[0]/2, this.renderSize[1]/2);
	this.canvasContext.fillText (this.textMessage, this.renderSize[0]/2, this.renderSize[1]/2);
}