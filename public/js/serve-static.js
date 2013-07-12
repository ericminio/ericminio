var fs = require('fs');

serve_static = function(folder, request, response) {
	var candidate = folder + (request.url == '/' ? '/index.html' : request.url);
	if (fs.existsSync(candidate) && (fs.statSync(candidate).isFile())) {
		response.write(fs.readFileSync(candidate));			
	} else {
		response.writeHead(404);
	}
	response.end();
}

module.exports = serve_static;