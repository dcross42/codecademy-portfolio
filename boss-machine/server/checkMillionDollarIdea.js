const checkMillionDollarIdea = (req, res, next) => {
    let total = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if( isNaN(total)  || total < 1000000 || !req.body.numWeeks || !req.body.weeklyRevenue){
        res.status(400).send();
    }
    else{
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
