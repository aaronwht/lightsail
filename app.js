// initial file which should serve out content
// run sudo node app on Lightsail to run this file
const http = require('http');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
};

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', '*'); - allow posts from anywhere - not recommended

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (['GET', 'POST', 'PUT'].indexOf(req.method) > -1) {
        req.on('data', chunk => {
            // posted data - not formatted
            console.log(chunk.toString());
        });

        res.writeHead(200, headers);
        res.end('success');
        return;
    }

    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
}).listen(process.env.PORT || 80);