// db.js
const { Connection } = require("tedious"); // Importa a classe Connection do pacote tedious
// Configurações para conectar ao SQL Server
const config = {
  server: "localhost", // Nome do servidor (pode ser 'localhost' ou um endereço remoto)
  authentication: {
    type: "default", // Tipo de autenticação (no caso, autenticando com nome de usuário e senha)
    options: {
      userName: "testeParaInsomnia", // Nome do usuário do banco de dados
      password: "12345", // Senha do banco de dados
    },
  },
  options: {
    database: "Dia_27_11_2024_Atividade_apiCrudSqlServer", // Nome do banco de dados
    encrypt: false, // Desativar criptografia (pode mudar se necessário)
    port: 1433, // Porta padrão do SQL Server
    trustServerCertificate: true, // Necessário para evitar erro de SSL em ambiente local
  },
};
// Função para criar uma nova conexão com o banco de dados
function createConnection() {
  return new Connection(config); // Retorna uma nova instância da classe Connection
}
module.exports = createConnection; // Exporta a função createConnection
