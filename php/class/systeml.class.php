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
    private $User;
    private $Pwd;
    private $Id;
    private $Start;
    private $Limit;
    private $Total;
    private $Search;
    private $SearchCheck;
    private $Sintaxe;
    private $Resultado;
    private $ValidExec;
    private $Principal;

    public function ExecutaFind($colecao, $query = null, $main = true, $_id = null){
        $this->Id = $_id;
        $this->Colecao = $colecao;
        $this->Principal = $main;
        $this->ValidExec = (!is_null($query)) ? true : false;
        $this->TerSyntax();
        $this->Executar();
    }

    public function SetPaging($start, $limit){
        $this->Start = (int) $start;
        $this->Limit = (int) $limit;
    }

    public function ExecLogin($colecao, $user, $pass){
        $this->Colecao = $colecao;
        $this->User = $user;
        $this->Pwd = $pass;
        $this->ValidExec = false;
        $this->TerSyntaxlogin();
        $this->Executar();
    }

    public function ExecPaging($colecao){
        $this->Colecao = $colecao;
        $this->Principal = true;
        $this->ValidExec = true;
        $this->TerSyntaxPaging();
        $this->Executar();
    }

    public function ExecPagingQtd($colecao){
        $this->Colecao = $colecao;
        $this->Principal = true;
        $this->ValidExec = true;
        $this->TerSyntaxPagingTotal();
        $this->Executar();
    }

    public function ExecSearch($colecao, $search, array $check){
        $this->Colecao = $colecao;
        $this->Search = $search;
        foreach ($check as $key => $valor){
            switch ($valor){
                case 'comando':
                    $check[$key] = 'comando.comando';
                    break;
                case 'autor':
                    $check[$key] = 'comando.autor';
                    break;
            }
            if(!isset($valor)){
                unset($check[$key]);
            }
        }
        $this->SearchCheck = $check;
        $this->Principal = true;
        $this->ValidExec = true;
        $this->TerSyntaxSearch();
        $this->Executar();
    }

    public function ExecSearchPaging($colecao, $search, array $check){
        $this->Colecao = $colecao;
        $this->Search = $search;
        foreach ($check as $key => $valor){
            switch ($valor){
                case 'comando':
                    $check[$key] = 'comando.comando';
                    break;
                case 'autor':
                    $check[$key] = 'comando.autor';
                    break;
            }
            if(!isset($valor)){
                unset($check[$key]);
            }
        }
        $this->SearchCheck = $check;
        $this->Principal = true;
        $this->ValidExec = true;
        $this->TerSyntaxSearchPaging();
        $this->Executar();
    }

    public function ExecSearchQtd($colecao, $search, array $check){
        $this->Colecao = $colecao;
        $this->Search = $search;
        foreach ($check as $key => $valor){
            switch ($valor){
                case 'comando':
                    $check[$key] = 'comando.comando';
                    break;
                case 'autor':
                    $check[$key] = 'comando.autor';
                    break;
            }
            if(!isset($valor)){
                unset($check[$key]);
            }
        }
        $this->SearchCheck = $check;
        $this->Principal = true;
        $this->ValidExec = true;
        $this->TerSyntaxSearchTotal();
        $this->Executar();
    }

    public function ObterAuth(){
        foreach ($this->Leitura as $key => $valor){
            if(md5($this->Pwd) === $valor->senha){
                return array("level" => "valido", "sucesso" => true);
            }else{
                return array("level" => "novalido", "sucesso" => false);
            }
        }
        return array("level" => "noexiste", "sucesso" => false);
    }

    public function ObterTotal(){
        foreach ($this->Leitura as $key => $valor){
            foreach ($valor as $key => $valor2){
                foreach ($valor2 as $key => $value) {
                    return $value->total;
                }
                return 0;
            }
        }
    }

    public function Obter(){
        foreach ($this->Leitura as $key => $valor){
            foreach ($valor->result as $key2 => $valor2){
                $cautor = $valor2->comando->autor;
                foreach ($valor2->comando->cdata as $key3 => $valor3){
                    $data = new MongoDB\BSON\UTCDateTime($valor3);
                    $datatime = $data->toDateTime();
                    $valor2->data = $datatime->format('r');
                }
                foreach ($valor2->_id as $key4 => $valor4){
                    $valor2->_id = $valor4;
                }
                $valor2->comando = $valor2->comando->comando;
                $valor2->cautor = $cautor;
            }
            return $valor->result;
        }
    }

    private function TerSyntax(){
        if(!$this->ValidExec){
            $this->Sintaxe = parent::$Db.".".$this->Colecao;
            $this->Query = new MongoDB\Driver\Query([]);
        }else{
            if(is_null($this->Id)){
                $pipeline = [
                    ['$unwind' => '$comando'],
                    ['$match' =>
                        [
                            'comando.principal' =>  ['$in' => [$this->Principal]]
                        ],
                    ],
                    ['$limit' => $this->Limit]
                ];
            }else{
                $pipeline = [
                    ['$unwind' => '$comando'],
                    ['$match' => [
                        '_id' => ['$in' => [new MongoDB\BSON\ObjectId($this->Id)]],
                        'comando.principal' =>  ['$in' => [$this->Principal]]
                    ],
                    ]
                ];
            }
            $this->Query = new \MongoDB\Driver\Command([
                'aggregate' => 'comandos',
                'pipeline' => $pipeline
            ]);
        }
    }

    private function TerSyntaxlogin(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $filtro = ['usuario' => $this->User];
        $opt = ['projection' => ['_id' => 0]];
        $this->Query = new MongoDB\Driver\Query($filtro, $opt);
    }

    private function TerSyntaxPaging(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $pipeline = [
            ['$unwind' => '$comando'],
            ['$match' =>
                [
                    'comando.principal' =>  ['$in' => [$this->Principal]]
                ],
            ],
            ['$skip' => $this->Start],
            ['$limit' => $this->Limit]
        ];
        $this->Query = new \MongoDB\Driver\Command([
            'aggregate' => 'comandos',
            'pipeline' => $pipeline
        ]);
    }

    private function TerSyntaxSearchPaging(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Resultado = array(
            array('$unwind' => '$comando'),
            array('$match' => array(
                    '$and' => array(
                        array(
                            'comando.principal' => Array ('$in' => Array (0 => true))
                        )
                    ),
                ),
            ),
            ['$skip' => $this->Start],
            ['$limit' => $this->Limit]
        );
        $query = array('$or' => array());
        foreach ($this->SearchCheck as $valor){
            array_push($query['$or'], array(
                $valor => array(
                    '$in' => Array(
                        new MongoDB\BSON\Regex($this->Search,"i")
                    )
                )
            ));
            $this->Resultado[1]['$match'] = array_merge(
                $this->Resultado[1]['$match'], $query
            );
        }
        $this->Query = new \MongoDB\Driver\Command([
            'aggregate' => 'comandos',
            'pipeline' => $this->Resultado
        ]);
    }

    private function TerSyntaxPagingTotal(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $pipeline = [
            ['$unwind' => '$comando'],
            ['$match' =>
                [
                    'comando.principal' =>  ['$in' => [$this->Principal]]
                ]
            ],
            ['$group' =>
                [
                    '_id' => null,
                    'total' => ['$sum' => 1]
                ]
            ]
        ];
        $this->Query = new \MongoDB\Driver\Command([
            'aggregate' => 'comandos',
            'pipeline' => $pipeline
        ]);
    }

    private function TerSyntaxSearch(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Resultado = array(
            array('$unwind' => '$comando'),
            array('$match' => array(
                    '$and' => array(
                        array(
                            'comando.principal' => Array ('$in' => Array (0 => true))
                        )
                    )
                )
            ),
            ['$limit' => $this->Limit]
        );
        $query = array('$or' => array());
        foreach ($this->SearchCheck as $valor){
            array_push($query['$or'], array(
                $valor => array(
                    '$in' => Array(
                        new MongoDB\BSON\Regex($this->Search,"i")
                    )
                )
            ));
            $this->Resultado[1]['$match'] = array_merge(
                $this->Resultado[1]['$match'], $query
            );
        }
        $this->Query = new \MongoDB\Driver\Command([
            'aggregate' => 'comandos',
            'pipeline' => $this->Resultado
        ]);
    }

    private function TerSyntaxSearchTotal(){
        $this->Sintaxe = parent::$Db.".".$this->Colecao;
        $this->Resultado = array(
            array('$unwind' => '$comando'),
            array('$match' => array(
                    '$and' => array(
                        array(
                            'comando.principal' => Array ('$in' => Array (0 => true))
                        )
                    ),
                ),
            ),
            array('$group' => array('_id' => null, 'total' => array('$sum' => 1))),
        );
        $query = array('$or' => array());
        foreach ($this->SearchCheck as $valor){
            array_push($query['$or'], array(
                $valor => array(
                    '$in' => Array(
                        new MongoDB\BSON\Regex($this->Search,"i")
                    )
                )
            ));
            $this->Resultado[1]['$match'] = array_merge(
                $this->Resultado[1]['$match'], $query
            );
        }
        $this->Query = new \MongoDB\Driver\Command([
            'aggregate' => 'comandos',
            'pipeline' => $this->Resultado
        ]);
    }

    private function TerConexao(){
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
