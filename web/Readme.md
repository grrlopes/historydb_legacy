Historydb
============

<p align="center">
  <img src="https://i.imgur.com/OhLg6hh.png">
</p>

Objetivo
-------

Sistema de armazenamento e gerenciamento de comandos.

Funcionalidades
---------------

1. Armazenar e editar comandos.

Requisitos
----------

1. Servidor Apache2.x
2. PHP 5.6+
3. MongoDB3.4+

Instalação
----------

Descompactar o arquivo, dentro da pasta htdocs do servidor HTTP

1. Download https://github.com/grrlopes/historydb/releases
2. Descompactar dentro da pasta DocumentRoot.
    - comando: tar -xzvf hdb-1.0-final.tar.gz.tar.gz

Configuração
------------

Efetuar alteração do arquivo de configuração **config.inc.php**.

```
define("HOST", "mongodb://localhost");
define("BANCO", "historydb");
define("PORTA", "27017");
define("USER", "");
define("SENHA", "");
define("TZONE", "America/Sao_Paulo");