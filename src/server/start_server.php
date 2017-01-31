<?php
require 'vendor/autoload.php';
require 'Controller.php';
require 'WorldServer.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

const MAP_WIDTH = 512;
const MAP_HEIGHT = 512;

$controller = new Controller();
$worldServer = new WorldServer (MAP_WIDTH, MAP_HEIGHT);
$controller-> setWorldServer ($worldServer);
$server = IoServer::factory(
	new HttpServer(
		new WsServer(
			$controller
		)
	),
	8000
);


$server->run();