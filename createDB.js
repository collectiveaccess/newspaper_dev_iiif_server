const Database = require("better-sqlite3");
const fs = require("fs");
var path = require("path");

const dir = path.join("tmp");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const db = new Database(path.join(dir, "database.db"), {
  verbose: console.log,
});
db.exec(`CREATE TABLE annotations  (
	id INTEGER PRIMARY KEY,
	canvas TEXT NOT NULL,
	annotation TEXT NOT NULL,
	object_id INTEGER NOT NULL,
	token TEXT NOT NULL,
	annotation_id INTEGER NOT NULL
)`);
