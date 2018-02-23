
/*
Import des composants de la route
*/
// Configuration du module
let express = require('express');
let router = express.Router();

// Configuration de la base MongoDb
let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectID;
let MongoClient = mongodb.MongoClient;

// Configuration de body-parser
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


/*
Définition des routes
*/
    // Envoyer "Hello from NodeJS"
    router.use('/hello', (req, res) => {
        // Renvoie un objet JSON
        res.json({msg: "Hello from API"});
    });

    // Afficher toutes les recettes
    router.get('/my-recipes', (req, res) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
            // Sélection de la base "my-recipes"
            let db = client.db(process.env.MONGO_DBNAME)

            // Tester la connexion
            if (err) { res.send(err) }
            else {
                // Récupération des documents de la collection 'recipes'
                db.collection('recipes').find().toArray((err, tasks) => {
                    // Tester la commande MongoDb
                    if (err) { res.send(err) }
                    else {
                        // Envoyer les données au format json
                        res.json(tasks)
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            client.close();
        });
    });

    // Ajouter une recette
    router.post('/add-recipe', (req, res) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
            // Sélection de la base "my-recipes"
            let db = client.db(process.env.MONGO_DBNAME)
            // Récupération des données nécessaires pour l'insertion d'une recette
            let recipe = {
                title: req.body.title,
                content: req.body.content,
                ingredients: req.body.ingredients,
            }

            // Tester la connexion
            if (err) { res.send(err) }
            else {
                // Ajout de la recette à la collection "my-recipes"
                db.collection('recipes').insert(recipe, (err, data) => {
                    // Tester la commande MongoDb
                    if (err) { res.send(err) }
                    else {
                        // Envoi des données tout juste insérés
                        res.json(recipe)
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            client.close();
        });
    });

    // Ajouter une recette
    router.delete('/delete/(:id)', (req, res) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
            // Sélection de la base "my-recipes"
            let db = client.db(process.env.MONGO_DBNAME)
            console.log(req.params.id);
            // Tester la connexion
            if (err) { res.send(err) }
            else {
                // Ajout de la recette à la collection "my-recipes"
                db.collection('recipes').remove({_id: ObjectId(req.params.id)}, (err, recipe) => {
                    // Tester la commande MongoDb
                    if (err) { res.send(err) }
                    else {
                        // Envoi des données tout juste insérés
                        res.json({data: true})
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            client.close();
        });
    });

    // Ajouter une recette
    router.get('/recipe/(:id)', (req, res) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(process.env.MONGO_HOST, (err, client) => {
            // Sélection de la base "my-recipes"
            let db = client.db(process.env.MONGO_DBNAME)
            console.log(req.params.id);
            // Tester la connexion
            if (err) { res.send(err) }
            else {
                // Ajout de la recette à la collection "my-recipes"
                db.collection('recipes').findOne({_id: ObjectId(req.params.id)}, (err, recipe) => {
                    // Tester la commande MongoDb
                    if (err) { res.send(err) }
                    else {
                        // Envoi des données tout juste insérés
                        res.json(recipe)
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            client.close();
        });
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//