const express = require('express');
const { getAllCrashEventData } = require('../db/crashEvent');
const crashEventRouter = express.Router();


crashEventRouter.get('/', async (req, res, next) => {
    try {
      const crashEventData = await getAllCrashEventData();
      res.send(crashEventData);
  
    } catch (error) {
      throw error;
    }
  });

  module.exports = crashEventRouter;