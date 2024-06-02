const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', userController.getUser);
router.put('/user', userController.updateUser);
router.put('/upload-photo', userController.uploadPhoto);
router.get('/author', userController.getAuthor);

module.exports = router;
