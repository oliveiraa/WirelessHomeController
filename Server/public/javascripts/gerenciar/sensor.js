var GerenciarSensor = function(){

  var socket;

  function InitializeEvents() {
    socket = io.connect('http://localhost:3000');
  };
  
  function InitializeSensor() {
    GetSensor();
  };

  function GetSensor() {
    var nomeSensor = $('#hdNomeSensor').val();
    $.get('/sensor.json/' + nomeSensor, function(data) {
        var sensor = data;
        for(i = 0; i < sensor.Dispositivos.length; i++) {
          var dispositivo = sensor.Dispositivos[i];
          dispositivo.htmlId = dispositivo.Nome.split(' ')[0] + i;
          if(dispositivo.Tipo === 'Digital')
            CarregaDispositivoDigital(dispositivo);
        };
    });
  };
  
  function CarregaDispositivoDigital(dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "";
    html += "<label for='" + dispositivo.htmlId + "'>" + dispositivo.Nome + "</label>";
    html += "<select id='" + dispositivo.htmlId + "' data-role='slider'>";
    html += " <option value='false'>Desligado</option>"    
    html += " <option value='true'>Ligado</option>"
    html += "</select>";
    $div.append(html);
    var $disp = $('#' + dispositivo.htmlId);
    $disp.slider();
    $disp.on('change', function(event, ui){
      socket.emit('EnviaMensagemSensor', {porta: dispositivo.Porta});
    });
  };

  return {
    initialize: function(){
      InitializeEvents();
      InitializeSensor();
    }
  };
}();
