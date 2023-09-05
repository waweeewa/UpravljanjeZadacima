<?php


class Person {
    public $username;
    public $firstname;
    public $lastname;
    public $avgperf;
    public $totcomp;
    public $lowcomp;
    public $medcomp;
    public $highcomp;

    public function __construct($username, $firstname, $lastname, $avgperf, $totcomp, $lowcomp, $medcomp, $highcomp) {
        $this->username = $username;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->avgperf = $avgperf;
        $this->totcomp = $totcomp;
        $this->lowcomp = $lowcomp;
        $this->medcomp = $medcomp;
        $this->highcomp = $highcomp;
    }
}

?>