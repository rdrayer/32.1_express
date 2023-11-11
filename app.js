const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.get('/mean', function(req, res, next) {
    try {
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
          }
        const { nums } = req.query;
        let splitNums = nums.split(',');
        if (!splitNums.every(num => !isNaN(num))) {
            throw new ExpressError("Invalid number", 400);
        }
        splitNums = splitNums.map(function (num) {
            return parseInt(num);
        });
        let sum = splitNums.reduce(function(accum, currentVal) {
            return accum + currentVal;
        }, 0);
        let mean = sum / splitNums.length;
        console.log(mean);
        return res.json({ 
            operation: "mean",
            value: mean
        });
    } catch (err) {
     return next(err)
    }
});


app.use((error, req, res, next) => { 
    //console.log(error.message); 
    return res.status(error.status).send(error.message)
});

app.listen(3000, () => {
    console.log('server running on port 3000')
});  