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
$systemc->ExeCriaLogin('login', $Dados);