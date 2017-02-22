CollisionChecker = function () {
	this.checks = [];
	this.intervalHandler = null;
	this.cps = 10; //Chequeos por segundo
	this.start();
}

CollisionChecker.prototype.addCheck = function (one, other, callback) {
	this.checks.push ({
		one: one,
		other: other,
		callback: callback
	});
}

CollisionChecker.prototype.removeChecksForObject = function (object) {
	//FIXME: esto deberia estar sincronizado como seccion critica
	for (var i=0; i<this.checks.length; i++) {
		if (this.checks[i].object.id == object.id) {
			this.checks.splice(i, 1);
		}
	}
}

CollisionChecker.prototype.removeCheck = function (one, other) {
	//FIXME: esto deberia estar sincronizado como seccion critica
	for (var i=0; i<this.checks.length; i++) {
		if (this.checks[i].one.id == one.id && this.checks[i].other.id == other.id) {
			this.checks.splice(i, 1);
		}
	}
}

CollisionChecker.prototype.checkAll = function () {
	var self = this;
	this.checks.forEach (function (record) {
		if (self.collide (record.one, record.other)) {
			record.callback (record.one, record.other);
		}
	});
}

CollisionChecker.prototype.collide = function (one, another) {
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

CollisionChecker.prototype.start = function () {
	var self = this;
	this.intervalHandler = window.setInterval (function () {
		self.checkAll();
	}, 1000/this.cps);
}


CollisionChecker.prototype.stop = function () {
	if (this.intervalHandler != null) {
		window.clearInterval (this.intervalHandler);
		this.intervalHandler = null;
	}
}