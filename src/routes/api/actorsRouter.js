const express = require('express');
const router = express.Router();
const { list, create, detail, destroy} = require('../../controllers/api/actorsController');


router.get("/actors", list)
router.post("/actors", create)
router.get("/actors/:id", detail)
router.delete("/actors/:id", destroy)


module.exports = router;