<?php

class ObjectControl {
	public $entity = "object";
	public $action = "grant control";
	public $object_id;
	public $request_id;

	public function __construct ($object_id, $request_id) {
		$this-> object_id = $object_id;
		$this-> request_id = $request_id;
	}
}


