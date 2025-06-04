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

// Configuración de la base de datos
$host = "localhost";
$dbname = "alta-participantes";
$username = "root"; // Cambiar por tu usuario
$password = ""; // Cambiar por tu contraseña

$query = isset($_GET['query']) ? $_GET['query'] : '';
$searchBy = isset($_GET['searchBy']) ? $_GET['searchBy'] : 'clave_proyecto';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "";
    if (empty($query)) {
        // Si no hay query, retorna todos los proyectos (limitado a 50)
        $sql = "SELECT proyecto_id, clave_proyecto, titulo FROM proyectos LIMIT 50";
        $stmt = $conn->prepare($sql);
    } else {
        // Si hay query, busca según el criterio seleccionado
        if ($searchBy === 'clave_proyecto') {
            $sql = "SELECT proyecto_id, clave_proyecto, titulo FROM proyectos 
                   WHERE clave_proyecto LIKE :query LIMIT 50";
        } else {
            $sql = "SELECT proyecto_id, clave_proyecto, titulo FROM proyectos 
                   WHERE titulo LIKE :query LIMIT 50";
        }
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