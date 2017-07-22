<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
 abstract class conexao {
    private static $Host = HOST;
    private static $User = USER;
    private static $Pass = SENHA;
    protected static $Db = BANCO;
    private static $Porta = PORTA;
    private static $Conexao = null;

    public static function fazercon(){
        return self::MongoConectar();
    }      

    private static function MongoConectar(){
        try {
            if(self::$Conexao == null){
                self::$Conexao = new MongoDB\Driver\Manager(self::$Host.":".self::$Porta);
            }
        } catch (MongoDB\Driver\Exception\Exception $e){
            $arquivo = basename(__FILE__);
            echo "Falha na conexão com Mongodb: ".$arquivo,"\n";
            echo "Exception:", $e->getMessage(),"\n";
            echo "No arquivo:", $e->getFile(),"\n";
            echo "Na linha:", $e->getLine(),"\n";       
        }
        return self::$Conexao; 
    }
 }