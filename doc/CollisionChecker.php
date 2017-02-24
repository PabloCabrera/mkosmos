<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase CollisionChecker: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Clase CollisionChecker</h1>
		<p>La clase CollisionChecker es la encarga de detectar colisiones entre objetos.</p>
		<p>Una instancia de esta clase es creada automáticamente por RemoteArea, y puede accederse a través de la propiedad collisionChecker del objeto RemoteArea</p>
		<h4>Ejemplo</h4>
		<code>
			var area = new RemoteArea (...);<br>
			area.collisionChecker.addCheck (...);
		</code>
		
		<h2>Métodos de clase CollisionChecker</h2>

		<h3>addCheck</h3>
		<p>Agregar comprobación de colisiones entre dos objetos</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>one</dt> <dd class="objeto">Primer objeto</dd>
			<dt>other</dt> <dd class="objeto">Segundo objeto</dd>
			<dt>callback</dt> <dd class="callback">Callback a ejecutar cuando se detecte colisión</dd>
		</dl>

		<h3>addCheckByAttribute</h3>
		<p>Agregar comprobación de colisiones entre un objeto y cualquiera con un atributo especifcado</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>object</dt> <dd class="objeto">Objeto</dd>
			<dt>atr_name</dt> <dd class="text">Nombre del atributo</dd>
			<dt>atr_value</dt> <dd>Valor del atributo</dd>
			<dt>callback</dt> <dd class="callback">Callback a ejecutar cuando se detecte colisión</dd>
		</dl>

		<h3>removeChecksForObject</h3>
		<p>Quitar todas las comprobaciones de colisión para un objeto</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>object</dt> <dd class="objeto">Objeto</dd>
		</dl>

		<h3>removeCheck</h3>
		<p>Quitar comprobación de colisiones entre dos objetos</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>one</dt> <dd class="objeto">Primer objeto</dd>
			<dt>other</dt> <dd class="objeto">Segundo objeto</dd>
		</dl>

		<h3>collide</h3>
		<p>Comprueba si hay colisión entre dos objetos</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>one</dt> <dd class="objeto">Primer objeto</dd>
			<dt>another</dt> <dd class="objeto">Segundo objeto</dd>
		</dl>


		<h3>stop</h3>
		<p>Detiene la comprobación de colisiones</p>


	</section>

	<?php include "../footer.php"; ?>
</body>
