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

$cvu = isset($_POST['cvu']) ? $_POST['cvu'] : null;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
$proyecto_id = isset($_POST['proyecto_id']) ? $_POST['proyecto_id'] : null;

if (!$cvu || !$nombre || !$proyecto_id) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Iniciar transacción
    $conn->beginTransaction();
    
    // Verificar si la persona ya existe
    $stmt = $conn->prepare("SELECT cvu FROM personas WHERE cvu = :cvu");
    $stmt->bindParam(':cvu', $cvu, PDO::PARAM_STR);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        // Si no existe, insertar en la tabla personas
        $insertPersona = $conn->prepare("INSERT INTO personas (cvu, nombre) VALUES (:cvu, :nombre)");
        $insertPersona->bindParam(':cvu', $cvu, PDO::PARAM_STR);
        $insertPersona->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $insertPersona->execute();
    }
    
    // Verificar si ya existe la relación persona-proyecto
    $stmt = $conn->prepare("SELECT cvu FROM personas_proyectos WHERE cvu = :cvu AND proyecto_id = :proyecto_id");
    $stmt->bindParam(':cvu', $cvu, PDO::PARAM_STR);
    $stmt->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        // Si no existe, insertar la relación
        $insertRelacion = $conn->prepare("INSERT INTO personas_proyectos (cvu, proyecto_id, rol) VALUES (:cvu, :proyecto_id, 'participantes')");
        $insertRelacion->bindParam(':cvu', $cvu, PDO::PARAM_STR);
        $insertRelacion->bindParam(':proyecto_id', $proyecto_id, PDO::PARAM_INT);
        $insertRelacion->execute();
    } else {
        // Si ya existe, lanzar un error
        throw new Exception('Este participante ya está registrado en el proyecto');
    }
    
    // Confirmar transacción
    $conn->commit();
    
    echo json_encode(['success' => true, 'message' => 'Participante registrado con éxito']);
} catch(Exception $e) {
    // Revertir cambios en caso de error
    if ($conn) {
        $conn->rollBack();
    }
    echo json_encode(['error' => $e->getMessage()]);
}
?>