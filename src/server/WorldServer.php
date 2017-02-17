<?php

require_once "SurfaceRect.php";
require_once "Subscription.php";
require_once "WorldObject.php";
require_once "DestroyObjectMessage.php";

class WorldServer {
	public $map;
	public $width;
	public $height;
	private $surfaceSubscriptors = array();
	private $objectSubscriptors = array();
	private $objects = null;
	private $objectsByOwner = null;


	public function __construct ($width, $height) {
		$this-> width = $width;
		$this-> height = $height;
		$this-> map = str_repeat (chr(0), $width*$height);
		$this-> objects = new SplObjectStorage();
		$this-> objectsByOwner = new SplObjectStorage();
	}

	public static function loadFile ($filename) {
		$worldserver = new WorldServer (1, 1);
		$worldserver-> load ($filename);
		return $worldserver;
	}
	
	public function getMap () {
		return $this-> getSurfaceRect (0, 0, $this-> width -1, $this-> height -1);
	}

	public function getSurfaceAt ($x, $y) {
		return $this-> map [($x* $this-> width) + $y];
	}

	public function getSurfaceRect ($left, $top, $right, $bottom) {
		$data = array();
		for ($x=$left; $x<=$right; $x++) {
			$data[] = $this-> stringToByteArray (substr ($this->map, ($x * $this->width) + $top, 1+$bottom-$top));
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

		$updatedRect = ($this-> getSurfaceRect ($left, $top, $right, $bottom));
		$this-> notifySurfaceChange ($updatedRect);
	}

	public function setSurfaceCircle ($x, $y, $radius, $surface) {
		for ($xt = $x-$radius; $xt <= ($x+$radius); $xt++) {
			$hip2 = pow($radius, 2);
			$b2 = pow (($x-$xt), 2);
			$yLimit = (int) (sqrt ($hip2 - $b2));
			for ($yt = $y-$yLimit; $yt <= ($y+$yLimit); $yt++) {
				$this-> map [(int) (($xt* $this-> width) + $yt)] = $surface;
			}
		}

		$updatedRect = $this-> getSurfaceRect (($x-$radius), ($y-$radius), ($x+$radius), ($y+$radius));
		$this-> notifySurfaceChange ($updatedRect);
	}

	public function subscribeToSurface ($left, $top, $right, $bottom, $conn) {
		echo "Se ha subscripto un cliente para recibir cambios de superficie.\n";
		$this-> unsubscribeToSurface ($conn);
		$this-> surfaceSubscriptors[] = new Subscription ($left, $top, $right, $bottom, $conn);
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

	public function notifySurfaceChange ($surfaceRect) {
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
		
		if ($rect1->left <= $rect2->left) {
			$leftMost = $rect1;
			$rightMost = $rect2;
		} else {
			$leftMost = $rect2;
			$rightMost = $rect1;
		}

		if ($rect1->top <= $rect2->top) {
			$upperMost = $rect1;
			$lowerMost = $rect2;
		} else {
			$upperMost = $rect2;
			$lowerMost = $rect1;
		}
		return ($rightMost->left <= $leftMost->right) && ($lowerMost->top <= $upperMost->bottom);
	}

	public function subscribeToObjects ($left, $top, $right, $bottom, $conn) {
		echo "Se ha subscripto un cliente para recibir cambios en objetos.\n";
		$this-> unsubscribeToObjects ($conn);
		$subscription = new Subscription ($left, $top, $right, $bottom, $conn);
		$this-> objectSubscriptors[] = $subscription;
		$this-> sendCurrentObjects ($subscription);
	}

	public function unsubscribeToObjects ($conn) {
		// FIXME: esto deberia estar sincronizado como seccion critica
		$num_subscriptors = count($this-> objectSubscriptors);
		for ($i = 0; $i<$num_subscriptors; $i++) {
			if ($conn = $this-> objectSubscriptors[$i]-> conn) {
				array_slice ($this-> objectSubscriptors, $i, 1);
			}
		}
	}

	private function sendCurrentObjects ($subscriptor) {
		foreach ($this-> objects as $object) {
			if (WorldServer::objectInsideBounds ($object, $subscriptor)) {
				$json = json_encode ($object);
				$subscriptor-> conn-> send ($json);
			}
		}
	}

	public static function objectInsideBounds ($object, $rect) {
		return true;
		//FIXME 
	}

	public function createObject ($msg, $conn) {
		$object = new WorldObject($msg, $conn);
		
		$this-> objects-> attach ($object);
		if ($this-> objectsByOwner-> offsetExists ($conn)) {
			$ownedObjects = $this-> objectsByOwner-> offsetGet ($conn);
			$ownedObjects-> attach ($object);
		} else {
			$ownedObjects = new SplObjectStorage();
			$ownedObjects-> attach ($object);
			$this-> objectsByOwner-> attach ($conn, $ownedObjects);
		}
		$this-> notifyObjectCreation ($object);

		echo "Objeto creado.\n";
		echo " Cantidad de objetos: ".count ($this->objects)."\n";
		echo " Cantidad de conexiones con objetos: ".count ($this->objectsByOwner)."\n";
	}

	private function notifyObjectCreation ($object) {
		$json = json_encode ($object);

		foreach ($this-> objectSubscriptors as $subscriptor) {
			if (WorldServer::objectInsideBounds ($object, $subscriptor)) {
				$subscriptor-> send ($json);
			}
		}
	}

	public function removeObject ($object, $conn) {
		$this-> objects-> offsetUnset ($object);
		$ownedObjects = $this-> objectsByOwner-> getOffset ($conn);
		$ownedObjects-> removeOffset ($object);
		$this-> notifyObjectDestruction ($object);
	}

	public function removeObjectsByOwner ($conn) {
		$ownedObjects = $this-> objectsByOwner-> offsetGet ($conn);
		foreach ($ownedObjects as $object) {
			$this-> objects-> offsetUnset ($object);
			$this-> notifyObjectDestruction ($object);
		}
		$this-> objectsByOwner-> offsetUnset ($conn);
	}

	public function notifyObjectDestruction ($object) {
		$msg = new DestroyObjectMessage ($object);
		$json = json_encode ($msg);

		foreach ($this-> objectSubscriptors as $subscriptor) {
			if (WorldServer::objectInsideBounds ($object, $subscriptor)) {
				$subscriptor-> send ($json);
			}
		}
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
