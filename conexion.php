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

// Ejecuta una consulta SQL para obtener los nombres
$sql = "SELECT name FROM users WHERE status = 'libre'";


$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row["name"];
    }
}

// Devuelve los nombres en formato JSON
echo json_encode($users);

// Cierra la conexión a la base de datos
$conn->close();
?>