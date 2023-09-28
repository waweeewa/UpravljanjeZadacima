<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';
include '../classes/Person.php';

$id = $_GET['id'];

$sQuery = "SELECT * FROM user where user_id=?";
$oStatement = $oConnection->prepare($sQuery);
$oStatement->execute([$id]);
$oPeople = array();
while ($oRow = $oStatement->fetch(PDO::FETCH_BOTH)){
    $username = $oRow['username'];

    $oPerson = new Person($username);
    array_push($oPeople,$oPerson);
}

echo json_encode($oPeople);