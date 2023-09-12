<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include '../essentials/connection.php';
include '../classes/TaskPerson.php';

$userid = $_GET['id'];

$sQuery = "SELECT * FROM task INNER JOIN user ON task.user_id = user.user_id where task.user_id = ?";
$oRecord = $oConnection->prepare($sQuery);
$oRecord->execute([$userid]);
$oTasks = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $task_id = $oRow['task_id'];
    $user_id = $oRow['user_id'];
    $name = $oRow['name'];
    $description = $oRow['description'];
    $solved = $oRow['solved'];
    $deadline = $oRow['deadline'];
    $username = $oRow['username'];
    $importance = $oRow['importance'];

    $oTask = new TaskPerson($task_id, $user_id, $name, $description, $solved, $deadline, $username, $importance);
    array_push($oTasks, $oTask);
}

echo json_encode($oTasks);