<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>μ-κosmos: Información para desarrolladores</title>
	<link rel="stylesheet" type="text/css" href="shared.css" />
	<link rel="stylesheet" type="text/css" href="desarrolladores.css" />
	<script src="index.js"></script>
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


		<h2>Mensajes enviados por el cliente</h2>

		<h3>Surface Get</h3>
		<p>Solicita al servidor datos del terreno</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"get"</dd>
		</dl>

		<h3>Surface Subscribe</h3>
		<p>Solicita subscripción a un area rectangular. Esto significa que el servidor deberá notificarle cuando se produzcan cambios en el terreno dentro de dicha area.</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"subscribe"</dd>
			<dt>left</dt> <dd class="numerico">Valor numérico. Límite izquierdo.</dd>
			<dt>top</dt> <dd class="numerico">Valor numérico. Límite superior.</dd>
			<dt>right</dt> <dd class="numerico">Valor numérico. Límite derecho.</dd>
			<dt>bottom</dt> <dd class="numerico">Valor numérico. Límite inferior.</dd>
		</dl>

		<h3>Surface Replace</h3>
		<p>Solicita reemplazar el terreno en unas coordenadas dadas.</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"replace"</dd>
			<dt>x</dt> <dd class="numerico">Valor numérico. Coordenada en el eje X (longitud).</dd>
			<dt>y</dt> <dd class="numerico">Valor numérico. Coordenada en el eje Y (latitud)</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno.</dd>

		</dl>

		<h3>Surface Set (Rectangle)</h3>
		<p>Solicita reemplazar el terreno en un area rectangular.</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"set"</dd>
			<dt>shape</dt> <dd>"rectangle"</dd>
			<dt>left</dt> <dd class="numerico">Valor numérico. Límite izquierdo.</dd>
			<dt>top</dt> <dd class="numerico">Valor numérico. Límite superior.</dd>
			<dt>right</dt> <dd class="numerico">Valor numérico. Límite derecho.</dd>
			<dt>bottom</dt> <dd class="numerico">Valor numérico. Límite inferior.</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno.</dd>

		</dl>

		<h3>Surface Set (Circle)</h3>
		<p>Solicita reemplazar el terreno en un area rectangular.</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"set"</dd>
			<dt>shape</dt> <dd>"circle"</dd>
			<dt>x</dt> <dd class="numerico">Valor numérico. Coordenada en el eje X (longitud).</dd>
			<dt>y</dt> <dd class="numerico">Valor numérico. Coordenada en el eje Y (latitud).</dd>
			<dt>radius</dt> <dd class="numerico">Valor numérico. Radio del círculo.</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno.</dd>

		</dl>

		<h3>Object Subscribe</h3>
		<p>Solicita subscripción a un area rectangular. Esto significa que el servidor deberá notificarle cuando se produzcan cambios en objetos dentro de dicha area.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"subscribe"</dd>
			<dt>left</dt> <dd class="numerico">Valor numérico. Límite izquierdo.</dd>
			<dt>top</dt> <dd class="numerico">Valor numérico. Límite superior.</dd>
			<dt>right</dt> <dd class="numerico">Valor numérico. Límite derecho.</dd>
			<dt>bottom</dt> <dd class="numerico">Valor numérico. Límite inferior.</dd>
		</dl>

		<h3>Object Create</h3>
		<p>Solicita la creación de un objeto.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"create"</dd>
			<dt>request_id</dt> <dd class="entero">Valor entero. Identificador de la solicitud.</dd>
			<dt>archetype_url</dt> <dd class="url">URL</dd>
			<dt>radius</dt> <dd class="numerico">Valor numérico. Radio que se aproxime al tamaño del objeto.</dd>
			<dt>x</dt> <dd class="numerico">Valor numérico. Coordenada en eje X (longitud).</dd>
			<dt>y</dt> <dd class="numerico">Valor numérico. Coordenada en eje Y (latitud).</dd>
			<dt>speed_x</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje X positivo (derecha).</dd>
			<dt>speed_y</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje Y positivo (abajo).</dd>
		</dl>

		<h3>Object Update Status</h3>
		<p>Informa sobre el estado de un objeto bajo el control del cliente.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"update status"</dd>
			<dt>x</dt> <dd class="numerico">Valor numérico. Coordenada en eje X (longitud).</dd>
			<dt>y</dt> <dd class="numerico">Valor numérico. Coordenada en eje Y (latitud).</dd>
			<dt>speed_x</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje X positivo (derecha).</dd>
			<dt>speed_y</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje Y positivo (abajo).</dd>
		</dl>

		<h2>Mensajes enviados por el servidor</h2>

		<h3>Surface</h3>
		<p>Informa sobre el estado del terreno en un area rectangular</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>left</dt> <dd class="numerico">Valor numérico. Límite izquierdo.</dd>
			<dt>top</dt> <dd class="numerico">Valor numérico. Límite superior.</dd>
			<dt>right</dt> <dd class="numerico">Valor numérico. Límite derecho.</dd>
			<dt>bottom</dt> <dd class="numerico">Valor numérico. Límite inferior.</dd>
			<dt>data</dt> <dd class="terreno">Tipo de terreno (array).</dd>
		</dl>

		<h3>Object</h3>
		<p>Informa sobre el estado de un objeto.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>object_id</dt> <dd class="entero">Valor entero</dd>
			<dt>archetype_url</dt> <dd class="url">URL</dd>
			<dt>radius</dt> <dd class="numerico">Valor numérico. Radio que se aproxime al tamaño del objeto.</dd>
			<dt>x</dt> <dd class="numerico">Valor numérico. Coordenada en eje X (longitud).</dd>
			<dt>y</dt> <dd class="numerico">Valor numérico. Coordenada en eje Y (latitud).</dd>
			<dt>speed_x</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje X positivo (derecha).</dd>
			<dt>speed_y</dt> <dd class="numerico">Valor numérico. Velocidad hacia eje Y positivo (abajo).</dd>
		</dl>

		<h3>Object Destroy</h3>
		<p>Informa sobre la destrucción de un objeto</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"destroy"</dd>
			<dt>id</dt> <dd class="numerico">Valor numérico. Identificador del objeto.</dd>
		</dl>

		<h3>Object Grant Control</h3>
		<p>Informa a un cliente que posee el control sobre un objeto. Esto significa que el cliente tiene permiso para cambiar el estado del objeto.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"grant control"</dd>
			<dt>object_id</dt> <dd class="numerico">Valor numérico. Identificador del objeto.</dd>
			<dt>request_id</dt> <dd class="numerico">Valor numérico. Identificador de la solicitud de creación del objeto.</dd>
		</dl>

	</section>

	<?php include "footer.php"; ?>
</body>
