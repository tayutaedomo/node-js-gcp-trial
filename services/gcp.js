
const path = require('path');


exports.get_project_id = () => {
  return process.env.GCP_PROJECT_ID || '';
};

exports.get_key_file_path = () => {
  const key_file_name = process.env.GCP_CERT_FILE_NAME || '';
  return path.join(__dirname, '..', 'etc', 'google-cloud', key_file_name);
};

