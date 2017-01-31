<?php

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

/* Esta clase tiene la funcion de recibir los mensajes enviados por los clientes y hacer las llamadas correspondientes en los objetos */
class Controller implements MessageComponentInterface {
	private $messageHandlers;
	private $worldServer;

	public function __construct () {
	
		$this-> messageHandlers = [
			"surface" => [
				"get" => "onMsgSurfaceGet",
				"set" => "onMsgSurfaceSet"
			]
		];
	}

	private function onMsgSurfaceGet ($conn, $msg) {
		if (isset ($msg->x)) {
			$send = $this-> worldServer-> getSurfaceAt($msg->x, $msg->y);
		} elseif (isset ($msg-> left)) {
			$send = $this-> worldServer-> getSurfaceRect($msg->left, $msg->top, $msg->right, $msg->bottom);
		} else {
			$send = $this-> worldServer-> getMap();
		}
		$this-> sendMessage ($conn, $send);
	}

	private function sendMessage ($conn, $msg) {
		echo "Se ha enviado un mensaje al usuario\n";
		$conn-> send (json_encode($msg));
	}

	private function onMsgSurfaceSet ($conn, $msg) {
	}

	public function onOpen (ConnectionInterface $conn) {
		echo "Se ha conectado un usuario\n";
	}

	public function onMessage (ConnectionInterface $conn, $msgText) {
		echo "Se ha recibido un mensaje\n";
		$msg = json_decode ($msgText);
		echo "\t Entidad: {$msg->entity}\n";
		echo "\t Action: {$msg->action}\n";
		if (isset ($this-> messageHandlers[$msg->entity][$msg->action])) {
			$methodName = $this-> messageHandlers[$msg->entity][$msg->action];
			$this-> $methodName ($conn, $msg);
		} else {
			echo "No se ha encontrado un handler para procesar el mensaje recibido\n";
		}
		
	}

	public function onClose (ConnectionInterface $conn) {
		echo "Se ha desconectado un usuario\n";
	}

	public function onError(ConnectionInterface $conn, \Exception $e) {
		echo "Ha ocurrido un error: {$e->getMessage()}\n";
		$conn->close();
	}

	public function setWorldServer ($worldServer) {
		$this-> worldServer = $worldServer;
	}
}
