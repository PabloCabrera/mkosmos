<!DOCTYPE HTML>
<head>
	<meta charset="utf-8" />
	<title>Clase Surface: μ-κosmos</title>
	<link rel="stylesheet" type="text/css" href="/shared.css" />
	<link rel="stylesheet" type="text/css" href="/desarrolladores.css" />
	<script src="/jquery-3.1.1.min.js"></script>
</head>

<body>

	<?php include "../nav.php"; ?>

	<section id="desarrolladores_section">
	
		<h1>Surface</h1>
		<p>El objeto Surface tiene información sobre los tipos de terreno</p>
		<h4>Surface.WATER</h4>
		<span class="surface_example" style="background-color: #44f"></span>
		Agua
		
		<h4>Surface.SHALLOW</h4>
		<span class="surface_example" style="background-color: #48f"></span>
		Agua de charco
		
		<h4>Surface.MUD</h4>
		<span class="surface_example" style="background-color: #864"></span>
		Barro
		
		<h4>Surface.QUICKSAND</h4>
		<span class="surface_example" style="background-color: #cc8"></span>
		Arena movediza
		
		<h4>Surface.GRASS</h4>
		<span class="surface_example" style="background-color: #4f4"></span>
		Pasto
		
		<h4>Surface.EARTH</h4>
		<span class="surface_example" style="background-color: #621"></span>
		Tierra
		
		<h4>Surface.SAND</h4>
		<span class="surface_example" style="background-color: #ff6"></span>
		Arena
		
		<h4>Surface.RED_EARTH</h4>
		<span class="surface_example" style="background-color: #a32"></span>
		Tierra roja
		
		<h4>Surface.ROCK</h4>
		<span class="surface_example" style="background-color: #866"></span>
		Roca
		
		<h4>Surface.MOUNTAIN</h4>
		<span class="surface_example" style="background-color: #666"></span>
		Roca de montaña
		
		<h4>Surface.BUILDING</h4>
		<span class="surface_example" style="background-color: #777"></span>
		Edificio
		
		<h4>Surface.COBBLE</h4>
		<span class="surface_example" style="background-color: #555"></span>
		Escombros
		
		<h4>Surface.BRICK</h4>
		<span class="surface_example" style="background-color: #a40"></span>
		Ladrillo
		
		<h4>Surface.ICE</h4>
		<span class="surface_example" style="background-color: #ccf"></span>
		Hielo
		
		<h4>Surface.SNOW</h4>
		<span class="surface_example" style="background-color: #eef"></span>
		Nieve
		
		<h4>Surface.METAL</h4>
		<span class="surface_example" style="background-color: #888"></span>
		Metal
		
		<h4>Surface.GOLD</h4>
		<span class="surface_example" style="background-color: #fe0"></span>
		Oro
		
		<h4>Surface.AIR</h4>
		<span class="surface_example" style="background-color: #0cf"></span>
		Aire
		
		<h4>Surface.CLOUD</h4>
		<span class="surface_example" style="background-color: #eef"></span>
		Nubes
		
		<h4>Surface.VOID</h4>
		<span class="surface_example" style="background-color: #000"></span>
		Vacío
		
		<h2>Funciones de Surface</h2>

		<h3>Surface.isSolid</h3>
		<p>Verifica si una superficie es sólida</p>
		<h4>Parámetros:</h4>
		<dl>
			<dt>surface</dt> <dd class="terreno">Tipo de terreno</dd>
		</dl>

	</section>

	<?php include "../footer.php"; ?>
</body>
