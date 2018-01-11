<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
class systemu extends conexao{
    private $Conexao;
    private $Colecao;
    private $Dados;
    private $Query;
    private $Sintaxe;
    private $Id;

    public function ExeUpdate($colecao, array $query){
        $this->Colecao = $colecao;
        $this->Dados = $query;
        $this->TerSyntax();
        $this->Executar();
    }

    private function TerConexao(){
        $this->Conexao = parent::fazercon();
    }

    private function TerSyntax(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Query = new MongoDB\Driver\BulkWrite();
        foreach ($this->Dados as $key => $valor){
            if($key == '_id'){
                 $this->Id = $this->Dados[$key];
                unset($this->Dados[$key]);
            }
        }
        $this->ExtTerSyntax();
        $this->Query->update(
            ['_id' => new MongoDB\BSON\ObjectId($this->Id)],
            ['$push' => ['comando' => $this->Dados]]
        );
    }

    private function ExtTerSyntax(){
        $this->Query->update(
            ['_id' => new MongoDB\BSON\ObjectId($this->Id),
            'comando' => ['$elemMatch' => ["principal" => ['$eq' => true]]]
            ],
            ['$set' => ['comando.$.principal' => false, 'funcao' => $this->Dados['funcao']]]
        );
        unset($this->Dados['funcao']);
    }

    private function Executar(){
        try{
            $this->TerConexao();
            $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
            $this->Conexao->executeBulkWrite($this->Sintaxe, $this->Query, $writeConcern);
        }catch(MongoDB\Driver\Exception\Exception $e){
            var_dump($e);
        }
    }
}