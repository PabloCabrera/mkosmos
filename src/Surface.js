/*
 * Tipos de superficie
 * 0-15 Agua
 * 16-31 Barro
 * 32-47 Tierra con vegetacion
 * 48-63 Tierra arida
 * 64-95 Roca
 * 96-127 Construido por humanos
 * 128-143 Hielo
 * 144-159 Metal
 * 160-175 
 * 176-191 
 * 192-207 
 * 208-223 
 * 224-239 Gaseoso
 * 240-255 Extranio 
 */

Surface = {
	WATER: 0,
	SWALLOW: 6,
	MUD: 16,
	QUICKSAND: 20,
	GRASS: 32,
	EARTH: 48,
	SAND: 49,
	RED_EARTH: 50,
	ROCK: 64,
	MOUNTAIN: 65,
	BUILDING: 96,
	COBBLE: 97,
	BRICK: 98,
	ICE: 128,
	SNOW: 129,
	METAL: 144,
	GOLD: 145,
	AIR: 224,
	CLOUD: 225,
	
	VOID: 255
};

SurfaceColor = [];
SurfaceColor[Surface.WATER]="#44f";
SurfaceColor[Surface.SWALLOW]="#48f";
SurfaceColor[Surface.MUD]="#864";
SurfaceColor[Surface.GRASS]="#4f4";
SurfaceColor[Surface.SAND]="#ff8";
SurfaceColor[Surface.ROCK]="#666";
SurfaceColor[Surface.SNOW]="#eef";
SurfaceColor[Surface.ICE]="#ccf";
SurfaceColor[Surface.METAL]="#888";
SurfaceColor[Surface.GOLD]="#fe0";
SurfaceColor[Surface.VOID]="#000";