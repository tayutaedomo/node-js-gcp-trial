
const express = require('express');
const router = express.Router();

const debug = require('debug')('node-js-gcp-trial:routes:speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const gcp_service = require('../services/gcp');


router.get('/text_to', function(req, res, next) {
  const local = {
    title: 'Text-to-Speech',
    data: {}
  };

  res.render('speech/text_to', local);
});

router.post('/text_to', function(req, res, next) {
  const local = {
    title: 'Text-to-Speech',
    data: {}
  };

  const client = new textToSpeech.TextToSpeechClient({
    projectId: gcp_service.get_project_id(),
    keyFilename: gcp_service.get_key_file_path()
  });

  const text = req.body.text;

  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  debug('text_to:request', request);

  client.synthesizeSpeech(request).then(result => {
    debug(JSON.stringify(result, null, 2));
    local.data.result = result;

  }).catch((err) => {
    console.error(err.stack || err);

    local.data.error = err.message;

  }).finally(() => {
    res.render('speech/text_to', local);
  });
});


module.exports = router;

