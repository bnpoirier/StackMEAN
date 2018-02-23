/*
Importer les composants de la route
*/
    let express = require('express');
    let router = express.Router();
    let mongoose = require('mongoose');
//

/*
Définition des routes
*/
    router.get('/', (req, res) => {
        mongoose.connect(process.env.MONGO_HOST, (err, db) => {
            console.log('front')
            // Tester la connection
            if(err) { res.send(err) } 
            else{
                // Afficher les documents de la colletion myRecipe
                db.collection('tasks').find().toArray((err, collection) => {
                    // Tester la commande MongoDb
                    if(err){ res.render('index', {content : err}) }
                    else{ 
                        // Envoyer les données au format json
                        res.render('index', {content : collection})
                    }
                })
            }

            // Fermer la connexion
            db.close();
        })
        
    });


    router.get('/add-recipe', (req, res) => {
        res.render('add-recipe');
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//