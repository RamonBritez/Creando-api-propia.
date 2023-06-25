const db = require('../../database/models');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


module.exports = {
    list: function (req, res) {

        Movies.findAll({
            include: [
                {
                  association: "actors",
                }
            ],
        })
            .then(function (movies) {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        total: movies.length,
                        url: "/movies"
                    },
                    data: movies
                }

                res.json(RESPONSE)
            })
    },
    detail: function (req, res) {
        let movieId = req.params.id;
        Movies.findByPk(movieId)
            .then(function (movie) {
                const RESPONSE = {
                    meta: {
                        status: 200,
                        url: "/movies"
                    },
                    data: movie
                }

                res.json(RESPONSE)
            })
    },
    create: (req, res) => {


        let { title, rating, awards, release_date, length, genre_id } = req.body

        const newMovie = {
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        };

        Movies.create(newMovie)
            .then(() => {
                const RESPONSE = {
                    endpoint: "/movies",
                    msg: "Pelicula ingresada correctamente!"
                };

                res.status(201).json(RESPONSE);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    },
    destroy: (req, res) => {
        const idMovie = req.params.id;

        Movies.destroy({
            where:{
                id: idMovie
            }  
        })
        .then(() => {
            const RESPONSE = {
                endpoint: "/movies",
                msg: "Pelicula eliminada correctamente!"
            };
                res.status(200).json(RESPONSE);
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }

}