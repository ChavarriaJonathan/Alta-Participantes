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

// Verificar si es una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
$instituciones_id = isset($_POST['instituciones_id']) ? $_POST['instituciones_id'] : null;
$proyecto_id = isset($_POST['proyecto_id']) ? $_POST['proyecto_id'] : null;

if (!$nombre || !$instituciones_id || !$proyecto_id) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Verificar si ya existe esta persona sin CVU en este proyecto
    $stmt = $conn->prepare("SELECT id FROM personas_sin_cvu WHERE nombre = :nombre AND proyecto_id = :proyecto_id");
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['error' => 'Esta persona ya está registrada en este proyecto']);
        exit;
    }
    
    // Insertar la persona sin CVU
    $stmt = $conn->prepare("INSERT INTO personas_sin_cvu (nombre, proyecto_id, instituciones_id) 
                          VALUES (:nombre, :proyecto_id, :instituciones_id)");
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
    $stmt->bindParam(':instituciones_id', $instituciones_id, PDO::PARAM_INT);
    $stmt->execute();
    
    echo json_encode(['success' => true, 'message' => 'Persona sin CVU registrada con éxito']);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>