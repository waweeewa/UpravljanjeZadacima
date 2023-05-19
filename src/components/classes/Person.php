<?php

class Person{
    public $person_id = "";
    public $firstname = "";
    public $lastname = "";

    public function __construct($person_id,$firstname,$lastname)
    {
        $this->person_id = $person_id;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
    }
}

?>