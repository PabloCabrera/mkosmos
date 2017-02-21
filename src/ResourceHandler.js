ResourceHandler = function () {
	this.archetypes = {}
}

ResourceHandler.prototype.execOnArchetype = function (url, callback) {
	console.log ("execOnArchetype "+url);
	if (this.archetypes[url] != undefined) {
		callback (this.archetypes [url]);
	} else {
		var self = this;
		$.ajax (url, {
			method: "GET",
			dataType: "json",
		  	success: function (data) {
				self.archetypes [url] = data;
				console.log ("ajax success");
				callback (data);
			},
		  	error: function (err) {
					console.log ("Ajax error");
			}
		});
	}
}
