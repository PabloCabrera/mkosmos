<?php

require "SurfaceRect.php";

class WorldServer {
	private $map;
	private $width;
	private $height;

	public function __construct ($width, $height) {
		$this-> width = $width;
		$this-> height = $height;
		$this-> map = str_repeat (chr(0), $width*$height);
	}

	public function getMap () {
		return $this-> getSurfaceRect (0, 0, $this-> width -1, $this-> height -1);
	}

	public function getSurfaceAt ($x, $y) {
		return $this-> map [$x* $this-> width + $y];
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
	}

	public function setSurfaceCircle ($x, $y, $radius, $surface) {
		for ($xt = $x-$radius; $xt <= $x+$radius; $xt++) {
			$hip2 = pow($radius, 2);
			$b2 = pow (($x-$xt), 2);
			$yLimit = round (sqrt ($hip2 - $b2));
			for ($yt = $y-$yLimit; $yt <= $yLimit; $yt++) {
				$this-> map [$xt* $this-> width + $yt] = $surface;
			}
		}
	}
}
