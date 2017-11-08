const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('checker');
});

router.get('*', (req, res) => {
	res.status(404).render('notfound');
});

module.exports = router;
