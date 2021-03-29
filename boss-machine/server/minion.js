const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');
const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');


const minionRouter = express.Router();

module.exports = minionRouter;

minionRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    }
    else{
        res.status(404).send();
    }
});

minionRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

minionRouter.post('/',  (req, res, next) => {
    let success = addToDatabase('minions', req.body);
    res.status(201).send(success);
});

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionRouter.put('/:minionId', (req, res, next) => {
    let success = updateInstanceInDatabase('minions', req.body);
    
    res.send(success);
});

minionRouter.delete('/:minionId', (req, res, next) => {
    let success = deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});