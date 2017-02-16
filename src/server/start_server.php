<?php
require_once 'vendor/autoload.php';
require_once 'Controller.php';
require_once 'WorldServer.php';
require_once 'WorldGenerator.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

const MAP_WIDTH = 128;
const MAP_HEIGHT = 128;
const MAP_FILENAME = "worldfile.json";

$controller = new Controller();
$worldServer = WorldGenerator::generateIslands (MAP_WIDTH, MAP_HEIGHT);
$worldServer-> save (MAP_FILENAME);
/*
if (file_exists (MAP_FILENAME)) {
	$worldServer = WorldServer::loadFile (MAP_FILENAME);
} else {
	$worldServer = new WorldServer (MAP_WIDTH, MAP_HEIGHT);
	$worldServer-> save (MAP_FILENAME);
}
*/
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
