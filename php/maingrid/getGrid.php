<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$dados = filter_input(INPUT_GET,'dados');
$systeml = new systeml;
$systeml->ExecutaFind('comandos', 'agrega');
echo json_encode(array(
    "success" => true,
    "total" => null,
    "dados" => $systeml->Obter()
));