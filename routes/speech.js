
const express = require('express');
const router = express.Router();

const debug = require('debug')('node-js-gcp-trial:routes:translate');


router.get('/text_to', function(req, res, next) {
  const local = {
    title: 'Text-to-Speech',
    data: {}
  };

  res.render('speech/text_to', local);
});



module.exports = router;

