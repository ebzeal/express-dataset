var express = require('express');
var router = express.Router();

var {getAllEvents} = require("../controllers/events");

// Routes related to event
router.get("/api/events", getAllEvents);



module.exports = router;