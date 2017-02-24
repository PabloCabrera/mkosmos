<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase ObjectUpdater: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
	<h1>Clase ObjectUpdater</h1>
	<p>La clase ObjectUpdater es la encargada de actualizar la posición de los objetos en movimiento, y enviar estas actualizaciones al servidor.</p>
	<p>Una instancia de ObjectUpdater se crea automáticamente para cada objeto gestionado por RemoteArea, y puede accederse mediante la propiedad updater</p>
	<h4>Ejemplo</h4>
	<code>
		var player = remote_area.objects[3];<br>
		player.speed_x = 2.5;<br>
		player.updater.update();<br>
	</code>

	<h2>Métodos de clase ObjectUpdater</h2>

	<h3>update</h3>
	<p>Forzar la actualización</p>

	</section>

	<?php include "../footer.php"; ?>
</body>
