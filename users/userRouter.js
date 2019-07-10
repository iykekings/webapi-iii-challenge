const router = require('express').Router();
const User = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
	const { name } = req.body;
	User.insert(name)
		.then(data => {
			User.getByID(data.id).then(data => {
				res.status(201).json(data);
			});
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to add user to the database' });
		});
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  User.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json({message: 'Unable to retrieve users.'})
  })
});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
	const { id } = req.params.id;
	if (isNaN(parseInt(id))) {
		res.status(400).json({
			message: 'The ID must be a number. Please check the ID and try again.'
		});
	} else {
		const user = await user.getByID(id);

		if (user) {
			req.user = user;
			next();
		} else {
			res.status(400).json({ message: 'Invalid user ID' });
		}
	}
}

function validateUser(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'Invalid user ID' });
	} else if (req.body.name) {
		next();
	} else {
		res.status(400).json({ message: 'Missing required name field' });
	}
}

function validatePost(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'Missing post data' });
	} else if (req.body.text) {
		next();
	} else {
		res.status(400).json({ message: 'Missing required text field' });
	}
}

module.exports = router;
