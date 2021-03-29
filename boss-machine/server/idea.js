const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase} = require('./db');
const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideaRouter = express.Router();

module.exports = ideaRouter;

ideaRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.idea = idea;
        next();
    }
    else{
        res.status(404).send();
    }
});

ideaRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
    next();
});
ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let success = addToDatabase('ideas', req.body);
    res.status(201).send(success);
});

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});
ideaRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let success = updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(success);
});
ideaRouter.delete('/:ideaId', (req, res, next) => {
    let success = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(!success){
        res.status(404).send();
    }
    else{
        res.status(204).send(success);
    }
});