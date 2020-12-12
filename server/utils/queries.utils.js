const selectAll = (table) => `SELECT * FROM ${table}`;
const selectAllEvents = `SELECT * FROM events, actors, repos WHERE events.actor = actors.id AND events.repo = repos.id`;
const selectOne = (table, param) => `SELECT * FROM ${table} WHERE id=${param}`;
const selectEventsByActor = `SELECT * FROM events, actors, repos WHERE events.actor=$1 AND events.actor = actors.id AND events.repo = repos.id ORDER BY events.id ASC`;


const addAnEvent = 'INSERT INTO events(type, actor, repo)VALUES($1, $2, $3)';
const deleteAll = (table) =>`DELETE FROM ${table}`;
const updateActorAvatar = `UPDATE actors SET avatar_url = COALESCE(?, avatar_url) WHERE id=?`;

module.exports = {
  selectAll,
  selectAllEvents,
  selectOne,
  selectEventsByActor,
  addAnEvent,
  deleteAll,
  updateActorAvatar
}