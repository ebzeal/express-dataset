var express = require('express');
var router = express.Router();

// Route related to delete events
var {eraseEvents} = require("../controllers/events");

router.delete("/erase", eraseEvents);

module.exports = router;