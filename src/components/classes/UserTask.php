<?php


class UserTask {
    public $user_id;
    public $username;

    public function __construct($user_id, $person_id, $username, $password) {
        $this->user_id = $user_id;
        $this->username = $username;
    }
}
?>