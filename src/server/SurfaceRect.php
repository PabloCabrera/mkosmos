<?php
class SurfaceRect {
	public $entity = "surface";
	public $left;
	public $top;
	public $right;
	public $bottom;
	public $data;

	public function __construct ($left, $top, $right, $bottom, $data) {
		$this-> left = $left;
		$this-> top = $top;
		$this-> right = $right;
		$this-> bottom = $bottom;
		$this-> data = $data;
	}
}
