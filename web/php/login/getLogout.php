<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
session_start();
if(isset($_SESSION['user']) && isset($_SESSION['pass'])){
    unset($_SESSION['user']); unset($_SESSION['pass']);
    sleep(1); echo json_encode(array(
        "success" => true
    ));
}