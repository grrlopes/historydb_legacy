<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
class systeml extends conexao{
    private $Leitura;
    private $Conexao;
    private $Colecao;
    private $Query;
    private $Sintaxe;
    private $Resultado;

    public function ExecutaFind($colecao, $query = null){
        $this->Colecao = $colecao;
        $this->TerSyntax();
        $this->Executar();
    }

    public function ObterResultado(){
        $this->Resultado = array();
        foreach ($this->Leitura as $key => $valor){
            foreach ($valor->data as $key2 => $valor2){
                $data = new MongoDB\BSON\UTCDateTime($valor2);
                $datatime = $data->toDateTime();
                $valor->data = $datatime->format('r');
            }
            foreach ($valor->_id as $key3 => $valor3){
                $valor->_id = $valor3;
            }
            array_push($this->Resultado, $valor);
        }
        return $this->Resultado;
    }

    private function TerSyntax(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Query = new MongoDB\Driver\Query([]); 
    }

    public function TerConexao(){
        $this->Conexao = parent::fazercon();
    }

    private function Executar(){
        try{
            $this->TerConexao();
            $this->Leitura = $this->Conexao->executeQuery($this->Sintaxe, $this->Query);            
        }catch(MongoDB\Driver\Exception\Exception $e){
            var_dump($e);
        }
    }
}
