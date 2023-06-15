<?php

header("Access-Control-Allow-Origin: *");
header('Content-type: text/json');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include '../classes/TaskPerson.php';

$data = json_decode(file_get_contents("php://input"), true);
echo $data;
$nId = $data["task_id"];

try
{
    $sQuery = "DELETE FROM task WHERE task_id=?";
    $oRecord = $oConnection->prepare($sQuery);
    $oRecord->execute([$nId]);
} catch (PDOException $pe) {
    die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data)

?>