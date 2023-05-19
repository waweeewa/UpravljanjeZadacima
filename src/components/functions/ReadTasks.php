<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'Task.php';

$sQuery = "SELECT * FROM task";
$oRecord = $oConnection->query($sQuery);
$oTasks = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $task_id = $oRow['task_id'];
    $user_id = $oRow['user_id'];
    $name = $oRow['name'];
    $description = $oRow['description'];
    $solved = $oRow['solved'];
    $deadline = $oRow['deadline'];

    $oTask = new Task($task_id, $user_id, $name, $description, $solved, $deadline);
    array_push($oTasks, $oTask);
}

echo json_encode($oTasks);