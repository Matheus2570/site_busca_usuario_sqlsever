// controllers/userController.js

const userModel = require("../models/userModel"); // Importa o model para interagir com o banco

// Função para lidar com a requisição de listagem de usuários
exports.getUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar usuários"); // Retorna um erro 500 se algo deu errado
    } else {
      res.json(users); // Retorna os usuários em formato JSON
    }
  });
};

// Função para lidar com a requisição de criação de usuário
exports.createUser = (req, res) => {
  const data = req.body; // Extrai o nome do corpo da requisição
  userModel.createUser(data, (err) => {
    if (err) {
      res.status(500).send("Erro ao criar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.status(201).send("Usuário criado com sucesso"); // Retorna status 201 (criado) se bemsucedido
    }
  });
};

// Função para lidar com a requisição de atualização de usuário
exports.updateUser = (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const { name } = req.body; // Extrai o nome do corpo da requisição
  const { age } = req.body;
  const { email } = req.body;
  const { contact } = req.body;
  userModel.updateUser(id, name, age, email, contact, (err) => {
    if (err) {
      res.status(500).send("Erro ao atualizar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.send("Usuário atualizado com sucesso"); // Retorna uma mensagem de sucesso
    }
  });
};

// Função para lidar com a requisição de remoção de usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  userModel.deleteUser(id, (err) => {
    if (err) {
      res.status(500).send("Erro ao deletar usuário"); // Retorna um erro 500 se algo deu errado
    } else {
      res.send("Usuário deletado com sucesso"); // Retorna uma mensagem de sucesso
    }
  });
};

// Função para buscar um usuário pelo ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  userModel.getUserById(parseInt(id), (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message }); // Retorna mensagem de erro detalhada
    }

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user); // Retorna o usuário encontrado
  });
};
