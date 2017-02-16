<?php
require_once "WorldServer.php";
require_once "Surface.php";

const MIN_NUM_ISLANDS = 28;
const MAX_NUM_ISLANDS = 40;
const MIN_RADIUS_ISLAND = 8;
const MAX_RADIUS_ISLAND = 16;
const MIN_RECURSION = 0;
const MAX_RECURSION = 8;
	
class WorldGenerator {
	public static function generateIslands ($width, $height) {

		
		$world = new WorldServer ($width, $height);
		$numIslands = rand (MIN_NUM_ISLANDS, MAX_NUM_ISLANDS);
		for ($i = 0; $i < $numIslands; $i++) {
			$radius = rand (MIN_RADIUS_ISLAND, MAX_RADIUS_ISLAND);
			$x = rand ($radius, $width-$radius);
			$y = rand ($radius, $height-$radius);
			$world-> setSurfaceCircle ($x, $y, $radius, SURFACE_GRASS);
		}
		WorldGenerator::makeSandBorders($world);
		
		return $world;
	}

	private static function makeSandBorders ($world) {
		for ($x=1; $x < ($world->width)-1; $x++) {
			for ($y=1; $y < ($world->height)-1; $y++) {
				$surface = $world-> getSurfaceAt ($x, $y);
				if ($surface == SURFACE_GRASS && WorldGenerator::isWaterAround ($world, $x, $y)) {
					$world-> setSurfaceAt ($x, $y, SURFACE_SAND);
				}
			}
		}
	}

	private static function isWaterAround ($world, $x, $y) {
		return (
			($world-> getSurfaceAt($x-1, $y) == SURFACE_WATER)
			||($world-> getSurfaceAt($x-1, $y) == SURFACE_WATER)
			||($world-> getSurfaceAt($x+1, $y) == SURFACE_WATER)
			||($world-> getSurfaceAt($x, $y-1) == SURFACE_WATER)
			||($world-> getSurfaceAt($x, $y+1) == SURFACE_WATER)
		);
	}
}
