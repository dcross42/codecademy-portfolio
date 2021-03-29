const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');
const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const meetingRouter = express.Router();

module.exports = meetingRouter;

meetingRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});
meetingRouter.post('/', (req, res, next) => {
    let success = addToDatabase('meetings', createMeeting());
    if(!success){
        res.status(500);
    }
    else{
        res.status(201).send(success);
    }
});

meetingRouter.delete('/', (req, res, next) => {
    let success = deleteAllFromDatabase('meetings');
    if(!success){
        res.status(500);
    }
    else{
        res.status(204).send();
    }
});