let envelopes = [];

function envelopeFactory(category, budget){
    return {
        category: category,
        budget: budget
    };
}


function getEnvelope(id){
    if(id < 0 || id > envelope.length - 1){
        throw new Error('Invalid ID');
    }
    return envelopes[id];
}

function insertNewEnvelope(obj){
    envelopes.push(envelopeFactory(obj.category, obj.budget));
}

function editEnvelope(id, obj){
    try{
        let envelope = getEnvelope(id);
        envelope.category = obj.category;
        envelope.budget = obj.budget; 
        return envelope;
    }catch(e){
        throw e;
    }
    
}

module.exports = {
    editEnvelope,
    insertNewEnvelope,
    getEnvelope
};