var express = require('express');
var router = express.Router();

var actorRoutes = require("./actor");
var eventRoutes = require("./events");
var eraseEventsRoutes = require("./eraseEvents");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(actorRoutes);
router.use(eventRoutes);
router.use(eraseEventsRoutes);

module.exports = router;
