<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Si es una solicitud OPTIONS (preflight), respondemos con los encabezados CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');
require_once 'config.php';

$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "SELECT cvu, nombre FROM personas WHERE nombre LIKE :nombre LIMIT 20";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':nombre', '%' . $nombre . '%', PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($result);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>