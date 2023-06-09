// ## HTTP CLIENT (Exercise 10 of 17)  

//   Send an HTTP POST request to (http://localhost:8099) and pipe  
//   process.stdin into it. Pipe the response stream to process.stdout.  

//   You can use the http module in node core, specifically the request method,  
//   to solve this challenge.  

//   Here's an example to make a POST request using http.request():  

//      const { request } = require('http')  

//      const options = { method: 'POST' }  
//      const req = request('http://beep.boop:80/', options, (res) => {  
//        /* Do something with res*/  
//      })  

//   Hint: The req object that you get back from request() is a writable stream  
//   and the res object in the callback function is a readable stream.  

const { request } = require('http')

const options = { method: 'POST' }
const req = request('http://localhost:8099', options, (res) => {
    res.pipe(process.stdout);
});
console.log(`Request: ${req}`);
process.stdin.pipe(req);

req.on('error', err => console.error(err))

// const { request } = require('http')

// const options = { method: 'POST' }
// const req = request('http://localhost:8099', options, (res) => {
//     res.pipe(process.stdout)
// })
// process.stdin.pipe(req)