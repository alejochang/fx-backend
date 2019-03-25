var express = require('express');
var router = express.Router();
var rateGenerator = require('../common-service/rate.service');

const currencies = {
    'CAD': {
        name: 'Canadian dollar',
        symbol: '$'
    },
    'GBP': {
        name: 'British pound',
        symbol: '£'
    },
    'EUR': {
        name: 'Euro',
        symbol: '€'
    },
    'USD': {
        name: 'United States dollar',
        symbol: '$'
    },
};


/* GET all available currencies*/
router.get('/', function(req, res) {
    res.send(JSON.stringify(currencies));
});
router.get('/:iso', function(req, res) {
    const currency = currencies[req.params.iso];
    res.send(JSON.stringify(currency));
});
router.get('/amount/:amount/from/:isofrom/to/:isoto/', function(req, res) {
    const currencyFrom = currencies[req.params.isofrom];
    const currencyTo = currencies[req.params.isoto];
    const amount = req.params.amount;
    const rate = rateGenerator.newRate();
    res.send(JSON.stringify({
        currencyFrom: currencyFrom,
        currencyTo: currencyTo,
        rate: rate,
        result: (amount * rate).toFixed(2)
    }));
});


module.exports = router;
