/*
 * Reference: https://googleapis.dev/nodejs/datastore/latest/index.html#using-the-client-library
 */

// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

// Reference: https://googleapis.dev/nodejs/datastore/latest/Datastore.html
// Creates a client
const datastore = new Datastore({
    //projectId: 'your-project-id',
    keyFilename: process.env['DATASTORE_CREDENTIALS']
});

async function quickstart() {
  // The kind for the new entity
  const kind = 'Task';

  // The name/ID for the new entity
  const name = 'sampletask1';

  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: 'Buy milk',
    },
  };

  // Saves the entity
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}

quickstart();
