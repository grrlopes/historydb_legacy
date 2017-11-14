<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
$systemc = new systemc;
$dados = filter_input(INPUT_POST,'dados');
function replace_unicode_escape_sequence($match){
    return mb_convert_encoding(pack(
    'H*', $match[1]), 'UTF-8', 'UCS-2BE');
}
function unicode_decode($str){
    return preg_replace_callback('/\\\\u([0-9a-f]{4})/i',
    'replace_unicode_escape_sequence', $str);
}
$data = json_decode(unicode_decode($dados));
$_id = $data->_id;
$funcao = $data->funcao;
$sistema = $data->sistema;
$autor = $data->autor;
$comando = $data->comando;
$Dados = [
    '_id' => "$_id", 'funcao' => "$funcao",
    'sistema' => "$funcao", 'autor' => "$autor",
    'comando' => "$comando", 'principal' => true
];
$systemc->ExeCriacao('comandos', $Dados);
