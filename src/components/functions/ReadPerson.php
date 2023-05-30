<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';
include '../classes/Person.php';

$id = $_GET['person_id'];

$sQuery = "SELECT * FROM person WHERE id=" . $id;
$oRecord = $oConnection->query($sQuery);
$oPeople = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $person_id = $oRow['person_id'];
    $firstname = $oRow['firstname'];
    $lastname = $oRow['lastname'];

    $oPerson = new Person($person_id,$firstname,$lastname);
    array_push($oPeople,$oPerson);
}

echo json_encode($oPeople);