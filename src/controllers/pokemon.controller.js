// À ajuster selon la structure
const Pokemon = require("../models/pokemon.model.js");

/* Créer un pokémon */
exports.creerPokemon = (req, res) => {
    // Enregistrer les paramètres
    const nom = req.query.nom;
    const primaire = req.query.type_primaire;
    const secondaire = req.query.type_secondaire;
    const pv = req.query.pv;
    const attaque = req.query.attaque;
    const defense = req.query.defense;
    console.log(primaire);
    // Vérifier si tous les paramètres sont définis
    if (nom === undefined || primaire === undefined || secondaire === undefined || pv === undefined || attaque === undefined || defense === undefined) {
        res.status(500).send({ message: "Certains paramètres sont manquants." });
    } else {
        Pokemon.creerPokemon(nom, primaire, secondaire, pv, attaque, defense)
        .then((pokemon) => {
            res.status(200).send(pokemon);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne une erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500).send({
                message: "Échec lors de la création du Pokémon."
            });
        });
    }
};

exports.pagePokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.query.type){
        res.status(400);
        res.send({
            message: "Veuillez insérer le type de Pokémon dont vous voulez faire la recherche."
        });
        return;
    }
    Pokemon.pagePokemon(req.query.type, req.query.page)
    .then((pokemon) => {
        //console.log(req.query.type);
        //Si on a aucun résultat
        if(!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Aucun Pokémon trouvé avec le type ${req.params.type}`
            });
            return;
        }
        res.status(200).send(pokemon);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Échec lors de la récupération des Pokémons avec le type " + req.params.id
        });
    });
};
exports.trouverPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokémon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemon.trouverPokemon(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokémon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
        res.send(pokemon[0]);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Échec lors de la récupération du Pokémon avec l'id " + req.params.id
        });
    });
};
