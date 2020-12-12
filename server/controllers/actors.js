const db = require("../db");
const responseUtil = require("../utils/response.utils");
const queries = require("../utils/queries.utils")

const {selectAll, selectOne, updateActorAvatar} = queries;
const {response} = responseUtil;

var getAllActors = (_, res, __) => {
	try {
    var sql = selectAll('actors');
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          return response(res, 400, "failure", null, null, err.message)
        }
        return response(res, 200, "success", "All Actors", rows, null)      
			});
		}catch(error) {
      console.log("🚀 ~ file: actors.js ~ line 19 ~ getAllActors ~ error", error)
      return response(res, 500, "error", null, null, "Internal Server Error")
		}
};

var updateActor = (req, res) => {
  try {
    const {id, avatar_url} = req.body;
    var params = [avatar_url, id];
    if(!req.body.avatar_url || Object.keys(req.body).length !== 2) return response(res, 400, "failure", null, null, "please supply only the id and avatar_url fileds")
    db.get(selectOne('actors', id), [], (err, rows)=> {
      if (err || !rows) {
        return response(res, 404, "failure", null, null, "actor not found")
      }
    db.run(updateActorAvatar, params, (err, result) => {
        if (err) {
          return response(res, 404, "failure", null, null, err.message)
        }
        return response(res, 200, "success", "Updated Actor's avatar", this.changes, null)      
      });
    });
		}catch(error) {
      return response(res, 500, "error", null, null, "Internal Server Error")
		}
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















