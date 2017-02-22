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

	this.checkCollisions ();

	if ((this.area != null) && ((now - this.lastSendMsg) > this.sendMsgInterval)) {
		this.sendUpdateMsg();
	}
}

ObjectUpdater.prototype.checkCollisions = function () {
	var self = this;
	this.collisionChecks.forEach (function (record) {
		if (self.collide (self.object, record.other)) {
			record.callback (self.object, record.other);
		}
	});
}

ObjectUpdater.prototype.collide = function (one, another) {
	var min_distance = one.radius + another.radius;
	if (
		(Math.abs (one.x - another.x) < min_distance)
		&& (Math.abs (one.y - another.y) < min_distance)
		&& (Math.sqrt (Math.pow (one.x - another.x, 2) + Math.pow (one.y - another.y, 2)) < min_distance)
	) {
		return true;
	} else {
		return false;
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

ObjectUpdater.prototype.addCollisionCheck = function (other, callback) {
	this.collisionChecks.push ({
		other: other,
		callback: callback
	});
}

ObjectUpdater.prototype.removeCollisionCheck = function (other) {
	//FIXME: esto deberia estar sincronizado como seccion critica
	for (var i=0; i<this.collisionChecks.length; i++) {
		if (this.collisionChecks[i].other.id == other.id) {
			this.collisionChecks.splice(i, 1);
		}
	}
}
