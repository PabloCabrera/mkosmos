<?php

class WorldObject {
	public $entity = "object";
	public $id;
	public $archetype_url;
	public $radius;
	public $x;
	public $y;
	public $speed_x;
	public $speed_y;
	public $state;
	private $owner;
	public $current_sprite;
	public $attribs;

	private static $object_last_id = 0;
	
	public function __construct($msg, $conn) {
		$this-> id = ++WorldObject::$object_last_id;
		$this-> request_id = $msg-> request_id;
		$this-> x = $msg-> x;
		$this-> y = $msg-> y;
		$this-> radius = $msg-> radius;
		$this-> speed_x = $msg-> speed_x;
		$this-> speed_y = $msg-> speed_y;
		if (isset ($msg-> archetype_url)) {
			$this-> archetype_url = $msg-> archetype_url;
		}
		$this-> owner = $conn;
		$this-> state = "creating";
	}

	public function getOwner () {
		return $this-> owner;
	}
}
