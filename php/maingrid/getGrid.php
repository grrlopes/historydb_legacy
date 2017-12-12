<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$funcao = filter_input(INPUT_GET,'funcao');
$sistema = filter_input(INPUT_GET,'sistema');
$autor = filter_input(INPUT_GET,'autor');
$comando = filter_input(INPUT_GET,'comando');
$search = filter_input(INPUT_GET,'search');
$page = filter_input(INPUT_GET,'page');
$start = filter_input(INPUT_GET,'start');
$limit = filter_input(INPUT_GET,'limit');
$systeml = new systeml;
$systeml->ExecPagingQtd('comandos');
$systeml->SetPaging($start, $limit);
$total = $systeml->ObterTotal();
if(empty($search) && $page <= 1){
    $systeml->ExecutaFind('comandos', 'agrega');
    $valor = $systeml->Obter();
    echo json_encode(array(
        "success" => true,
        "total" => $total,
        "dados" => $valor
    ));
}else if(empty($search) && $page > 1){
    $systeml->ExecPaging('comandos');
    $valor = $systeml->Obter();
    echo json_encode(array(
        "success" => true,
        "total" => $total,
        "dados" => $valor
    ));
}else if(isset($search) && $page <= 1){
    $checkbox = [$funcao, $sistema, $comando, $autor];
    $systeml->ExecSearchQtd('comandos', $search, $checkbox);
    $totalsearch = $systeml->ObterTotal();
    $systeml->ExecSearch('comandos', $search, $checkbox);
    $valor = $systeml->Obter();
    echo json_encode(array(
        "success" => true,
        "total" => $totalsearch,
        "dados" => $valor
    ));
}else if(isset($search) && $page > 1){
    $checkbox = [$funcao, $sistema, $comando, $autor];
    $systeml->ExecSearchQtd('comandos', $search, $checkbox);
    $totalsearch = $systeml->ObterTotal();
    $systeml->ExecSearchPaging('comandos', $search, $checkbox);
    $valor = $systeml->Obter();
    echo json_encode(array(
        "success" => true,
        "total" => $totalsearch,
        "dados" => $valor
    ));
}