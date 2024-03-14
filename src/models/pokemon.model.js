// À ajuster selon la structure
const sql = require("../config/db_pg");

const Pokemon = (pokemon) => {
    this.nom = pokemon.nom;
};

Pokemon.creerPokemon = (nom, primaire, secondaire, pv, attaque, defense) => {
    console.log('creerPokemon -> model');
    return new Promise((resolve, reject) => {
        var requete = `INSERT INTO bd_exercices.pokemon (nom,type_primaire,type_secondaire,pv,attaque,defense) VALUES ($1, $2, $3, $4, $5, $6)`;
        const params = [nom, primaire, secondaire, pv, attaque, defense];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Une erreur est survenue : Pokemon.creerPokemon');
                reject(erreur);
            } else {
                console.log('succès BD');
                resolve(JSON.stringify(resultat));
            }
        })
    })
}

Pokemon.pagePokemon = (type, page) => {
    return new Promise((resolve, reject) => {
        type = type.charAt(0).toUpperCase() + type.slice(1);
        var requete = "SELECT * FROM public.pokemon WHERE type_primaire = $1 OR type_secondaire = $1";
        const params = [type];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Une erreur est survenue : Pokemon.pagePokemon');
                reject(erreur);
            } else {
                const res = resultat.rows;
                console.log(res);
                //Combien de pokémon en tout?
                const qtPage = page * 25;
                const nbPokemon = res.length;
                const data = {
                    pokemons: res.slice((qtPage - 25), qtPage),
                    type: type,
                    nbPokemon : nbPokemon,
                    page : page,
                    nbPage: Math.ceil(nbPokemon/25)
                };
                resolve(JSON.stringify(data));
            }
        });
    });
};


Pokemon.trouverPokemon = (id) => {
    return new Promise((resolve, reject) => {
        console.log(id);
        const requete = `SELECT * FROM public.pokemon WHERE id = $1`;
        const params = [id]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                console.log('Une erreur est survenue : Pokemon.trouverPokemon');
                reject(erreur);
            }
            resolve(resultat);
        });
    });
};

module.exports = Pokemon;
