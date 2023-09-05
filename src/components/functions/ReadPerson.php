<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';
include '../classes/Person.php';

$id = $_GET['user_id'];

$sQuery = "SELECT * FROM person JOIN user on person.user_id = user.user_id WHERE person.user_id=" . $id;
$oRecord = $oConnection->query($sQuery);
$oPeople = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $username = $oRow['username'];
    $firstname = $oRow['firstname'];
    $lastname = $oRow['lastname'];
    $avgperf = $oRow['avgperf'];
    $totcomp = $oRow['totcomp'];
    $lowcomp = $oRow['lowcomp'];
    $medcomp = $oRow['medcomp'];
    $highcomp = $oRow['highcomp'];  

    $oPerson = new Person($username, $firstname, $lastname, $avgperf, $totcomp, $lowcomp, $medcomp, $highcomp);
    array_push($oPeople,$oPerson);
}

echo json_encode($oPeople);