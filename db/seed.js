const client = require('./client');
const { buildDB } = require('./seedData');
buildDB()
    .catch(console.error)
    .finally(() => client.end());