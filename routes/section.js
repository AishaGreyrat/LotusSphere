// routes/register
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('section');
});


module.exports = router;