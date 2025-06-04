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

$proyecto_id = isset($_GET['proyecto_id']) ? $_GET['proyecto_id'] : null;

if (!$proyecto_id) {
    echo json_encode(['error' => 'ID de proyecto no proporcionado']);
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener participantes con CVU
    $sql1 = "SELECT p.cvu, p.nombre
             FROM personas_proyectos pp
             JOIN personas p ON pp.cvu = p.cvu
             WHERE pp.proyecto_id = :proyecto_id";
    
    $stmt1 = $conn->prepare($sql1);
    $stmt1->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
    $stmt1->execute();
    $participantesConCVU = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    
    // Obtener participantes sin CVU
    $sql2 = "SELECT id, nombre, NULL as cvu
             FROM personas_sin_cvu
             WHERE proyecto_id = :proyecto_id";
    
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
    $stmt2->execute();
    $participantesSinCVU = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    // Combinar resultados
    $result = array_merge($participantesConCVU, $participantesSinCVU);
    
    echo json_encode($result);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>