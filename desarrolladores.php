<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: Información para desarrolladores</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<link rel="stylesheet" type="text/css" href="desarrolladores.css" />
	<script src="jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "nav.php"; ?>

	<section id="desarrolladores_section">
		<h2>Introducción</h2>
		<p>μ-κosmos permite a desarrolladores crear juegos e integrarlos en el mundo virtual compartido. Para ello se provee un conjunto de archivos fuente JavaScript que pueden utilizarse como base para el juego. Estos archivos proveen funcionalidades comunes a todos los juegos, como el renderizado, movimiento de personajes, y la comuniación asincrónica con el servidor.</p>
		<p>Además, en este documento se detallan los mensajes que el servidor puede enviar y recibir. Con esta información  es posible desarrollar otras implementaciones diferentes, y aún asi mantener la compatibilidad.</p>

		<h2>Arquitectura</h2>
		<p>μ-κosmos utiliza una arquitectura cliente-servidor, donde el servidor se encarga de sincronizar el terreno y la posicion de los objetos, y los clientes que se encargan de la lógica del juego, de la interacción con el usuario, y la presentación visual (renderizado).</p>
		<p>El objetivo es soportar la mayor cantidad de clientes posibles, por lo que se ha intentado quitar responsabilidades al servidor y transferirlas a los clientes, para de esta manera reducir la carga del servidor. Por esta razón son los clientes los responsables de calcular la posición de los objetos en movimiento y detectar colisiones.</p>

		<h2>Tecnologías utilizadas</h2>
		<p>Para la comunicación entre los clientes y el servidor se utiliza la tecnología <a href="https://developer.mozilla.org/es/docs/Web/API/WebSocket">WebSocket</a> por lo que es necesario utilizar un navegador actualizado.</p>
		<p>Para el renderizado se utiliza el elemento <a href="https://developer.mozilla.org/es/docs/Web/HTML/Canvas">Canvas</a> de HTML 5.<p>
		<p>Los recursos externos como <em>sprites</em> se cargan mediante Ajax, utilizando la librería <a href="https://jquery.com/">jQuery</a>.</p>

		<h2>Especificacion de Mensajes</h2>
		<p>El formato de los mensajes que utilizan el cliente y el servidor para comunicarse esta especificado en <a href="/doc/mensajes.php">Referencia de mensajes cliente-servidor</a>
		
		<h2>Librería Javascript</h2>
		<p>Las librerías javascript de μ-κosmos proveen funcionalidades comunes a multiples juegos, como el renderizado, movimiento de personajes, y la comuniación asincrónica con el servidor.</p>
		<p>La documentación de referencia para cada una de las clases se encuentra en los enlaces a continuación</p>
		<ul>
			<li><a href="doc/RemoteArea.php">RemoteArea</a></li>
			<li><a href="doc/CanvasRenderer.php">CanvasRenderer</a></li>
			<li><a href="doc/Surface.php">Surface</a></li>
			<li><a href="doc/CollisionChecker.php">CollisionChecker</a></li>
			<li><a href="doc/ObjectUpdater.php">ObjectUpdater</a></li>
			<li><a href="doc/ResourceHandler.php">ResourceHandler</a></li>
		</ul>

	</section>

	<?php include "footer.php"; ?>
</body>
