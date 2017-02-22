ObjectUpdater = function (object) {
	this.object = object;
	this.lastStep = Date.now ();
	this.sendMsgInterval = 1000;
	this.lastSendMsg = Date.now ();
	this.area = null;
	this.collisionChecks=[];
}

ObjectUpdater.prototype.step = function (now) {
	var elapsed = (now - this.lastStep)/1000;
	this.object.x += this.object.speed_x * elapsed;
	this.object.y += this.object.speed_y * elapsed;
	this.lastStep = now;

	if ((this.area != null) && ((now - this.lastSendMsg) > this.sendMsgInterval)) {
		this.sendUpdateMsg();
	}
}

ObjectUpdater.prototype.update = function () {
	var now = Date.now ();
	var elapsed = (now - this.lastStep)/1000;
	this.object.x += this.object.speed_x * elapsed;
	this.object.y += this.object.speed_y * elapsed;
	this.lastStep = now;

	if (this.area != null) {
		this.sendUpdateMsg();
	}
}

ObjectUpdater.prototype.sendUpdateMsg = function () {
	var msg = {
		entity: "object",
		action: "update status",
		id: this.object.id,
		x: this.object.x,
		y: this.object.y,
		speed_x: this.object.speed_x,
		speed_y: this.object.speed_y,
		current_sprite: this.object.current_sprite
	}

	this.area.sendMessage (msg);
	this.lastSendMsg = Date.now();
}

ObjectUpdater.prototype.setAreaToSendUpdates = function (area) {
	this.area = area;
}
