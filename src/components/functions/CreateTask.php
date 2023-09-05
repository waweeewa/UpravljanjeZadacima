<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';

$user_id = $_GET['user_id'];
$name = $_GET['name'];
$description = $_GET['description'];
$solved = "Not Started";
$deadline = $_GET['deadline'];
$importance = $_GET['importance'];

$stmt = $oConnection->prepare("INSERT INTO task (user_id, name, description, solved, deadline, importance) VALUES (:user_id, :name, :description, :solved, :deadline, :importance)");

$params = array(
    ':user_id' => $user_id,
    ':name' => $name,
    ':description' => $description,
    ':solved' => $solved,
    ':deadline' => $deadline,
    ':importance' => $importance
);
echo $params;
$response = array();

if ($stmt->execute($params)) {
    $response['status'] = 'success';
    $response['message'] = $user_id . $name . $description . $solved . $deadline;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to insert comment';
}

echo json_encode($response);
?>