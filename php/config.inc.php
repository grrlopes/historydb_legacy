<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
define("HOST", "mongodb://localhost");
define("BANCO", "histo");
define("PORTA", "27017");
define("USER", "");
define("SENHA", "");
define("TZONE", "America/Sao_Paulo");

function __autoload($Class){
    $dir = ['class'];
    $idir = null;
    foreach($dir as $dirnome){
        if(!$idir && file_exists(__DIR__ . "//{$dirnome}//{$Class}.class.php")){
          include_once __DIR__ . "//{$dirnome}//{$Class}.class.php";
        }
        if(!$idir && file_exists(__DIR__ . "//{$dirnome}//{$Class}.php")){
            include_once __DIR__ . "//{$dirnome}//{$Class}.php";
        }
        $idir = TRUE;
    }
    include_once __DIR__ . "//vendor//autoload.php";
}
