pong = function(response) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify( { alive: true } ));
	response.end();
}

module.exports = pong;