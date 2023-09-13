<?php
// Conéctate a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "secretFriend";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Ejecuta una consulta SQL para obtener los nombres de los usuarios con estado 'libre'
$sql = "SELECT name FROM users WHERE status = 'libre'";

$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row["name"];
    }
}

// Aquí, puedes implementar la lógica para elegir aleatoriamente un destinatario de la lista de usuarios "libres"
if (count($users) > 0) {
    $recipientIndex = array_rand($users); // Esto elige aleatoriamente un índice de usuario
    $recipientName = $users[$recipientIndex]; // Obtiene el nombre del destinatario

    // Actualizar el estado del remitente a "nolibre"
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    if (!empty($name)) {
        $sql = "UPDATE users SET status = 'nolibre' WHERE name = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $name);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'recipient' => $recipientName]);
        } else {
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Nombre no proporcionado']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Ningún destinatario disponible']);
}

// Cierra la conexión a la base de datos
$conn->close();
?>