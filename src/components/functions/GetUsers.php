<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include '../essentials/connection.php';
include '../classes/UserTask.php';

$sQuery = "SELECT * FROM user";
$oStatement = $oConnection->prepare($sQuery);
$oStatement->execute();

$oTasks = array();
while ($oRow = $oStatement->fetch(PDO::FETCH_ASSOC)) {
    $user_id = $oRow['user_id'];
    $username = $oRow['username'];

    $oTask = new UserTask($user_id, $username);
    $oTasks[] = $oTask;
}

echo json_encode($oTasks);
?>