<?php


class CommentPerson {
    public $comment_id;
    public $commentary;
    public $comment_date;
    public $name;
    public $username;
    public $archived;

    public function __construct($comment_id, $commentary, $comment_date, $name, $username, $archived) {
        $this->comment_id = $comment_id;
        $this->commentary = $commentary;
        $this->comment_date = $comment_date;
        $this->name = $name;
        $this->username = $username;
        $this->archived = $archived;
    }
}

?>