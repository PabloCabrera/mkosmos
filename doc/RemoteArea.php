<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase RemoteArea: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Librería javascript</h1>
		<h2>Métodos de clase RemoteArea</h2>

		<h3>getSurfaceAtPosition</h3>
		<p>Obtener el tipo de superficie en las coordenadas dadas
		<h4>Parámetros:</h4>
		<dl>
			<dt>position</dt> <dd class="array">Posición en formato array [x, y]</dd>
		</dl>

		<h3>getSurfaceAt</h3>
		<p>Obtener el tipo de superficie en las coordenadas dadas</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y</dd>
		</dl>

		<h3>setSurfaceAtPosition</h3>
		<p>Establecer el tipo de superficie en un punto especifico</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>position</dt> <dd class="array">Posición en formato array [x, y]</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
		</dl>

		<h3>getSurfaceRect</h3>
		<p>Obtener el tipo de superficie en un rectangulo</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>left</dt> <dd class="numerico">Límite izquierdo</dd>
			<dt>top</dt> <dd class="numerico">Límite superior</dd>
			<dt>right</dt> <dd class="numerico">Límite derecho</dd>
			<dt>bottom</dt> <dd class="numerico">Límite inferior</dd>
		</dl>

		<h3>execOnSurfaceRect</h3>
		<p>Ejecutar un callback asincrónicamente sobre una región rectangular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>left</dt> <dd class="numerico">Límite izquierdo</dd>
			<dt>top</dt> <dd class="numerico">Límite superior</dd>
			<dt>right</dt> <dd class="numerico">Límite derecho</dd>
			<dt>bottom</dt> <dd class="numerico">Límite inferior</dd>
			<dt>handler</dt> <dd class="callback">Callback</dd>
		</dl>

		<h3>setSurfaceAt</h3>
		<p>Establecer el tipo de superficie en un punto especifico</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y</dd>
			<dt>surface</dt> <dd class=""></dd>
		</dl>

		<h3>setSurfaceRect</h3>
		<p>Establecer el tipo de superficie en un area rectangular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>left</dt> <dd class="numerico">Límite izquierdo</dd>
			<dt>top</dt> <dd class="numerico">Límite superior</dd>
			<dt>right</dt> <dd class="numerico">Límite derecho</dd>
			<dt>bottom</dt> <dd class="numerico">Límite inferior</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
		</dl>

		<h3>setSurfaceCirclePosition</h3>
		<p>Establecer el tipo de superficie en un area circular</p>
		<dl>
			<dt>position</dt> <dd class="Array">Centro del círculo en formato array [x, y]</dd>
			<dt>radius</dt> <dd class="numerico">Radio</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
		</dl>

		<h3>setSurfaceCircle</h3>
		<p>Establecer el tipo de superficie en un area circular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X del centro del círculo</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y del centro del círculo</dd>
			<dt>radius</dt> <dd class="numerico">Radio</dd>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
		</dl>

		<h3>createObject</h3>
		<p>Crear un objeto. Se llamara al callback cuando se haya creado correctamente</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y</dd>
			<dt>speed_x</dt> <dd class="numerico">Velocidad inicial del objeto en coordenada X</dd>
			<dt>speed_y</dt> <dd class="nuerico">Velocidad inicial del objeto en coordenada Y</dd>
			<dt>radius</dt> <dd class="numerico">Radio del objeto</dd>
			<dt>archetype_url</dt> <dd class="url">URL del arquetipo del objeto</dd>
			<dt>callback</dt> <dd class="callback">callback</dd>
		</dl>

		<h3>destroyObject</h3>
		<p>Destruir un objeto.</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>object</dt> <dd class="objeto">Objeto</dd>
		</dl>

		<h3>setRenderer</h3>
		<h4>Parámetros:</h4>
		<dl>
			<dt>renderer</dt> <dd class="Renderer">Establecer renderizador</dd>
		</dl>

	</section>

	<?php include "../footer.php"; ?>
</body>
