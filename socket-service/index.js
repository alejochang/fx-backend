var express = require('express');
var socket = require('socket.io');
var rateGenerator = require('../common-service/rate.service');

var app = express();
var server = app.listen(8, function(){
 console.log('listening to requests on port 8');
});

//Socket setup
var io = socket(server);
var interval;
var currencyISO;

io.on('connection', function(connectedSocket){
    console.log('Made socket connection: ' + connectedSocket.id);

    connectedSocket.on('init_rates', function(){
        console.log('::Initializing rate generation');
        startRateGeneration();
    });

    connectedSocket.on('stop_rates', function(){
        console.log('::Stopping rate generation');
        stopRateGeneration();
    });

    connectedSocket.on('currency', function(data){
        console.log('Receiving currency change: ' + data.message + ' - ' + data.handle);
        currencyISO = data.currency
        startRateGeneration();

    });
});


const startRateGeneration = () => {
    if(!interval){
        interval = setInterval(function(){
            io.sockets.emit('rate', {
                rate: rateGenerator.newRate()
            });
        }, 100);
    }
}

const stopRateGeneration = () => {
    if(interval){
        clearInterval(interval);
        interval = false;
    }
}
