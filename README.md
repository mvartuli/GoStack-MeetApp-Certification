# Meet App - Desafio Final - [GoStack] Certificação GoStack

Aplicação desenvolvida de acordo com os requisitos do desafio final de certificação.
O Desenvolvimento foi em ambiente Windows 10 e a aplicação Mobile testada apenas em Android.
Banco de dados utilizado: Postgres.

## Backend

### Bancos de dados

- Foi utilizado para o desenvolvimento o banco de dados Postgres e Redis (fila de envio de e-mail).
- Na pasta backend se encontra um arquivo .env.example que pode servir como base para o .ENV, bastando apenas preencher as variáveis de acordo com o ambiente utilizado.

### Para rodar os serviços

yarn dev
yarn queue

## Mobile

### Android

- A aplicação foi testada apenas em Android.
- Foi utilizado o emulador do Android Studio, Imagem: PIXEL 2 API 28
- Com a versão de node 12.12.0 existe um erro em um arquivo do node_modules, que causa erro de compilação, devendo ser corrigido conforme abaixo, caso seja instalado algum novo pacote:
  - Source file:
    node_modules\metro-config\src\defaults\blacklist.js
  - Trecho original:
  ```
  var sharedBlacklist = [
    /node_modules[/\\]react[/\\]dist[/\\].*/,
    /website\/node_modules\/.*/,
    /heapCapture\/bundle\.js/,
    /.*\/__tests__\/.*/,
  ];
  ```
  - Correção:
  ```
  var sharedBlacklist = [
    /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
    /website\/node_modules\/.*/,
    /heapCapture\/bundle\.js/,
    /.*\/__tests__\/.*/,
  ];
  ```
