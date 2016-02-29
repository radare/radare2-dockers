var config = require ("./config");
var WebSocketClient = require ("websocket").client;

var uri = "http://"+config.host+":"+config.port+"/";

var cli = new WebSocketClient ();

cli.on ('connectFailed', function (err) {
	console.log ("cannot connect", err);
});

cli.on ('error', function(e) {
	console.log ("fuck", e);
});

var do_register = false; //
var user = "pancake";
var pass = "123";

var channels = [];

var _c;
cli.on ('connect', function(c) {
	_c = c;
	console.log ("open");
	c.on ('message', function (msg) {
		console.log ("/*    */ ", msg);
		var type = msg["type"];
		switch (type) {
		case "login":
			if (do_register) {
				c.sendUTF (JSON.stringify ({
					"type":"register",
					"user": user,
					"pass": pass
				}));
			} else {
				// pass = sha256(pass+hash)
				c.sendUTF (JSON.stringify ({
					"type":"login",
					"user": user,
					"pass": pass
				}));
			}
			break;
		case "auth":
			var success = msg["success"];
			if (!success) {
				console.log ("Login fail");
			}
			break;
		case "publish":
			var success = msg["success"];
			if (success) {
				console.log ("published");
			} else {
				console.log ("cannot publish");
			}
			break;
		case "cmd":
			// answer cmd from published service
			break;
		case "push":
			break;
		}
	});

	c.on ('close', function() {
		console.log ("closed");
	});
});

/* main */
cli.connect (uri, 'r2cloud-protocol');
process.openStdin ().on ('data', function (s) {
	var str = s.toString ();
	_c.sendUTF (str);
});
