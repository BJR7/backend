var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', { title: 'API' });
});

/* GET home page. */
router.get('/admin_page', function(req, res, next) {
  res.render('index', { title: 'Admin Page' });
});

module.exports = router;
