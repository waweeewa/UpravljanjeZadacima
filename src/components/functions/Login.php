<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';
include '../classes/User.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data["username"];
$password = hash("sha256",$data["password"]);
$stmt = $oConnection->prepare("SELECT * FROM user WHERE username = :username");
$stmt->bindParam(":username", $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $password==$user['password']) {
    $response = [
        "success" => true,
        "username" => $username,
        "user_id" => $user['user_id'],
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