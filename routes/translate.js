
const express = require('express');
const router = express.Router();

const TITLE = 'Translate - GCP Trial';


router.get('/', function(req, res, next) {
  const local = {
    title: 'GCP Trial',
    data: {}
  };

  res.render('translate/index', local);
});


module.exports = router;

