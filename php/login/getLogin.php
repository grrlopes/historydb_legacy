<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$user = filter_input(INPUT_POST,'user');
$pass = filter_input(INPUT_POST,'pass');
#$user = 'gabriel.lopes';
#$pass = '123mudarr';
$systeml = new systeml;
$systeml->ExecLogin('login', $user, $pass);
$auth = $systeml->ObterAuth();
echo json_encode(array(
    'success' => $auth['sucesso'],
    'msg' => $auth['level']
));