var config = require ('./config'),
      zlib = require ('zlib'),
        fs = require ('fs');

const JS = JSON.stringify;
const JP = JSON.parse;

exports.open = function (f,cb) {
	this.store = {};
	console.log ("openin ",f);
	this.list = function (cb) {
		if (cb) for (var x in this.store) cb (this.store[x]);
		return this.store;
	}
	this.set = function (k,v) {
		this.store[k] = v;
	}
	this.get = function(id) {
		return this.store[id];
	}
	this.drop = function() {
		fs.unlink (this.database);
	}
	function autosave() {
		console.log ("autosave");
		exports.sync(function (x) {
			setTimeout (autosave, config.autosave);
		});
	}

	this.load = function(file, cb) {
		this.database = file;
		if (config.autosave>0) setTimeout (autosave, config.autosave);
		fs.readFile (this.database+".gz", function (err, data) {
			if (err) cb ();
			else zlib.gunzip (data, function (err, str) {
				if (err&&cb) return cb ();
				try {
					this.store = JP (str);
					if (cb) cb (this);
				} catch (e) {
					if (cb) cb (this);
				}
			});
		});
	}

	this.sync = function(cb) {
		var str = JS (this.store);
		if (!cb) cb = function() {}
		
		zlib.gzip (str, function (err, buffer) {
			if (!err) {
				fs.writeFile (this.database+".tmp", buffer, function (err) {
					if (err) cb ('cannot write to temporary file');
					else
					fs.rename (this.database+".tmp", this.database+".gz", function (err) {
						cb (err? 'cannot write on file': null);
					});
				});
			} else cb ('cannot compress database');
		});
	}
	this.load(f,cb);
};
