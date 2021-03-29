const db = require('./db');
const express = require('express');

const apiRouter = express.Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { updateInstanceInDatabase } = require('./db');

const ideaRouter = require('./idea');
const minionRouter = require('./minion');
const meetingRouter = require('./meeting');

apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);
apiRouter.use('/minions', minionRouter);

module.exports = apiRouter;
