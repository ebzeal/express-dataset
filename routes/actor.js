var express = require('express');
var router = express.Router();

var {getAllActors} = require("../controllers/actors");

// Routes related to actor.

router.get("/api/actors", getAllActors);

module.exports = router;