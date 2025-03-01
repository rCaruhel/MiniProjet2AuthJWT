const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();


app.use(cors({
    origin: 'http://localhost:8080', // Autoriser uniquement ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
}));


// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur MongoDB:', err));

// Utilisation des routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
