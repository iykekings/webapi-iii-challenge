const express = require('express');

const server = express();
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const loggedData = {
    method: req.method,
    url: req.url,
    timestamp: new Date()
  };
  console.log(loggedData);
  next();
}

module.exports = server;

// const userRouter = require('./users/userRouter');
// const postRouter = require('./posts/postRouter');

// server.use('/api/users', userRouter);
// server.use('/api/posts', postRouter);
