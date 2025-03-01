const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Clé secrète JWT (à mettre dans un fichier .env)
const SECRET_KEY = "ton_secret"; // ⚠️ Remplace ça par process.env.JWT_SECRET en prod

// Inscription d'un utilisateur
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "L'utilisateur existe déjà" });

        // Création de l'utilisateur
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Connexion et génération du JWT
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifie si l'utilisateur existe
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        // Vérifie le mot de passe
        //const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) return res.status(400).json({ message: "Mot de passe incorrect" });

        // Génération du JWT
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};
