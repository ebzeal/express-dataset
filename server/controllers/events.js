var db = require("../db");
const response = require("../utils/response.utils");

var getAllEvents = (_, res, __) => {
	var sql = "select * from events"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          return responseUtil(res, 400, "failure", null, null, err.message);
        }
        return responseUtil(res, 200, "success", "All Actors", rows, null);
      });
};

var addEvent = (req, res, next) => {
	const {type, actor, repo} = req.body;
	
};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















