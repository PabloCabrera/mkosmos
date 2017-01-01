window.onload = function() {
	area = new FixedArea ([64, 64]);
	area.setSurfaceRectPosition([2, 3], [4, 6], Surface.SAND)
	area.setSurfaceRectPosition([52, 34], [10, 12], Surface.GRASS)
	area.setSurfaceCirclePosition([25, 20], 19, Surface.ICE)
	area.setSurfaceCirclePosition([9, 40], 6, Surface.VOID)
	renderer = new SVGAreaRenderer (area);
	renderer.setViewSize([12, 9]);
	renderer.setRenderSize([800, 600]);
	renderer.render (document.body);
}

