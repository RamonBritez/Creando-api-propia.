const { Genre, sequelize } = require("../../database/models")


module.exports = {
list: function (req, res){

    Genre.findAll()
    .then(function(genres){
        const RESPONSE = {
            meta: {
                status: 200,
                total: genres.length,
                url: "/genres"
            },
            data: genres
        }

        res.json(RESPONSE)
    } )
},
detail: (req, res) => {
    let genre_id = req.params.id;
    
    Genre.findByPk(genre_id)
    .then(genre => {
        const RESPONSE ={
            meta:{
                status: 200
            },
            data: genre
        }
        res.json(RESPONSE);
    })
}



}