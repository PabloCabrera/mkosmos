<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: MiniJuegos</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<link rel="stylesheet" type="text/css" href="minijuegos.css" />
	<script src="index.js"></script>
	<script src="jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "nav.php"; ?>

	<section id="minijuegos">

		<article class="minigame">
			<h2>Un detective en problemas</a></h2>
			<img src="juego_detective.png">
			<p>Tu misión es encontrar las joyas robadas. ¡Pero cuidado! Otros detectives estan buscandote para asesinarte.</p>
			<h3>Teclas</h3>
			<stroke>Flecha Arriba:</stroke> Caminar hacia arriba<br>
			<stroke>Flecha Abajo:</stroke> Caminar hacia abajo<br>
			<stroke>Flecha izquierda:</stroke> Caminar hacia la izquierda<br>
			<stroke>Flecha derecha:</stroke> Caminar hacia la derecha<br>
			<stroke>Barra espaciadora:</stroke> Disparar<br>
			<stroke>B:</stroke> Poner bomba<br>
			<a class="playButton" href="juego_detective.php">Jugar!</a>
		</article>
	</section>
	<?php include "footer.php"; ?>
</body>
