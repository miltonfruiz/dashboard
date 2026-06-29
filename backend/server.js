```javascript
// Importar dependencias
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Crear aplicación Express
const app = express();

// Configurar seguridad con Helmet
app.use(helmet());

// Configurar CORS
app.use(cors());

// Configurar límite de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 solicitudes
});
app.use(limiter);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/api/analiticas', (req, res) => {
  // Implementar lógica para obtener datos de analíticas
  res.json({ mensaje: 'Datos de analíticas' });
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
```