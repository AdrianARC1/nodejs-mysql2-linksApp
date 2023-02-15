const express = require('express');
const router = express.Router();
const passport = require('../lib/passport')
/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
});

router.post('/signup', (req, res, next) => {
  console.log(req.body)
  res.send("Bien")
});

module.exports = router;