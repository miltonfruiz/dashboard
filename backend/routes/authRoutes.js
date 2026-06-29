```javascript
// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro de usuario
router.post('/register', authController.register);

// Inicio de sesión
router.post('/login', authController.login);

// Cierre de sesión
router.post('/logout', authController.logout);

module.exports = router;
```