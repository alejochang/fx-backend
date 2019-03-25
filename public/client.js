//Make connection

var frontEndSocket = io.connect('http://localhost:8');


//DOM
var currency = document.getElementById('currency'),
    rate = document.getElementById('rate'),
    handle = document.getElementById('handle'),
    send = document.getElementById('send');
updateRate = document.getElementById('update-rate');


send.addEventListener('click', function(){
    updateRate.checked = false;
    frontEndSocket.emit('currency', {
        message:currency.value,
        handle: handle.value
    });
});

updateRate.addEventListener('change', function(e){
    if(e.target.checked){
        frontEndSocket.emit('currency', {
            message:'stop',
            handle: handle.value
        });
    }
});

frontEndSocket.on('rate', function(data){
    rate.innerHTML = '<p><strong>' + data.currency + '</strong>: '+ data.rate +'</p>';
});
