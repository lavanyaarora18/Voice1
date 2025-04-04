<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'voice';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : '';

$sql = "SELECT id, filename, tags FROM images WHERE tags LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%$keyword%";
$stmt->bind_param("s", $searchTerm);
$stmt->execute();

$images = array();
$stmt->bind_result($id, $filename, $tags);
while ($stmt->fetch()) {
    $images[] = array(
        'id' => $id,
        'filename' => $filename,
        'tags' => $tags
    );
}

header('Content-Type: application/json');
echo json_encode($images);
?>
