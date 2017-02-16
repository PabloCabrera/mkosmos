<?php

require_once "SurfaceRect.php";
require_once "SurfaceSubscription.php";

class WorldServer {
	public $map;
	public $width;
	public $height;
	public $surfaceSubscriptors = [];
	public $objectSubscriptors = [];

	public static function loadFile ($filename) {
		$worldserver = new WorldServer (1, 1);
		$worldserver-> load ($filename);
		return $worldserver;
	}

	public function __construct ($width, $height) {
		$this-> width = $width;
		$this-> height = $height;
		$this-> map = str_repeat (chr(0), $width*$height);
	}

	public function getMap () {
		return $this-> getSurfaceRect (0, 0, $this-> width -1, $this-> height -1);
	}

	public function getSurfaceAt ($x, $y) {
		return $this-> map [($x* $this-> width) + $y];
	}

	public function getSurfaceRect ($left, $top, $right, $bottom) {
		$data = [];
		for ($x=$left; $x<=$right; $x++) {
			$data[] = $this-> stringToByteArray (substr ($this->map, ($x * $this->width) + $left, 1+$right-$left));
		}
		return new SurfaceRect ($left, $top, $right, $bottom, $data);
	}

	private function stringToByteArray ($str) {
		$arr = array();
		$length = strlen ($str);
		for ($index = 0; $index < $length; $index++) {
			$arr[$index] = ord($str[$index]);
		}
		return $arr;
	}

	public function setSurfaceAt ($x, $y, $surface) {
		$this-> map [$x* $this-> width + $y] = $surface;
	}

	public function setSurfaceRect ($left, $top, $right, $bottom, $surface) {
		for ($x=$left; $x<=$right; $x++) {
			for ($y=$top; $y<=$bottom; $y++) {
				$this-> map [$x* $this-> width + $y] = $surface;
			}
		}

		$updatedRect ($this-> getSurfaceRect ($left, $top, $right, $bottom));
		$this-> notifySurfaceChangeToSubscribers ($updatedRect);
	}

	public function setSurfaceCircle ($x, $y, $radius, $surface) {
		for ($xt = $x-$radius; $xt <= ($x+$radius); $xt++) {
			$hip2 = pow($radius, 2);
			$b2 = pow (($x-$xt), 2);
			$yLimit = (int) (sqrt ($hip2 - $b2));
			for ($yt = $y-$yLimit; $yt <= ($y+$yLimit); $yt++) {
				$this-> map [(int) (($xt* $this-> width) + $yt)] = $surface;
			}

			//$updatedRect = $this-> getSurfaceRect ($x-$radius, $y-$radius, $x+$radius, $y+$radius);
			$updatedRect = $this-> getSurfaceRect (0,0,128,128);
			$this-> notifySurfaceChangeToSubscribers ($updatedRect);
		}
	}

	public function subscribeToSurface ($left, $top, $right, $bottom, $conn) {
		echo "Se ha subscripto un cliente para recibir cambios de superficie.\n";
		$this-> unsubscribeToSurface ($conn);
		$this-> surfaceSubscriptors[] = new SurfaceSubscription ($left, $top, $right, $bottom, $conn);
	}

	public function unsubscribeToSurface ($conn) {
		// FIXME: esto deberia estar sincronizado como seccion critica
		$num_subscriptors = count($this-> surfaceSubscriptors);
		for ($i = 0; $i<$num_subscriptors; $i++) {
			if ($conn = $this-> surfaceSubscriptors[$i]-> conn) {
				array_slice ($this-> surfaceSubscriptors, $i, 1);
			}
		}
	}

	public function notifySurfaceChangeToSubscribers ($surfaceRect) {
		$json = null;

		foreach ($this->surfaceSubscriptors as $subscriptor) {
			if (WorldServer::rectsIntersect ($subscriptor, $surfaceRect)) {
				if ($json == null) {
					$json = json_encode ($surfaceRect);
				}
				echo "Se enviara un mensaje de actualizacion a un subscriptor\n";
				$subscriptor-> send ($json);
			}
		}
	}

	private static function rectsIntersect ($rect1, $rect2) {
		 return true;
	}

	public function save ($filename) {
		$json = json_encode ($this);
		file_put_contents ($filename, $json);
	}

	public function load ($filename) {
		$json = file_get_contents ($filename);
		$loaded = json_decode ($json);
		$this-> width = $loaded-> width;
		$this-> height = $loaded-> height;
		$this-> map = $loaded-> map;
	}

}
