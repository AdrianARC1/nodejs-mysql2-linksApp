const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('AUTHENTICATION PAGE!!');
});

module.exports = router;