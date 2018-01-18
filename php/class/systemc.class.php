<?php
/**
 * @autor  Gabriel Lopes
 * @email   gabrielrrlopes@gmail.com
 **/
class systemc extends conexao{
    private $Criacao;
    private $Conexao;
    private $Colecao;
    private $Dados;
    private $Qdados;
    private $Query;
    private $Sintaxe;
    private $Datas;
    private $Oid;

    public function ExeCriacao($colecao, array $query){
        $this->Colecao = $colecao;
        $this->Dados = $query;
        $this->TerSyntax();
        $this->Executar();
    }

    public function ExeCriaLogin($colecao, array $query){
        $this->Colecao = $colecao;
        $this->Dados = $query;
        $this->TerSyntaxLogin();
        $this->Executar();
    }

    public function ObterOid(){
        return (string)$this->Oid;
    }

    public function ObterData(){
        foreach ($this->Datas as $key => $data){
            if($key = 'data'){
                return $data;
            }
        }
    }

    private function TerConexao(){
        $this->Conexao = parent::fazercon();
    }

    private function TerSyntax(){
        $this->Oid = new MongoDB\BSON\ObjectId;
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Criacao = new MongoDB\Driver\BulkWrite;
        $this->Query = [
            '_id' => $this->Oid,
            'data' => $this->TerData(),
            'comando' => [
                [
                    'autor' => $this->Dados['autor'], 'comando' => $this->Dados['comando'],
                    'principal' => true, 'cdata' => $this->TerData()
                ]
            ],
            'funcao' => $this->Dados['funcao'],
            'sistema' => $this->Dados['sistema'],
            'autor' => $this->Dados['autor']
        ];
        $this->Criacao->insert($this->Query);
    }

    private function TerSyntaxLogin(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Criacao = new MongoDB\Driver\BulkWrite;
        $this->Query = [
            'usuario' => $this->Dados['usuario'],
            'senha' => $this->Dados['senha'],
            'criado' => $this->TerData()
        ];
        $this->Criacao->insert($this->Query);
    }

    private function TerData(){
        $datas = new DateTime();
        $datas->setTimezone(new DateTimeZone(parent::$Tzone));
        foreach ($datas as $key => $valor) {
            if($key == 'date'){
                $datas = new DateTime($valor);
                $this->Datas = $datas;
                $datas = $datas->getTimestamp();
                return new MongoDB\BSON\UTCDateTime($datas*1000);
            }
        }
    }

    private function Executar(){
        try{
            $this->TerConexao();
            $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
            $eu = $this->Conexao->executeBulkWrite($this->Sintaxe, $this->Criacao, $writeConcern);
        }catch(MongoDB\Driver\Exception\Exception $e){
            var_dump($e);
        }
    }
}