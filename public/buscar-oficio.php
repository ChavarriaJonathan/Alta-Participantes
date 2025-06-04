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

$query = isset($_GET['query']) ? $_GET['query'] : '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "";
    if (empty($query)) {
        // Si no hay query, retorna todos los oficios (limitado a 50)
        $sql = "SELECT oficio_id, no_oficio, proyecto_id FROM oficios LIMIT 50";
        $stmt = $conn->prepare($sql);
    } else {
        // Si hay query, busca por número de oficio
        $sql = "SELECT oficio_id, no_oficio, proyecto_id FROM oficios 
               WHERE no_oficio LIKE :query LIMIT 50";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':query', '%' . $query . '%', PDO::PARAM_STR);
    }
    
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($result);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>