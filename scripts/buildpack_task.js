#!/usr/bin/env node

'use strict';

const debug = require('debug')('node-js-gcp-trial:scripts:buildpack_task');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const async = require('async');


const download_cloudfront_certificate = (callback) => {
  const GCP_CERT_FILE_NAME = process.env.GCP_CERT_FILE_NAME;

  const CERTIFICATE_AWS_ACCESS_KEY_ID     = process.env.CERTIFICATE_AWS_ACCESS_KEY_ID;
  const CERTIFICATE_AWS_SECRET_ACCESS_KEY = process.env.CERTIFICATE_AWS_SECRET_ACCESS_KEY;

  const s3 = new AWS.S3({
    accessKeyId: CERTIFICATE_AWS_ACCESS_KEY_ID,
    secretAccessKey: CERTIFICATE_AWS_SECRET_ACCESS_KEY
  });

  const payload = {
    bucket: 'certificate.tayutaedomo.net',
    dest_dir_path: path.join(__dirname, '..', 'etc', 'google-cloud'),
    pk_data: null,
    rsa_data: null
  };

  async.waterfall([
    callback => {
      const params = {
        Bucket: payload.bucket,
        Key: `google-cloud/${GCP_CERT_FILE_NAME}`
      };

      s3.getObject(params, (err, data) => {
        debug(params, data);
        payload.rsa_data = data;
        callback(err);
      });
    },
    callback => {
      if (! payload.rsa_data) return callback();

      const dest_path = path.join(payload.dest_dir_path, GCP_CERT_FILE_NAME);
      debug('fs.writeFile', dest_path);

      fs.writeFile(dest_path, payload.rsa_data.Body, (err, data) => {
        if (err) {
          callback(err);
        } else {
          console.log(`Create file successfully. ${dest_path}`);
          callback();
        }
      });
    }
  ], err => {
    callback(err, payload);
  });
};


if (require.main === module) {
  console.log('Run buildpack_task_trial');
  console.log('[LOG] env.HOME', process.env.HOME);
  console.log('[LOG] env.NODE_ENV', process.env.NODE_ENV);
  console.log('[LOG] env.BUILDPACK_TASK_DUMMY', process.env.BUILDPACK_TASK_DUMMY);
  console.log('[LOG] __dirname', __dirname);

  download_cloudfront_certificate((err, payload) => {
    if (err) {
      console.error(err.stack || err);
      process.exit(1);

    } else {
      process.exit(0);
    }
  });
}

