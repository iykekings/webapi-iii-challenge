const router = require('express').Router();
const Post = require('./postDb');

router.get('/', (req, res) => {
  Post.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to retrieve posts' });
    });
});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
