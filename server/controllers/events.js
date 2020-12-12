var db = require("../db");
const responseUtil = require("../utils/response.utils");
const queries = require("../utils/queries.utils");

const {selectAll, selectAllEvents, selectEventsByActor, addAnEvent, deleteAll} = queries;
const {response} = responseUtil;

var getAllEvents = (_, res, __) => {
	try {
    var params = []
    const eventRes = [];
  db.all(selectAllEvents, params, (err, rows) => {
        if (err) {
          return response(res, 400, "failure", null, null, err.message);
        }
        rows.map(row=> ( eventRes.push({
          "id": row.id,
          "type": row.type,
          "actor":{
            "id": row.actor,
            "login":row.login,
            "avatar_url": row.avatar_url
          },
          "repo":{
            "id":row.repo,
            "name": row.name,
            "url": row.url
          },
          "created_at": row.created_at
        }))
        )
        
        return response(res, 200, "success", `All Events`, eventRes, null);
      });
    }catch(error) {
      return response(res, 500, "error", null, null, "Internal Server Error")
		}
};

var addEvent = (req, res, _) => {
  try{
  const {type, actor, repo} = req.body;
  console.log("🚀 ~ file: events.js ~ line 43 ~ addEvent ~ req.body", req.body)
  if(!type) return response(res, 400, "failure", null, null, "specify type");
  if(!actor) return response(res, 400, "failure", null, null, "specify actor");
  if(!repo) return response(res, 400, "failure", null, null, "specify repo");
           
  db.run(addAnEvent, [type, actor, repo], function (err, result) {
    if (err){
      return response(res, 400, "failure", null, null, err.message);
    }
    return response(res, 201, "success", "All Actors", {id: this.lastID, type, actor, repo}, null);
  });
  } catch(error){
    return response(res, 400, "failure", null, null, error);
  }
};


var getByActor = (req, res, __) => {
	try {
    const {id} = req.params;
    var params = [id]
    const eventRes = [];
  db.all(selectEventsByActor, params, (err, rows) => {
        if (err) {
          return response(res, 400, "failure", null, null, err.message);
        }
        rows.map(row=> ( eventRes.push({
          "id": row.id,
          "type": row.type,
          "actor":{
            "id": row.actor,
            "login":row.login,
            "avatar_url": row.avatar_url
          },
          "repo":{
            "id":row.repo,
            "name": row.name,
            "url": row.url
          },
          "created_at": row.created_at
        }))
        )
        
        return response(res, 200, "success", "All Actors", eventRes, null);
      });
    }catch(error) {
      console.log("🚀 ~ file: events.js ~ line 100 ~ getByActor ~ error", error)
      return response(res, 500, "error", null, null, "Internal Server Error")
		}
};


var eraseEvents = (_, res, __) => {
  try{
  var sql = deleteAll('events');
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          return response(res, 400, "failure", null, null, err.message);
        }
        return response(res, 200, "success", "Deleted All Events", rows, null);
      });
    }catch(error) {
      return response(res, 500, "error", null, null, "Internal Server Error")
		}
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















