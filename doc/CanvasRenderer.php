<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase CanvasRenderer: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Librería javascript</h1>
		<h2>Métodos de clase CanvasRenderer</h2>

		<h3>setZoomLevel</h3>
		<p>Establecer un nivel de zoom</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>zoomLevel</dt> <dd class="entero">Valor entero. Nivel de zoom.</dd>
		</dl>

		<h3>renderStep</h3>


		<h3>render</h3>
		<p>Crear elemento canvas y poner en container</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>container</dt> <dd class="">Elemento DOM HTML.</dd>
			<dt>maxFps</dt> <dd class="entero">Valor entero. Cuadros máximos por segundo.</dd>
		</dl>

		<h3>adjust</h3>
		<p>Ajustar posicion y tamaño</p>


		<h3>refresh</h3>
		<p>Actualizar imagen</p>


		<h3>drawSurfaceRect</h3>
		<p>Dibujar un area rectangular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>rect</dt> <dd class="">Objeto con propiedades left, top, right y bottom</dd>
		</dl>

		<h3>drawTile</h3>
		<p>Dibujar un tile particular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
			<dt>x</dt> <dd class="numerico">Coordenada X</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y</dd>
		</dl>

		<h3>goToPosition</h3>
		<p>Moverse a un punto determinado</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>destination</dt> <dd class="array">Destino en formato array [x, y]</dd>
		</dl>

		<h3>goTo</h3>
		<p>Moverse a unas coordenadas determinadas</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y</dd>
		</dl>

		<h3>follow</h3>
		<p>Seguir a un objeto particular</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>target</dt> <dd class="objeto">Objeto a seguir</dd>
		</dl>

		<h3>stopFollow</h3>
		<p>Dejar de seguir a un objeto</p>


		<h3>move</h3>
		<p>Moverse a una ubicacion relativa </p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>x</dt> <dd class="numerico">Coordenada X relativa</dd>
			<dt>y</dt> <dd class="numerico">Coordenada Y relativa</dd>
		</dl>

		<h3>setViewOrigin</h3>
		<p>Establecer la esquina superior izquierda de la vista en el area
		<h4>Parámetros:</h4>
		<dl>
			<dt>origin</dt> <dd class="array">Origen en formato array [x, y]</dd>
		</dl>

		<h3>setViewSize</h3>
		<p>Establecer el tamaño de la vista
		<h4>Parámetros:</h4>
		<dl>
			<dt>size</dt> <dd class="array">Tamaño en formato array [x, y]</dd>
		</dl>

		<h3>setRenderSize</h3>
		<p>Establecer el tamaño de la renderización
		<h4>Parámetros:</h4>
		<dl>
			<dt>size</dt> <dd class="array">Tamaño en formato array [x, y]</dd>
		</dl>


		<h3>showMessage</h3>
		<p>Mostrar mensaje</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>text</dt> <dd class="texto">Mensaje a mostrar</dd>
		</dl>


	</section>

	<?php include "../footer.php"; ?>
</body>
