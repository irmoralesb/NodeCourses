const https = require("https");
const url = require('url');
const fs = require('fs');
//const textBody = require('body'); //Used to process text
const jsonBody = require('body/json');
// const formBody = require('body/form'); //Used to process forms
// const anyBody = require('body/any'); //Used to parse any body format
const services = require('./services');

const server = https.createServer({
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem")
});

server.on('request', (request, response) => {
    const parsedURL = url.parse(request.url, true);
    if (request.method === 'GET' && parsedURL.pathname === '/metadata') {
        const { id } = parsedURL.query;
        const metadata = services.fetchImageMetadata(id);
        console.log(request.headers);
    } else if (request.method === 'POST' && parsedURL.pathname === '/users') {
        jsonBody(request, response, (error, body) => {
            if (error) {
                console.log(error);
            }
            else {
                services.createUser(body[0]['userName']);
            }
        });
    }
    else {
        response.statusCode = 400;
        response.setHeader('X-Powered-By','Node');
        response.end();
    }
});

server.listen(443);