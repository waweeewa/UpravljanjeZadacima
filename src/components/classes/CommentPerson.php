<?php

require_once "User.php";
require_once "Comment.php";
require_once "Task.php";

class CommentPerson {
    public $comment_id;
    public $commentary;
    public $comment_date;
    public $name;
    public $username;

    public function __construct($comment_id, $commentary, $comment_date, $name, $username) {
        $this->comment_id = $comment_id;
        $this->commentary = $commentary;
        $this->comment_date = $comment_date;
        $this->name = $name;
        $this->username = $username;
    }
}

?>