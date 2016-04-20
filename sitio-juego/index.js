var init = function () {
	showTab('Jugar');
}

var showElement = function (id) {
	document.getElementById(id).style.display = "block";
}
var hideElement = function (id) {
	document.getElementById(id).style.display = "none";
}

var tabs = [
	"sectionJugar",
	"sectionNoticias",
	"sectionComoJugar",
	"sectionDesarrolladores",
	"sectionMiPerfil"
];

var showTab = function (tab) {
	hideTabs();	
	showElement("section" + tab);
}

var hideTabs = function () {
	tabs.forEach(function (tab) {
		hideElement(tab);
	});
}

window.onload = init;
