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
    private $ValidExec;

    public function ExecutaFind($colecao, $query = null){
        $this->Colecao = $colecao;
        $this->ValidExec = (!is_null($query)) ? true : false;
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

    public function Obter(){
        foreach ($this->Leitura as $key => $valor){
            foreach ($valor->result as $key2 => $valor2){
                foreach ($valor2->data as $key3 => $valor3){
                    $data = new MongoDB\BSON\UTCDateTime($valor3);
                    $datatime = $data->toDateTime();
                    $valor2->data = $datatime->format('r');
                }
                foreach ($valor2->_id as $key4 => $valor4){
                    $valor2->_id = $valor4;
                }
                $valor2->comando = $valor2->comando->comando;
            }
            return $valor->result;
        }
    }

    private function TerSyntax(){
        if(!$this->ValidExec){
            $this->Sintaxe = parent::$Db.".".$this->Colecao;
            $this->Query = new MongoDB\Driver\Query([]);
        }else{
            $pipeline = [
                ['$unwind' => '$comando'],
                ['$match' => [
                    'comando.principal' =>  ['$in' => [true]]
                ],
                ]
            ];
            $this->Query = new \MongoDB\Driver\Command([
                'aggregate' => 'comandos',
                'pipeline' => $pipeline
            ]);
        }
    }

    public function TerConexao(){
        $this->Conexao = parent::fazercon();
    }

    private function Executar(){
        try{
            $this->TerConexao();
            if(!$this->ValidExec){
                $this->Leitura = $this->Conexao->executeQuery($this->Sintaxe, $this->Query);
            }else{
                $this->Leitura = $this->Conexao->executeCommand(parent::$Db, $this->Query);
            }
        }catch(MongoDB\Driver\Exception\Exception $e){
            var_dump($e);
        }
    }
}
