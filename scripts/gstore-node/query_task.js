/*
 * Reference: https://sebloix.gitbook.io/gstore-node/
 */

const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore({
    keyFilename: process.env['DATASTORE_CREDENTIALS']
});

const { Gstore } = require('gstore-node');
const gstore = new Gstore({
  cache: false,
  errorOnEntityNotFound: false,
});

gstore.connect(datastore);


const Schema = gstore.Schema;

const taskSchema = new Schema({
  description: { type: String, excludeFromIndexes: true },
  created: { type: Date, excludeFromIndexes: false },
  done: { type: Boolean, excludeFromIndexes: false },
});

const Task = gstore.model('Task', taskSchema);

async function query() {
  console.log(await Task.list());

  const options = {
    filters : ['done', '=', () => false],
  };
  console.log(await Task.list(options));
}

query()
