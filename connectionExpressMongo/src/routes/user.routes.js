const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');

// Retrieve all user
router.get('/', userController.findAll);
// Retrieve all user
router.get('/session', userController.session);
// Create a new user
router.post('/', userController.create);
// Retrieve a single user with user
router.get('/:id', userController.findOne);
// Update a user with id
router.put('/:id', userController.update);
// Delete a user with id
router.delete('/:id', userController.delete);
module.exports = router;