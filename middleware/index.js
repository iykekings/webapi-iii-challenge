const logger = (req, res, next) => {
	const loggedData = {
		method: req.method,
		url: req.url,
		timestamp: new Date()
	};
	console.log(loggedData);
	next();
};

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

const validateUser = (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ message: 'Invalid user ID' });
	} else if (req.body.name) {
		next();
	} else {
		res.status(400).json({ message: 'Missing required name field' });
	}
};

const validatePost = (req, res, next) => {
	if (!req.body) {
		res.status(400).json({ message: 'Missing post data' });
	} else if (req.body.text) {
		next();
	} else {
		res.status(400).json({ message: 'Missing required text field' });
	}
};

module.exports = {
	logger,
	validateUserId,
	validateUser,
	validatePost
};
