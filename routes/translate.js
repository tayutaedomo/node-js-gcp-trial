
const express = require('express');
const router = express.Router();


const debug = require('debug')('node-js-gcp-trial:routes:translate');
const path = require('path');
const {Translate} = require('@google-cloud/translate');
const gcp_service = require('../services/gcp');

const TITLE = 'Translate - GCP Trial';


router.get('/', function(req, res, next) {
  const local = {
    title: TITLE,
    data: {}
  };

  res.render('translate/index', local);
});

router.post('/', function(req, res, next) {
  const local = {
    title: TITLE,
    data: {}
  };

  const translate = new Translate({
    projectId: gcp_service.get_project_id(),
    keyFilename: gcp_service.get_key_file_path()
  });

  debug('index:req.body', req.body);

  const text = req.body.text;
  const target = 'ja';

  translate.translate(text, target).then((result) => {
    local.data.result = result;

  }).catch((err) => {
    console.error(err.stack || err);

    local.data.error = err.message;

  }).finally(() => {
    res.render('translate/index', local);
  });
});


module.exports = router;

