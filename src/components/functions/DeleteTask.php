<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include '../essentials/connection.php';
include '../classes/TaskPerson.php';


if(isset($_GET['task_id'])) {
    $taskId = $_GET['task_id'];
    
    // Delete the task
    $query = "UPDATE task SET archived = 1 WHERE task_id = $taskId";
    $result = $oConnection->query($query);

    $query = "UPDATE comment SET archived = 1 WHERE task_id = $taskId";
    $result = $oConnection->query($query);

    if ($result) {
        // Deletion successful
        $response = array(
            'success' => true,
            'message' => 'Task and associated comments deleted successfully',
            'aaa' => $taskId
        );
    } else {
        // Deletion failed
        $response = array(
            'success' => false,
            'message' => 'Failed to delete task and associated comments',
            'aaa' => $taskId
        );
    }
} else {
    // Task ID not provided
    $response = array(
        'success' => false,
        'message' => 'Task ID not provided',
        'aaa' => $taskId
    );
}

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>