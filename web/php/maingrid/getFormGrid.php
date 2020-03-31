<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
session_start();
if(!isset($_SESSION['user']) &&
!isset($_SESSION['pass'])) return;
$id = filter_input(INPUT_GET,'_id');
$systeml = new systeml;
$systeml->ExecutaFind('comandos', 'agrega', false, $id);
echo json_encode(array(
    "success" => true,
    "dados" => $systeml->Obter()
));