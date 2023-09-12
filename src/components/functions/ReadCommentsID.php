<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");


include '../essentials/connection.php';
include '../classes/CommentPerson.php';

$sTask_Id = $_GET['id'];

$sQuery = "SELECT * FROM comment JOIN user ON comment.user_id = user.user_id JOIN task ON comment.task_id = task.task_id WHERE comment.user_id = ?";
$oRecord = $oConnection->prepare($sQuery);
$oRecord->execute([$sTask_Id]);
$oPeople = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) {
    $comment_id = $oRow['comment_id'];
    $commentary = $oRow['commentary'];
    $comment_date = $oRow['comment_date'];
    $name = $oRow['name'];
    $username = $oRow['username'];

    $oPerson = new CommentPerson($comment_id, $commentary, $comment_date, $name, $username);
    array_push($oPeople, $oPerson);
}

echo json_encode($oPeople);