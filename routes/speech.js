
const express = require('express');
const router = express.Router();

const debug = require('debug')('node-js-gcp-trial:routes:speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const gcp_service = require('../services/gcp');
const Datauri = require('datauri');


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

  const client = new_client();
  const text = req.body.text;
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  debug('text_to:request', request);

  client.synthesizeSpeech(request).then(result => {
    //debug(JSON.stringify(result, null, 2));
    local.data.result = JSON.stringify(result);

    if (! result || ! result[0]) return;

    local.data.datauri = new Datauri();
    local.data.datauri.format('.mp3', result[0].audioContent);

    debug(local.data.datauri);

  }).catch((err) => {
    console.error(err.stack || err);

    local.data.error = err.message;

  }).finally(() => {
    res.render('speech/text_to', local);
  });
});


router.get('/voices', function(req, res, next) {
  const local = {
    title: 'Voices List',
    data: {}
  };

  const client = new_client();
  client.listVoices({}).then(result => {
    local.data.result = JSON.stringify(result, null, 2);

  }).catch(err => {
    console.error(err.stack || err);
    local.data.error = err;

  }).finally(() => {
    res.render('speech/voices', local);
  });
});


const new_client = () => {
  return new textToSpeech.TextToSpeechClient({
    projectId: gcp_service.get_project_id(),
    keyFilename: gcp_service.get_key_file_path()
  });
};


module.exports = router;

