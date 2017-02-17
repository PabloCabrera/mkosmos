<?php

class WorldObject {
	public $entity = "object";
	public $id;
	public $resource_link;
	public $radius;
	public $x;
	public $y;
	public $speed_x;
	public $speed_y;
	public $state;
	private $owner;
	public $current_sprite;
	public $attribs;
	public $last_update;

	private static $object_last_id = 0;
	
	public function __construct($msg, $conn) {
		$this-> id = ++WorldObject::$object_last_id;
		$this-> request_id = $msg-> request_id;
		$this-> x = $msg-> x;
		$this-> y = $msg-> y;
		$this-> radius = $msg-> radius;
		$this-> speed_x = $msg-> speed_x;
		$this-> speed_y = $msg-> speed_y;
		$this-> owner = $conn;
		$this-> state = "creating";
	}

}
