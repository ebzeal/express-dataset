const db = require("../db");
const response = require("../utils/response.utils");

const responseUtil = response.response;

var getAllActors = (_, res, __) => {
	try {
    var sql = "select * from actors"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          return responseUtil(res, 400, "failure", null, null, err.message)
        }
        return responseUtil(res, 200, "success", "All Actors", rows, null)
         
			});
		}catch(error) {
      return responseUtil(res, 500, "error", null, null, "Internal Server Error")
		}
};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















