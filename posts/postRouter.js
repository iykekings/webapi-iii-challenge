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

router.get('/:id', validatePostId, async (req, res) => {
	const id = req.params.id;

	Post.getById(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: `Unable to retrieve post with id ${id}` });
		});
});

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
