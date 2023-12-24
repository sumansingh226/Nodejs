const http = require("http");
const { system } = require("nodemon/lib/config");

const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/") {
        res.setHeader("Content-type", "text/html");
        res.write("<html");
        res.write("<h1>Home Page</h1");
        res.write("</html");
    } else {
        res.setHeader("Content-type", "text/html");
        res.write("<html");
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Login Form</title>
        </head>
        <body>     
        <h2>Login</h2>     
        <form action="/submit" method="post">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <div>
            <input type="submit" value="Submit">
          </div>
        </form>
        
        </body>
        </html>
        `);
        res.write("</html");
    }

    res.end();
});

server.listen(4000);
