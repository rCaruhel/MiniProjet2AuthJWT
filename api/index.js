const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync() // Tu peux ajouter { force: true } pour reset la DB à chaque lancement
    .then(() => {
        console.log("Base de données PostgreSQL synchronisée");
        app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
    })
    .catch(err => console.error("Erreur de synchronisation :", err));
