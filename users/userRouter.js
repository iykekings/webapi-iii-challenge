const router = require('express').Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const id = req.params.id;

  const user = await User.getById(id);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: 'Invalid user ID' });
  }
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing user data' });
  } else if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: 'Missing required name field' });
  }
}

function validatePost(req, res, next) {}

module.exports = router;
