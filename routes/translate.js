
const express = require('express');
const router = express.Router();


const debug = require('debug')('node-js-gcp-trial:routes:translate');
const path = require('path');
const {Translate} = require('@google-cloud/translate');

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

  const project_id = process.env.GCP_PROJECT_ID || '';
  const key_file_name = process.env.GCP_CERT_FILE_NAME || '';
  const key_path = path.join(__dirname, '..', 'etc', 'google-cloud', key_file_name);

  const translate = new Translate({
    projectId: project_id,
    keyFilename: key_path
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
