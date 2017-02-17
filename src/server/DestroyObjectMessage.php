<?php

class DestroyObjectMessage {
	public $entity = "object";
	public $action = "destroy";
	public $id;

	public function __construct ($object) {
		$this-> id = $object-> id;
	}
}
