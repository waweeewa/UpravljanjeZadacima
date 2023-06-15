<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include '../essentials/connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$sCommentId = $data['id'];

try {
  // Prepare and execute the delete query
  $sQuery = "DELETE FROM comment WHERE comment_id = ?";
  $oStatement = $oConnection->prepare($sQuery);
  $oStatement->execute([$sCommentId]);

  // Check if any row was affected
  $nRowCount = $oStatement->rowCount();
  if ($nRowCount > 0) {
    $response = [
      'status' => 'success',
      'message' => 'Comment deleted successfully',
    ];
  } else {
    $response = [
      'status' => 'error',
      'message' => 'Comment not found or already deleted',
    ];
  }
} catch (PDOException $e) {
  $response = [
    'status' => 'error',
    'message' => 'Error deleting comment: ' . $e->getMessage(),
  ];
}

echo json_encode($response);