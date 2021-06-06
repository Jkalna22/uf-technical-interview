const express = require("express");
const {
  getAllCrashEventData,
  getCrashDataByReportNumber,
} = require("../db/crashEvent");
const crashEventRouter = express.Router();

crashEventRouter.get("/", async (req, res, next) => {
  try {
    const crashEventData = await getAllCrashEventData();
    res.send(crashEventData);
  } catch (error) {
    throw error;
  }
});

crashEventRouter.get("/:reportNumber", async (req, res, next) => {
  const { reportNumber } = req.params;
  try {
    const crashEventData = await getCrashDataByReportNumber(reportNumber);
    res.send(crashEventData);
  } catch (error) {
    throw error;
  }
});

module.exports = crashEventRouter;
