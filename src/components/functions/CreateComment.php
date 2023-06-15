<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';

$task_id = $_GET['task_id'];
$user_id = $_GET['user_id'];
$commentary = $_GET['commentary'];
$comment_date = $_GET['comment_date'];

$stmt = $oConnection->prepare("INSERT INTO comment (task_id, user_id, commentary, comment_date) VALUES (:task_id, :user_id, :commentary, :comment_date)");

$params = array(
    ':task_id' => $task_id,
    ':user_id' => $user_id,
    ':commentary' => $commentary,
    ':comment_date' => $comment_date
);
echo $params;
$response = array();

if ($stmt->execute($params)) {
    $response['status'] = 'success';
    $response['message'] = 'Comment inserted successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to insert comment';
}

echo json_encode($response);
?>