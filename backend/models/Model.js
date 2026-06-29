```javascript
// Importamos mongoose
const mongoose = require('mongoose');

// Creamos un esquema para la colección de analíticas
const analiticaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['visita', 'compra', 'registro'],
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

// Creamos un modelo para la colección de analíticas
const Analitica = mongoose.model('Analitica', analiticaSchema);

// Exportamos el modelo
module.exports = Analitica;
```