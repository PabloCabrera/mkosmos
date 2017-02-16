<?php

class SurfaceSubscription {
	public $left;
	public $top;
	public $right;
	public $bottom;
	public $conn;

	public function __construct ($left, $top, $right, $bottom, $conn) {
		$this-> left = $left;
		$this-> right = $right;
		$this-> top = $top;
		$this-> bottom = $bottom;
		$this-> conn = $conn;
	}

	public function send ($msg) {
		$this-> conn-> send ($msg);
	}
}
