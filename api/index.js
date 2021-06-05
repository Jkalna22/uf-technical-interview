const express = require('express');
const apiRouter = express.Router();

const crashEventRouter = require('./crashEvent');
apiRouter.use('/crashEvent', crashEventRouter);

module.exports = apiRouter;