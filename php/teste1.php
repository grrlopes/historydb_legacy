<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
require_once 'config.inc.php';
echo "<pre>";
$systeml = new systeml;

$systeml->ExecutaFind('comandos');

foreach ($systeml->ObterResultado() as $key => $valor) {
    foreach ($valor->data as $key2 => $valor2) {
        #$data = new MongoDB\BSON\UTCDateTime($valor2);
        #$datatime = $data->toDateTime();
        #$valor->data = $datatime->format('r');
    }
     #echo $valor;
}

/*
$utcdatetime = new MongoDB\BSON\UTCDateTime(1416445411987);
$datetime = $utcdatetime->toDateTime();
var_dump($datetime->format('r'));
var_dump($datetime->format('U.u'));
var_dump($datetime->getTimezone());
*/