// ## CONCAT (Exercise 8 of 17)  

//   Create a new file called concat.js.  

//   You will be given text on process.stdin, convert buffer to string and  
//   reverse it using the concat-stream module before writing it to  
//   process.stdout.  

//   concat-stream is a writable stream that concatenate all buffers from a  
//   stream and give you the result in the callback you pass like parameter.  

//   Here's an example that uses concat-stream to buffer POST content in order  
//   to JSON.parse() the submitted data:  

//      const concat = require('concat-stream')  
//      const http = require('http')  

//      const server = http.createServer(function (req, res) {  
//        if (req.method === 'POST') {  
//          req.pipe(concat(function (body) {  
//            const obj = JSON.parse(body)  
//            res.end(Object.keys(obj).join('\n'))  
//          }));  
//        }  
//        else res.end()  
//      });  
//      server.listen(5000)  

//   In your adventure you'll only need to buffer input with concat() from  
//   process.stdin.  

//   Make sure to npm install concat-stream in the directory where your  
//   solution file is located.  

//  ## Hint:  

//   Both process.stdout and concat-stream are writeable streams, so they can't  
//   be piped together.  

//   To verify your solution run:  

//      $ stream-adventure verify concat.js  

const concat = require('concat-stream')

process.stdin.pipe(concat(body => {
    reversedString = body.toString().split('').reverse().join('');
    process.stdout.write(reversedString);
}));