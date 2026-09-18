// raw server.js (No NPM needed)
const http = require("http"); //Built in module

const server = http.createServer((req, res) => {
//reg: Incoming request {method, url, headers}
// res: Outgping response {write, end}

if (req.method === 'GET' && req.url === '/') { 
    //Manual route check
    res.writeHead(200, { 'Content-Type': 'text/plain' }); //Manual headers
    res.end('Hello from Raw Node.js!'); //send body and close
}else{
    res.writeHead(404, { 'Content-Type': 'text/plain' }); 
    res.end('Not Found :(');//Basic Error
}
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Raw server Running on http://localhost:${PORT}');
})
