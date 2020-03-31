<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
session_start();
$user = filter_input(INPUT_POST,'user');
$pass = filter_input(INPUT_POST,'pass');
$systeml = new systeml;
$systeml->ExecLogin('login', $user, $pass);
if(!isset($_SESSION['user']) && !isset($_SESSION['pass'])){
    $auth = $systeml->ObterAuth();
    if($auth['sucesso']){
        $_SESSION['user'] = $user;
        $_SESSION['pass'] = $pass;
    }
    echo json_encode(array(
        'success' => $auth['sucesso'],
        'msg' => $auth['level']
    ));
}else{
    $auth = $systeml->ObterAuth();
    if($auth['sucesso']){
        $_SESSION['user'] = $user;
        $_SESSION['pass'] = $pass;
    }
    echo json_encode(array(
        'success' => $auth['sucesso'],
        'msg' => $auth['level']
    ));
}