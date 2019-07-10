const router = require('express').Router();
const Post = require('./postDb');

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

async function validatePostId(req, res, next) {
	const id = req.params.id;

	const post = await Post.getById(id);

	if (post) {
		req.post = post;
		next();
	} else {
		res.status(400).json({ message: 'Invalid post ID' });
	}
}

module.exports = router;
