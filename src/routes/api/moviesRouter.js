const express = require('express');
const router = express.Router();
const { list, create, detail, destroy} = require('../../controllers/api/moviesController');


router.get("/movies", list)
router.post("/movies", create)
router.get("/movies/:id", detail)
router.delete("/movies/:id", destroy)


module.exports = router;