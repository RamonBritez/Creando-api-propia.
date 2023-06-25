const db = require('../../database/models');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


module.exports = {
    list: function (req, res) {

        Actors.findAll({
            include: [
                {
                  association: "movies",
                }
            ],
        })
            .then(function (actors) {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        total: actors.length,
                        url: "/actors"
                    },
                    data: actors
                }

                res.json(RESPONSE)
            })
    },
    detail: function (req, res) {
        let actorId = req.params.id;
        Actors.findByPk(actorId)
            .then(function (actor) {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        url: "/actors"
                    },
                    data: actor
                }

                res.json(RESPONSE)
            })
    },
    create: (req, res) => {
        let { first_name, last_name, rating } = req.body

        const newActor = {
            first_name,
            last_name,   
            rating,
        };

        Actors.create(newActor)
            .then(() => {
                const RESPONSE = {
                    endpoint: "/actors",
                    msg: "Actor/riz ingresado correctamente!"
                };

                res.status(201).json(RESPONSE);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    destroy: (req, res) => {
        const actorId = req.params.id;

        Actors.destroy({
            where:{
                id: actorId
            }  
        })
        .then(() => {
            const RESPONSE = {
                endpoint: "/actors",
                msg: "Actor/riz eliminado correctamente!"
            };
                res.status(200).json(RESPONSE);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }

}