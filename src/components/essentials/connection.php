<?php

$host = 'database';
$odbname = 'task_management';
$username = 'root';
$password = 'tiger';

try
{
    $oConnection = new PDO("mysql:host=$host;dbname=$odbname",$username,$password);
} catch (PDOException $pe) {
    die('Povezivanje s bazom podataka nije uspjelo');
}

?>