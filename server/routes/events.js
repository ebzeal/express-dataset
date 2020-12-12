var express = require('express');
var router = express.Router();

var {getAllEvents, addEvent, getByActor} = require("../controllers/events");

// Routes related to event
router.get("/events", getAllEvents);
router.post("/events", addEvent);
router.get("/events/actors/:id", getByActor)



module.exports = router;