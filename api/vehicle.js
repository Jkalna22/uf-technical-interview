const express = require('express');
const { getVehicleDataByReportNumber } = require('../db/vehicle');
const vehicleRouter = express.Router();


vehicleRouter.get('/:reportNumber', async (req, res, next) => {
    const {reportNumber} = req.params; 
    try {
      const vehicleData = await getVehicleDataByReportNumber(reportNumber);
      res.send(vehicleData);
  
    } catch (error) {
      throw error;
    }
  });

  module.exports = vehicleRouter;