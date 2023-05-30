<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("COntent-Type:application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';
include '../classes/Task.php';

$data = json_decode(file_get_contents("php://input"), true);
echo $data;
$sUser_Id = $data['user_id'];
$sName = $data['name'];
$sDescription = $data['description'];
$sSolved = false;
$sDeadline = false;   //KASNIJE

try
{
    $sQuery = "INSERT INTO task (user_id, name, description, solved, deadline)
    VALUES (?, ?, ?, ?, ?)";
    $oRecord = $oConnection->prepare($sQuery);
    $oRecord->execute([$sUser_Id, $sName, $sDescription, $sSolved, $sDeadline]);
} catch(PDOException $pe) {
    die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}

echo json_encode($data);