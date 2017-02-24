<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase ResourceHandler: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Clase ResourceHandler</h1>
		<p>La clase ResourceHandler es la encargada de cargar y gestionar los recursos externos como imagenes y definiciones de arquetipos</p>
		<p>Una instancia de esta clase es creada automáticamente por RemoteArea, y puede accederse a través de la propiedad resourceHandler del objeto RemoteArea</p>
		<code>
			var area = new RemoteArea (...);<br>
			area.resourceHandler.preloadArchetype (...);
		</code>

		<h2>Métodos de clase ResourceHandler</h2>

		<h3>preloadArchetype</h3>
		<p>Pre-cargar arquetipo</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>url</dt> <dd class="url">URL del arquetipo</dd>
		</dl>

	</section>

	<?php include "../footer.php"; ?>
</body>
