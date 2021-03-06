<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: MiniJuegos</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<link rel="stylesheet" type="text/css" href="minijuegos.css" />
	<script src="jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "nav.php"; ?>

	<section id="minijuegos">

		<article class="minigame">
			<h2>Un detective en apuros</h2>
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

		<article class="minigame">
			<h2>Comer Prehistórico</h2>
			<img src="juego_allosaurus.png">
			<p>Come todo a tu paso</p>
			<h3>Teclas</h3>
			<stroke>Flecha Arriba:</stroke> Correr hacia arriba<br>
			<stroke>Flecha Abajo:</stroke> Correr hacia abajo<br>
			<stroke>Flecha izquierda:</stroke> Correr hacia la izquierda<br>
			<stroke>Flecha derecha:</stroke> Correr hacia la derecha<br>
			<a class="playButton" href="juego_allosaurus.php">Jugar!</a>
		</article>
	</section>
	<?php include "footer.php"; ?>
</body>
