<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';

// Retrieve the data from the request body
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$username = $data['username'];
$password = hash("sha256",$data["password"]);

$response = array();

// Check if the user already exists
$stmt = $oConnection->prepare("SELECT COUNT(*) FROM user WHERE username = :username");
$stmt->bindParam(':username', $username);
$stmt->execute();

if ($stmt->fetchColumn() > 0) {
    $response['status'] = 'error';
    $response['message'] = 'User already exists';
} else {
    // Insert the new user
    $stmt = $oConnection->prepare("INSERT INTO user (username, password) VALUES (:username, :password)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'User inserted successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Failed to insert user';
    }
}

echo json_encode($response);
?>