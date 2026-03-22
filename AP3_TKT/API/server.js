require('dotenv').config()
const authToken = require('./auth_token');
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
app.use(cors())
const authRoutes = require("../API/routes/auth")
app.use(express.json())
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}));

// ROUTE DE TEST

app.get('/', (req, res) => {
  res.send('Ceci est une page API de tests')
})


app.use('/api/auth', authRoutes);
app.get('/api/message', (req, res) => {
    infos = {
        nom: 'Alexis Déjean',
        age: "19 ans",
        profession: 'Développeur Web novice',
    
    }
  res.send('Bonjour les gens, je suis un développeur novice et je suis en train de créer une API avec Express.js !' + '<br></br>' + JSON.stringify(infos));
});

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT)
})

app.get('/api/infos', authToken, (req, res) => {
    informations = {
        nom: 'Alexis Déjean',
        projet: "API AP3_TKT",
        description: "Ceci est une API de test pour l'AP Disney"
    }
    res.send(JSON.stringify(informations));
})
