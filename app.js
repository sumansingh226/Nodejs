const http = require("http");
const { system } = require("nodemon/lib/config");

const server = http.createServer((req, res) => {
    console.log(req.headers, req.url, req.method)
    res.setHeader('Content-type', 'text/html')
    res.write('<html');
    res.write('<h1>Hello suman</h1')
    res.write('</html');
    res.end();
})


server.listen(4000)