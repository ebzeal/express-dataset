var express = require('express');
var router = express.Router();

var actorRoutes = require("../routes/actor");
var eventRoutes = require("../routes/events");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(actorRoutes);
router.use(eventRoutes);

module.exports = router;
