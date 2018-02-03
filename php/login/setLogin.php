<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$systemc = new systemc;
$usuario = filter_input(INPUT_POST, 'usuario');
$senha = filter_input(INPUT_POST, 'senha');
$Dados = [
    'usuario' => "$usuario",
    'senha' => "$senha"
];
$systemc->ExecValid('login', $usuario);
if(!$systemc->obterValid()['existe']){
    $systemc->ExeCriaLogin('login', $Dados);
    echo json_encode(array(
        "success" => true,
        "msg" => 'noexiste',
    ));
}else{
    echo json_encode(array(
        "success" => false,
        "msg" => 'existe',
    ));
}