const express = require('express');
const { getDriverDataByReportNumber } = require('../db/driver');
const driverRouter = express.Router();


driverRouter.get('/:reportNumber', async (req, res, next) => {
    const {reportNumber} = req.params; 
    try {
      const driverData = await getDriverDataByReportNumber(reportNumber);
      res.send(driverData);
  
    } catch (error) {
      throw error;
    }
  });

  module.exports = driverRouter;