#!/usr/bin/node 
/* author: pancake@nopcode.org  2012-2016 */

const JS = JSON.stringify;
const JP = JSON.parse;
var config = require ('./config');
var serveIndex = require('serve-index')
var proxyhost = '127.0.0.1'
var proxyport = 8080;
var httpport = config.port;
var logdir = "/opt/sandbox/";
httpport = 80;

var httpProxy = require ('http-proxy');
var express = require ('express');
var fs = require ("fs");
var ws = require ("websocket");

var proxy = new httpProxy.RoutingProxy();
var app = express();

//var error = require ("./ErrorHandler.js");
console.log ("listen to ", httpport);
app.configure (function() {
	//app.use (express.methodOverride ());
	//app.use (app.router);

	function log(type, req) {
		var logfile = logdir+"/"+type+".log";
		var ua = req.headers['user-agent'];
		var logline = (new Date ()).toJSON()
			+ "\t"+req.connection.remoteAddress
			+ "\t"+req.url + "\t"+ua+"\n";
		try {
			fs.appendFile (logfile, logline);
		} catch (e) {
			console.error ("Cannot write to "+type+" log file");
		}
	}

        ["/t", "/old", "/d3", "/cmd"].forEach((dir) => {
                app.all (dir+"/*", function(req, res) {
                        log ("access", req);
                        req.on('end', function() {
                                log('access-done', req);
                        });
                        proxy.proxyRequest (req, res, {
                                host: proxyhost,
                                port: proxyport
                        });
                });
                app.all (dir, function(req, res) {
                        req.path += "/";
                        req.on('end', function() {
                                log('access-done', req);
                        });
                        proxy.proxyRequest (req, res, {
                                host:'127.0.0.1',
                                port: 8080
                        });
                });
        });
        app.use('/get', serveIndex('www/get', {'icons': true}))

// enyo and p are symlinked from /www
	console.log (express.static(__dirname + '/www'));
	app.use (express.static(__dirname + '/www'));
});

var srv = app.listen (httpport);
var wss = new ws.server ({httpServer: srv});
wss.on('request', function(req) {
	console.log ("8====D");
	//req.reject ();
try {
	var c = req.accept('r2cloud-protocol', req.origin);
	c.sendUTF (JSON.stringify ({
		"type": "login",
		"hash": "123"
	}));
	c.on ('message', function (msg) {
		var m = JP (msg.utf8Data);
		console.log ("GOT ",m);
		switch (m["type"]) {
		case "login":
			var user = msg["user"];
			var pass = msg["pass"];
			// check if user exists
			c.user = user;
			c.sendUTF (JSON.stringify ({
				"type": "auth",
				"success": true
			}));
			break;
		case "connect":
			var addr = msg["addr"];
			var user = c.user;
			var pass = msg["pass"];
			// check if address exists
			c.sendUTF (JSON.stringify ({
				"type": "connect_",
				"addr": addr,
				"success": true
			}));
			break;
		case "publish":
			var name = msg["name"];
			// check if name exists
			for (var i = 0; i <services.length;i++) {
				if (services[i].name == name) {
					c.sendUTF (JSON.stringify ({
						"type": "publish",
						"name": name,
						"message": "already exists",
						"success": false
					}));
					return;
				}
			}
			c.sendUTF (JSON.stringify ({
				"type": "publish_",
				"addr": addr,
				"success": true
			}));
			services.push ({
				"addr":123
			});
			break;
		case "exit":
			console.log (c);
			c.close ();
			break;
		}
	});
	c.sendUTF(JS({login:"nonce"}));
} catch (e) {
	console.log (e);
}
});
//var sessions = require ("sessions");

