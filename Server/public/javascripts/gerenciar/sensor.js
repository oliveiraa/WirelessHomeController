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
          switch(dispositivo.Tipo) {
            case 'Digital': {
                CarregaDispositivoDigital(dispositivo);
                break;
              }
              case 'IncDec' : {
                CarregaDispositivoIncDec(dispositivo);
                break;
              }
              case 'Leitura' : {
                CarregaDispositivoLeitura(dispositivo);
                break;
              }
          };
        };
    });
  };

  function CarregaDispositivoDigital(dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<label for='" + dispositivo.htmlId + "'>" + dispositivo.Nome + "</label>";
    html += "<select id='" + dispositivo.htmlId + "' data-role='slider'>";
    html += " <option value='false'>Desligado</option>";
    html += " <option value='true'>Ligado</option>";
    html += "</select>";
    $div.append(html);
    var $disp = $('#' + dispositivo.htmlId);
    $disp.slider();
    $disp.on('change', function(event, ui) {
      socket.emit('EnviaMensagemSensor', {porta: dispositivo.Porta});
    });
  };

  function CarregaDispositivoIncDec(dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<fieldset data-role='controlgroup' data-type='horizontal' id='" + dispositivo.htmlId + "'><legend>" + dispositivo.Nome + "</legend>";
    html += " <input type='radio' name='rdb' id='rdb1' value='direita' /><label for='rdb1'>Direita</label>";
    html += " <input type='radio' name='rdb' id='rdb2' value='esquerda' /><label for='rdb2'>Esquerda</label>";
    html += " <input type='radio' name='rdb' id='rdb3' value='desligado' /><label for='rdb3'>Desligado</label>";
    html += "</fieldset>";
    $div.append(html);
    $div.trigger('create');
    var $disp = $('#' + dispositivo.htmlId);
    $("#" + dispositivo.htmlId + " input[type='radio']").on('change', function(event, ui) {
      socket.emit('EnviaMensagemSensor', {porta: dispositivo.Porta});
    });
  };

  function CarregaDispositivoLeitura(dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<label for='" + dispositivo.htmlId + "'>" + dispositivo.Nome + "</label>";
    html += "<input type='text' readonly='true' id='" + dispositivo.htmlId + "'>";
    html += "</fieldset>";
    $div.append(html);
    $div.trigger('create');
    var $disp = $('#' + dispositivo.htmlId);
    window.setInterval(function(){
      console.log("Leitura Analogica");
      //socket.emit('EnviaMensagemSensor', {porta: dispositivo.Porta});
    },1000);
  };

  return {
    initialize: function(){
      InitializeEvents();
      InitializeSensor();
      $('#GerenciarSensor').trigger('create');
    }
  };
}();
