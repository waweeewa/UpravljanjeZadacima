<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");


include '../essentials/connection.php';
include '../classes/User.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $_POST["username"];
$password = $_POST["password"];

$stmt = $oConnection->prepare("SELECT * FROM user WHERE username = :username");
$stmt->bindParam(":username", $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$hashedPassword = password_hash($user["password"], PASSWORD_DEFAULT);

if ($user && password_verify($password, $hashedPassword)) {
    $response = [
        "success" => true,
        "token" => generateToken(),
    ];
    echo json_encode($response);
} else {
    // Invalid credentials
    $response = [
        "username" => $username,
        "success" => false,
        "message" => "Invalid credentials",
    ];
    echo json_encode($response);
}

function generateToken() {
    $length = 32;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $token = '';

    for ($i = 0; $i < $length; $i++) {
        $randomIndex = random_int(0, strlen($characters) - 1);
        $token .= $characters[$randomIndex];
    }

    return $token;
}


?>