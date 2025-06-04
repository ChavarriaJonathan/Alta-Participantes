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

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    echo json_encode(['error' => 'ID de proyecto no proporcionado']);
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "SELECT p.titulo, c.nombre_convocatoria AS convocatoria
            FROM proyectos p
            LEFT JOIN convocatoria c ON p.convocatoria_id = c.convocatoria_id
            WHERE p.proyecto_id = :id";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'Proyecto no encontrado']);
    }
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>