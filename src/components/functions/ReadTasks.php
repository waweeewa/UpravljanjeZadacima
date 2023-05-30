<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include '../essentials/connection.php';
include '../classes/TaskPerson.php';

$sQuery = "SELECT * FROM task INNER JOIN user ON task.user_id = user.user_id";
$oRecord = $oConnection->query($sQuery);
$oTasks = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $task_id = $oRow['task_id'];
    $user_id = $oRow['user_id'];
    $name = $oRow['name'];
    $description = $oRow['description'];
    $solved = $oRow['solved'];
    $deadline = $oRow['deadline'];
    $username = $oRow['username'];

    $oTask = new TaskPerson($task_id, $user_id, $name, $description, $solved, $deadline, $username);
    array_push($oTasks, $oTask);
}

echo json_encode($oTasks);