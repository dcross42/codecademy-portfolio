const express = require('express');
const {editEnvelope,
    insertNewEnvelope,
    getEnvelope} = require('./db/db');


const app = express();


app.get('/', (req, res) => {
    res.status(200).send();
});

app.post('/envelopes', (req, res) => {
    const newEnvelope = req.body;
    console.log(req)
    let success = insertNewEnvelope(newEnvelope);
    if(success){
        res.status(201).send();
    }
    else{
        res.status(500).send();
    }
});

app.listen(process.env.NODE_ENV || 4000, () => {
    console.log('Running express server')
});


module.exports = app;