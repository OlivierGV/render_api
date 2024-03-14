const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const pokemonController = require('../controllers/pokemon.controller');

/* Créer un pokémon, on a besoin de plusieurs paramètres */
router.post('/pokemon', (req, res) => { 
    /* Exemple attendu : [host]/pokemon/api/pokemon?nom=test&type_primaire=fire&type_secondaire=fire&pv=10&attaque=10&defense=10 */
    /* Envoyer les paramètres dans la fonction */
    pokemonController.creerPokemon(req, res);
});

/* Afficher une liste paginée de tous les pokemons */
router.get('/liste', (req, res) => { 
    /* Envoyer les paramètres dans la fonction */
    pokemonController.pagePokemon(req, res);
});

/* Afficher un pokemon selon son id */
router.get('/:id', (req, res) => { 
    /* Envoyer les paramètres dans la fonction */
    pokemonController.trouverPokemon(req, res);
});

/* Exporter toutes les méthodes qui utilise "router" */
module.exports = router;
