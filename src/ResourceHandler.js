ResourceHandler = function () {
	this.archetypes = {}
	this.tilesets = {}
	this.frameDuration = 250; // Esto es para los sprites animados
}

ResourceHandler.prototype.execOnArchetype = function (url, callback) {
	if (this.archetypes[url] != undefined) {
		callback (this.archetypes [url]);
	} else {
		var self = this;
		$.ajax (url, {
			method: "GET",
			dataType: "json",
		  	success: function (data) {
				self.archetypes [url] = data;
				if (data.tileset.url) {
					self.loadTile (data.tileset.url);
				}
				callback (data);
			},
		  	error: function (err) {
					console.log ("Ajax error");
			}
		});
	}
}

ResourceHandler.prototype.loadTile = function (url) {
	var record = {
		isLoaded: false,
		image: new Image()
	};
	record.image.onload = function () {
		record.isLoaded = true;
	}
	record.image.src = url;
	this.tilesets[url] = record;
}

ResourceHandler.prototype.hasObjectSprite = function (object) {
	return (
		object.archetype &&
		object.archetype.tileset &&
		this.hasTile (object.archetype.tileset.url)
	);
}

ResourceHandler.prototype.hasTile = function (url) {
	if (this.tilesets [url] != undefined) {
		return this.tilesets[url].isLoaded;
	}
}

ResourceHandler.prototype.drawObject = function (object, canvas, x, y, width, height, time) {
	if (object.archetype_url && object.current_sprite) {
		this.drawTile (object.archetype_url, object.current_sprite, canvas, x, y, width, height, time);
	}
}

ResourceHandler.prototype.drawTile = function (url, sprite, canvas, dx, dy, dwidth, dheight, time) {
	var archetype = this.archetypes[url];
	if (archetype && archetype.sprites[sprite]) {
		var tileset_url = archetype.tileset.url;
		if (tileset_url && this.hasTile (tileset_url)) {
			var frame = Math.floor(time/this.frameDuration) % archetype.sprites[sprite].length;
			var tileset = this.tilesets[tileset_url].image;
			var sx = archetype.sprites[sprite][frame][0] * archetype.tileset.tile_size[0];
			var sy = archetype.sprites[sprite][frame][1] * archetype.tileset.tile_size[1];
			var swidth = archetype.tileset.tile_size[0];
			var sheight = archetype.tileset.tile_size[1];

			canvas.drawImage (
				tileset,
				sx, sy,
				swidth, sheight,
				dx, dy,
				dwidth, dheight
 			);
		}
	}
}
