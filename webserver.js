const http = require('http');
const url = require('url');

function handler(request, response) {
    //console.log(request);
    const parsedUrl = url.parse(request.url, true);
    response.setHeader('x-server-date', new Date().toString());
    //console.log(parsedUrl);

    if (parsedUrl.pathname === '/') {
        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.write('Hello from Web Server');
        response.end();
    } else if (parsedUrl.pathname === '/time') {
        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.write(new Date().toString());
        response.end();
    } else if (parsedUrl.pathname === '/hello') {
        const name = parsedUrl.query.fname;
        console.log(parsedUrl.query);
        console.log(parsedUrl.query.fname);
        if (!name) {
            response.writeHead(400, { 'Content-type': 'text/plain' });            
            response.end();
        } else {
            response.writeHead(200, { 'Content-type': 'text/plain' });
            response.write(`Hello ${name}`);
            response.end();
        }
    } else if (parsedUrl.pathname.startsWith('/user')) {
        const regex = new RegExp('\/user\/(.+)');
        const matches =  regex.exec(parsedUrl.pathname);
        if (!matches || !matches[1]) {
            response.writeHead(400, { 'Content-type': 'text/plain' });            
            response.end();
        }

        response.writeHead(200, { 'Content-type': 'text/plain' });
        response.write(`User Profile of ${matches[1]}`);
        response.end();
    } else {
        response.writeHead(404, { 'Content-type': 'text/plain' });
        response.end();
    }
}

const server = http.createServer(handler);

server.listen(3000);

