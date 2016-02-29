new require ("./db").open ("___db.json", function (db) {
	console.log ("=",db.get ("hello"));
	db.set ("hello", "world");
	console.log ("=",db.get ("hello"));
	db.sync(function (x) {
		console.log ("SYNC");
	});
	console.log ("-->");
});
