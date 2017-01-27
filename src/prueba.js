window.onload = function() {
	area = new RemoteArea ("http://localhost:8000");
	/*
	area.setSurfaceRectPosition([2, 3], [4, 6], Surface.SAND)
	area.setSurfaceRectPosition([3, 4], [2, 4], Surface.GRASS)
	area.setSurfaceRectPosition([52, 34], [10, 12], Surface.GRASS)
	area.setSurfaceCirclePosition([25, 20], 19, Surface.SAND)
	area.setSurfaceCirclePosition([25, 20], 17, Surface.GRASS)
	area.setSurfaceCirclePosition([11, 22], 3, Surface.SAND)
	area.setSurfaceCirclePosition([20, 6], 4, Surface.SAND)
	area.setSurfaceCirclePosition([19, 4], 3, Surface.WATER)
	area.setSurfaceCirclePosition([9, 40], 6, Surface.ICE)
	*/
	renderer = new CanvasAreaRenderer (area);
	renderer.setViewSize([12, 12]);
	renderer.setRenderSize([600, 600]);
	renderer.render (document.body);
}

