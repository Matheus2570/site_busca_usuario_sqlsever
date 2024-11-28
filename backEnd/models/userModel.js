// models/userModel.js

const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// Função para buscar todos os usuários no banco de dados
exports.getAllUsers = (callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    const query = `SELECT * FROM Users1`; // SQL para buscar todos os usuários
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null); // Trata erros de execução da consulta
      }
      if (rowCount === 0) {
        return callback(null, []); // Retorna um array vazio se não houver registros
      }
    });

    const result = [];
    request.on("row", (columns) => {
      result.push({
        id: columns[0].value,
        name: columns[1].value,
        age: columns[2].value,
        email: columns[3].value,
        contact: columns[4].value
      });
    });

    // Ao completar a consulta, retorna o array com todos os usuários
    request.on("requestCompleted", () => {
      callback(null, result); // Retorna o array de resultados
    });

    connection.execSql(request); // Executa a consulta
  });
  connection.connect(); // Inicia a conexão
};

// Função para criar um novo usuário
exports.createUser = (data, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    const query = `INSERT INTO Users1 (name, age, email, contact) VALUES (@name, @age, @email, @contact)`; // SQL para inserir um novo usuário
    const request = new Request(query, (err) => {
      if (err) {
        callback(err); // Retorna erro se houver falha
      } else {
        callback(null, { message: "Usuario inserido com sucesso!" });
      }
    });

    // Adiciona os parâmetros necessários para a inserção
    request.addParameter("name", TYPES.VarChar, data.name);
    request.addParameter("age", TYPES.Int, data.age)
    request.addParameter("email", TYPES.VarChar, data.email)
    request.addParameter("contact", TYPES.VarChar, data.contact)
    connection.execSql(request); // Executa a consulta
  });
  connection.connect(); // Inicia a conexão
};

// Função para atualizar um usuário existente
exports.updateUser = (id, name, age, email, contact, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    const query = `
      UPDATE Users1 
      SET name = @name, age = @age, email = @email, contact = @contact 
      WHERE id = @id
    `; // SQL para atualizar o usuário

    const request = new Request(query, (err) => {
      if (err) {
        callback(err); // Retorna erro se houver falha
      } else {
        callback(null, { message: "Usuario atualizado com sucesso!" }); // Mensagem de sucesso
      }
    });

    // Adiciona os parâmetros de atualização
    request.addParameter("id", TYPES.Int, id);
    request.addParameter("name", TYPES.VarChar, name);
    request.addParameter("age", TYPES.Int, age);
    request.addParameter("email", TYPES.VarChar, email);
    request.addParameter("contact", TYPES.VarChar, contact);

    connection.execSql(request); // Executa a atualização no banco de dados
  });
  connection.connect(); // Inicia a conexão
};


// Função para deletar um usuário existente
exports.deleteUser = (id, callback) => {
  const connection = createConnection(); // Cria a conexão com o banco de dados
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null); // Trata erros de conexão
    }
    const query = `DELETE FROM Users1 WHERE id = @id`; // SQL para deletar o usuário
    const request = new Request(query, (err) => {
      if (err) {
        callback(err); // Retorna erro se houver falha
      } else {
        callback(null, { message: "Usuario deletado com sucesso!" }); // Mensagem de sucesso
      }
    });

    // Adiciona o parâmetro necessário para a exclusão
    request.addParameter("id", TYPES.Int, id);
    connection.execSql(request); // Executa a remoção no banco de dados
  });
  connection.connect(); // Inicia a conexão
};


// Função para buscar um usuário pelo ID
exports.getUserById = (id, callback) => {
  if (isNaN(id) || id <= 0) {
    return callback(new Error("ID inválido"), null);
  }

  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }

    const query = `SELECT * FROM Users1 WHERE id = @id`;
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null);
      }

      if (rowCount === 0) {
        // Garante que o callback só seja chamado uma vez com resultado nulo
        return callback(null, null);
      }
    });

    let user = null;
    request.on("row", (columns) => {
      user = {
        id: columns[0].value,
        name: columns[1].value,
        age: columns[2].value,
        email: columns[3].value,
        contact: columns[4].value,
      };
    });

    request.on("requestCompleted", () => {
      callback(null, user);
    });

    request.addParameter("id", TYPES.Int, id);
    connection.execSql(request);
  });

  connection.connect();
};