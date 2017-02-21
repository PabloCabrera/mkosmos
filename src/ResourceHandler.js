ResourceHandler = function () {
	this.archetypes = {}
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
				callback (data);
			},
		  	error: function (err) {
					console.log ("Ajax error");
			}
		});
	}
}
