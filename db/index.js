var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5');

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.');
    
        db.serialize(() => {
          db.run("DROP TABLE IF EXISTS actors");
          db.run("DROP TABLE IF EXISTS events");
          db.run("DROP TABLE IF EXISTS repos");
          db.run(`CREATE TABLE actors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login text NOT NULL UNIQUE, 
            password text, 
            avatar_url text,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`);
          db.run(`CREATE TABLE repos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL UNIQUE, 
            url text,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`);
          db.run(`CREATE TABLE events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type text, 
            actor INTEGER REFERENCES actors(id) ON DELETE CASCADE,
            repo INTEGER REFERENCES repos(id) ON DELETE CASCADE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`);
            var insert = 'INSERT INTO actors (login, password, avatar_url) VALUES (?,?,?)'
                db.run(insert, ["admin",md5("admin123456"),"admin@example.com"])
                db.run(insert, ["user",md5("user123456"),"user@example.com"])
                db.run(insert, ["user1",md5("user123456"),"user1@example.com"])
      });
      }
});


module.exports = db