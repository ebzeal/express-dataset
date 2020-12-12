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
          db.run("DROP TABLE IF EXISTS repos");
          db.run(`CREATE TABLE actors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login text NOT NULL UNIQUE, 
            avatar_url text DEFAULT "https://via.placeholder.com/150"
            )`);
          db.run(`CREATE TABLE repos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL UNIQUE, 
            url text
            )`);
          db.run(`CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type text, 
            actor INTEGER REFERENCES actors(id) ON DELETE CASCADE,
            repo INTEGER REFERENCES repos(id) ON DELETE CASCADE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )`);
            var insert = 'INSERT INTO actors (login) VALUES (?)';
            var insertRepo = 'INSERT INTO repos (name, url) VALUES (?,?)';
                db.run(insert, ["bryanMaks"]);
                db.run(insert, ["joLoe"]);
                db.run(insert, ["bbking"]);
                db.run(insertRepo, ["MetroBooking", "https://github.com/fakeyfakers/metrobooking"]);
                db.run(insertRepo, ["Allious", "https://github.com/fakeyfakers/allious"]);
                db.run(insertRepo, ["Market-Trends", "https://github.com/fakeyfakers/markettrends"]);
                db.run(insertRepo, ["MillaryDrones", "https://github.com/fakeyfakers/millitarydrones"]);
      });
      }
});


module.exports = db