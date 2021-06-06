const express = require('express');
const apiRouter = express.Router();

const crashEventRouter = require('./crashEvent');
apiRouter.use('/crashEvent', crashEventRouter);

const vehicleRouter = require('./vehicle');
apiRouter.use('/vehicle', vehicleRouter);

const driverRouter = require('./driver');
apiRouter.use('/driver', driverRouter);

module.exports = apiRouter;