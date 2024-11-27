const userModel = require('../models/userModel');

// Função para listar todos os users
exports.getUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).send('Erro ao buscar users');
        } else {
            res.json(users);
        }
    });
};

// Buscar user pelo Id
exports.getUsersById = (req, res) => {
    const {id} = req.params;
    userModel.getUsersById(id, (err, user) => {
      if (err) return res.status(500).send('Erro ao buscar user' );

        res.json(user);
      })
    };
  

// Buscar user pelo nome
exports.getUsersByNome = (req, res) => {
    const {name} = req.params;
    userModel.getUsersByNome(name, (err, user) => {
      if (err) return res.status(500).send('Erro ao buscar user' );

        res.json(user);
      })
    };


// Função para criar um novo user
exports.createUsers = (req, res) => {
    const data = req.body;
    userModel.createUsers(data, (err) => {
        if (err) {
            res.status(500).send('Erro ao criar user');
        } else {
            res.status(201).send('User criado com sucesso');
        }
    });
};

// Função para atualizar um user existente
exports.updateUsers = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    userModel.updateUsers(id, data, (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar user');
        } else {
            res.send('User atualizado com sucesso');
        }
    });
};

// Função para deletar um user
exports.deleteUsers = (req, res) => {
    const { id } = req.params;
    userModel.deleteUsers(id, (err) => {
        if (err) {
            res.status(500).send('Erro ao deletar user');
        } else {
            res.send('User deletado com sucesso');
        }
    });
};



