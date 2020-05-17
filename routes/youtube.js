
const express = require('express');
const router = express.Router();

const debug = require('debug')('node-js-gcp-trial:routes:youtube');

const {google} = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GCP_YOUTUBE_API_KEY || ''
});


router.get('/search', (req, res, next) => {
  const local = {
    title: 'Youtube Data API Search',
    data: {}
  };

  res.render('youtube/search', local);
});

router.post('/search', (req, res, next) => {
  (async () => {
    const local = {
      title: 'Youtube Data API Search',
      data: {}
    };

    try{
      const result = await youtube.search.list({
        part: 'id,snippet',
        q: req.body.q || 'ヒカキン',
      });

      debug(result);
      local.data.result = JSON.stringify(result.data, null, 2);

    } catch (e) {
      local.data.error = JSON.stringify(e, null, 2);
    }

    res.render('youtube/search', local);
  })();
});


module.exports = router;

