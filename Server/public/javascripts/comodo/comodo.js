var socket = '';

$(function(){
  $('#chkLampadaOnOff').click(LampadaOnOffClicked);
  socket = io.connect('http://localhost:3000');
  socket.on('RespostaEnviaMensagemSensor', RecebeDados);
  socket.on('BridgeRecebeDados', RecebeDados);
})

function LampadaOnOffClicked(){
  var valor = 0;
  if($('#chkLampadaOnOff').is(':checked'))
    valor = DigitalLiga;
  else
    valor = DigitalDesliga;
    
  var evento = { address: addressSala, porta: portaLampadaSala, valor: valor};
  console.log('Enviando Evento : ' + evento.toString());
  socket.emit('EnviaMensagemSensor', evento);
}

function RecebeDados(data){
  console.log(data);  
}
