const express = require('express');
const router = express.Router();

const index = require('./index');

router.use('/', index);

module.exports = router;