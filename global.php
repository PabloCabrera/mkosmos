<html>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: Mapa del mundo</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<link rel="stylesheet" type="text/css" href="editor.css" />
	<script src="index.js"></script>
	<script src="jquery-3.1.1.min.js"></script>
	<script type="application/javascript" src="config.js"></script>
	<script type="application/javascript" src="jquery-3.1.1.min.js"></script>
	<script type="application/javascript" src="src/RemoteArea.js"></script>
	<script type="application/javascript" src="src/ObjectUpdater.js"></script>
	<script type="application/javascript" src="src/CanvasRenderer.js"></script>
	<script type="application/javascript" src="src/Surface.js"></script>
	<script type="application/javascript" src="src/TileFactory.js"></script>
	<script type="application/javascript" src="src/ResourceHandler.js"></script>
	<script type="application/javascript" src="src/CollisionChecker.js"></script>
	<script type="application/javascript" src="global.js"></script>
</head>
<body>

	<?php include "nav.php"; ?>

	<section id="global_map_section">
	<div class="controllers">
	<header>Editor de mapa</header>
	<label for="surface_type">Tipo de terreno: </label>
	<span id="surface_example"></span>
	<select name="surface_type"></select>
	<br>
	<br>
	<label for="brush_shape">Forma del pincel: </label>
	<select name="brush_shape">
		<option value="square">Cuadrado</option>
		<option value="circle">Redondo</option>
	</select>
	<br>
	<label for="brush_size">Tama&ntilde;o del pincel: </label>
	<input name="brush_size" type="number" value="4" min="1" max="128" step="1">
	<br>
	</section>
	<?php include "footer.php"; ?>
</body>
