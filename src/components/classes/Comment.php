<?php

require_once  "User.php";
require_once  "Task.php";

class Comment{
    public $comment_id = "";
    public $task_id;
    public $user_id;
    public $description = "";
    public $comment_date = "";

    public function __construct($comment_id,$task_id,$user_id,$description,$comment_date){
        $this->comment_id = $comment_id;
        $this->task_id = $task_id;
        $this->user_id = $user_id;
        $this->description = $description;
        $this->comment_date = $comment_date;
    }
}

?>