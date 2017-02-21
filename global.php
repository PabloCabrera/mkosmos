<html>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: Mapa del mundo</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<script src="index.js"></script>
	<script src="jquery-3.1.1.min.js"></script>
	<script type="application/javascript" src="config.js"></script>
	<script type="application/javascript" src="jquery-3.1.1.min.js"></script>
	<script type="application/javascript" src="src/RemoteArea.js"></script>
	<script type="application/javascript" src="src/ObjectUpdater.js"></script>
	<script type="application/javascript" src="src/CanvasAreaRenderer.js"></script>
	<script type="application/javascript" src="src/Surface.js"></script>
	<script type="application/javascript" src="src/SVGTileFactory.js"></script>
	<script type="application/javascript" src="global.js"></script>
	<link rel="stylesheet" type="text/css" link="shared.css" />
	<style>
		canvas {
			border: 1px solid black;
			margin-left: auto;
			margin-right: auto;

		}
		
		.controllers {
			float: right;
			width: 200px;
			text-align: center;
		}
	</style>
</head>
<body>

	<?php include "nav.php"; ?>

	<section id="global_map_section">
	<div class="controllers">
	<input type="number" value="1" min="0.5" step="0.5" max="10" onload="renderer.setZoomLevel(this.value)" onchange="renderer.setZoomLevel(this.value)">
	<button onclick="renderer.move(0, -5)">Arriba</button>
	<br>
	<button onclick="renderer.move(-5, 0)">Izquierda</button>
	<button onclick="renderer.move(5, 0)">Derecha</button>
	<br>
	<button onclick="renderer.move(0, 5)">Abajo</button>
	<br>
	<br>
	<button onclick="generateCircle()">Generar circulo</button>
	<button onclick="generateRect()">Generar rectangulo</button>
	<br>
	<br>
	<button onclick="createObject()">Generar Objeto</button>
	<button onclick="moveObjects()">Mover Objetos</button>
	</section>
</body>
