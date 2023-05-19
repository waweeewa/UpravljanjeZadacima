<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include '../essentials/connection.php';
include '../classes/Person.php';

$sQuery = "SELECT * FROM person";
$oRecord = $oConnection->query($sQuery);
$oPeople = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $person_id = $oRow['person_id'];
    $firstname = $oRow['firstname'];
    $lastname = $oRow['lastname'];

    $oPerson = new Person ($person_id, $firstname, $lastname);
    array_push($oPeople, $oPerson);
}

echo json_encode($oPeople);