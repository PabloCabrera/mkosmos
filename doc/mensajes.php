<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Mensajes cliente-servidor μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Mensajes cliente-servidor</h1>
		<p>Para la comunicación entre los clientes y el servidor se utiliza el envío de mensajes asíncronos mediante la tecnología <a href="https://developer.mozilla.org/es/docs/Web/API/WebSocket">WebSocket</a></p>
		<p>El desarrollador que utilice las librerías javascript de μ-κosmos no necesita conocer estos mensajes, ya que dichas librerías abstraen este trabajo.</p>
		<p>Conocer el formato de estos mensajes es necesario para desarrollar implementaciones alternativas, que no utilicen las librerías javascript.</p>

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

		<h3>Surface Set (X, Y)</h3>
		<p>Solicita reemplazar el terreno en unas coordenadas dadas.</p>
		<dl>
			<dt>entity</dt> <dd>"surface"</dd>
			<dt>action</dt> <dd>"set"</dd>
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
			<dt>current_sprite</dt> <dd class="texto">Texto. Nombre del sprite.</dd>
		</dl>
		
		<h3>Object Destroy</h3>
		<p>Informa sobre la destrucción de un objeto bajo el control del cliente.</p>
		<dl>
			<dt>entity</dt> <dd>"object"</dd>
			<dt>action</dt> <dd>"destroy"</dd>
			<dt>id</dt> <dd class="entero">Valor entero. Identificador del objeto<dd>
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

	<?php include "../footer.php"; ?>
</body>
