const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota GET para listar todos os users
router.get('/users', userController.getUsers);

/*
// Rota Get para listar user pelo Rm
router.get('/users/id/:id', userController.getUsersById);

// Rota Get para listar user pelo Nome
router.get('/users/name/:name', userController.getUsersByName);

// Rota POST para criar um novo user
router.post('/users', userController.createUsers);

// Rota PUT para atualizar um user existente
router.put('/users/:id', userController.updateUsers);

// Rota DELETE para remover um user
router.delete('/users/:id', userController.deleteUsers);
*/

module.exports = router;


