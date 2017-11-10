<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$systeml = new systeml;
$systeml->ExecutaFind('comandos', 'agrega');

echo json_encode(array(
    "success" => true,
    "total" => null,
    "dados" => $systeml->Obter()
));
