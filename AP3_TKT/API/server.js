require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const attraRoutes  = require('./routes/attractions');
const avertRoutes  = require('./routes/avertissements');
app.use(cors())
app.use(express.json())

app.use('/attraction', attraRoutes);
app.use('/avertissements', avertRoutes);
// ROUTE DE TEST

app.get('/', (req, res) => {
  res.send('API AP3_TKT en ligne');
})

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

app.get('/api/infos', (req, res) => {
    informations = {
        nom: 'Alexis Déjean',
        projet: "API AP3_TKT",
        description: "Ceci est une API de test pour l'AP Disney"
    }
    res.send(JSON.stringify(informations));
})