var db = require ("./db");

var x = db.load ("sessions.json");
db.set ("hello", "world");
console.log ("--->",x.get ("hello"));
x.sync ();
