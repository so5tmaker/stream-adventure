// ## HTTP SERVER (Exercise 9 of 17)  

//   In this challenge, write an http server that uses a through stream to  
//   write back the request stream as upper-cased response data for POST  
//   requests.  

//   Streams aren't just for text files and stdin/stdout. Did you know that  
//   http request and response objects from node core's http.createServer()  
//   handler are also streams?  

//   For example, we can stream a file to the response object:  

//      const http = require('http')  
//      const fs = require('fs')  
//      const server = http.createServer(function (req, res) {  
//        fs.createReadStream('file.txt').pipe(res)  
//      });  
//      server.listen(process.argv[2])  

//   This is great because our server can respond immediately without buffering  
//   everything in memory first.  

//   We can also stream a request to populate a file with data:  

//      const http = require('http')  
//      const fs = require('fs')  
//      const server = http.createServer(function (req, res) {  
//        if (req.method === 'POST') {  
//          req.pipe(fs.createWriteStream('post.txt'))  
//        }  
//        res.end('beep boop\n')  
//      });  
//      server.listen(process.argv[2])  

//   You can test this post server with curl:  

//      $ node server.js 8000 &  
//      $ echo hack the planet | curl -d@- http://localhost:8000  
//      beep boop  
//      $ cat post.txt  
//      hack the planet  

//   Your http server should listen on the port given at process.argv[2] and  
//   convert the POST request written to it to upper-case using the same  
//   approach as the TRANSFORM example.  

//   As a refresher, here's an example with the default through2 callbacks  
//   explicitly defined:  

//      const through = require('through2');  
//      process.stdin.pipe(through(write, end)).pipe(process.stdout);  

//      function write (buf, _, next) {  
//        this.push(buf);  
//        next();  
//      }  
//      function end (done) { done(); }  

//   Do that, but send upper-case data in your http server in response to POST  
//   data.  

//   Make sure to npm install through2 in the directory where your solution  
//   file lives.  

const through = require('through2');
const http = require('http');
const port = process.argv[2];

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(through(function (buf, _, next) {
            // If you want to ACCESS the THIS value of the current context, USE NON-ARROW FUNCTIONS instead.
            this.push(buf.toString().toUpperCase());
            next();
        })).pipe(res);
    } else res.end("Error: Only POST method is allowed.");
});

server.listen(port, () => console.log(`Server listens on port ${port}`));

// Here's the official solution in case you want to compare notes:

// ─────────────────────────────────────────────────────────────────────────────

// const http = require('http')
// const through = require('through2')

// const server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         req.pipe(through(function (buf, _, next) {
//             this.push(buf.toString().toUpperCase())
//             next()
//         })).pipe(res)
//     } else res.end('send me a POST\n')
// })
// server.listen(parseInt(process.argv[2]))