<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once '../config.inc.php';
session_start();
if(!isset($_SESSION['user']) &&
!isset($_SESSION['pass'])) return;
$systemu = new systemu;
use SebastianBergmann\Diff\Differ;
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
$autor = $_SESSION['user'];
$comando = $data->comando;
$Dados = [
    '_id' => "$_id", 'autor' => "$autor", 'funcao' => $funcao,
    'comando' => "$comando", 'principal' => true,
    'cdata' => new MongoDB\BSON\UTCDateTime
];
$systemu->ExeUpdate('comandos', $Dados);