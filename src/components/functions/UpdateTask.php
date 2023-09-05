<?php
header('Content-type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';

$task_id = $_GET['taskid'];
$solved = $_GET['solved'];

$stmt = $oConnection->prepare("UPDATE task SET solved = :solved WHERE task_id = :task_id");

$params = array(
    ':task_id' => $task_id,
    ':solved' => $solved,
);
echo '<pre>' . print_r($params, true) . '</pre>';
$response = array();

if ($stmt->execute($params)) {
    $response['status'] = 'success';
    $response['message'] = 'Task updated successfully';
    $response['solved'] = $solved;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update task';
}

echo json_encode($response);
?>