var GerenciarSensor = function(){

  var socket;

  function InitializeEvents() {
    socket = io.connect('http://192.168.1.116:3000');
    socket.on('RecebeMensagemSensor', function(data) {
      switch(data.comando) {
        case 'LeituraDigital': {
          $.get('/sensor.json/' + data.nomeSensor, function(d) {
            var sensor = d;
            for(i = 0; i < sensor.Dispositivos.length; i++) {
              var dispositivo = sensor.Dispositivos[i];
              if(dispositivo.Nome === data.nomeDispositivo) {
                if(dispositivo.Funcao) {
                  dipositivo.Funcao(data);
                };
              };            
            };
          });
          break;
        };
        case 'LeituraAnalogica': {
          $.get('/sensor.json/' + data.nomeSensor, function(d) {
            var sensor = d;
            for(i = 0; i < sensor.Dispositivos.length; i++) {
              var dispositivo = sensor.Dispositivos[i];
              if(dispositivo.Nome === data.nomeDispositivo) {
                if(dispositivo.Funcao) {
                  dipositivo.Funcao(data);
                };
              };            
            };
          });
          break;
        };                
      };
    });
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
                CarregaDispositivoDigital(sensor,dispositivo);
                break;
              }
              case 'IncDec' : {
                CarregaDispositivoIncDec(sensor,dispositivo);
                break;
              }
              case 'Leitura' : {
                CarregaDispositivoLeitura(sensor,dispositivo);
                break;
              }
              case 'LeituraAnalogica' : {
                CarregaDispositivoLeituraAnalogica(sensor,dispositivo);
                break;
              }
          };
        };
    });
  };

  function CarregaDispositivoDigital(sensor,dispositivo) {
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
      var data = {};
      data.porta = dispositivo.Porta;
      data.endereco = sensor.Endereco;
      data.comando = 'AlteraValorDigital';
      data.id = dispositivo.htmlId;
      data.nomeSensor = sensor.nome;
      data.nomeDispositivo = dispositivo.nome;
      if($('#' + dispositivo.htmlId).val() === "false")
        data.valor = 4;
      else	
        data.valor = 5;
      socket.emit('EnviaMensagemSensor', {data: data});
    });
  };

  function CarregaDispositivoIncDec(sensor,dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<fieldset data-role='controlgroup' data-type='horizontal' id='" + dispositivo.htmlId + "'><legend>" + dispositivo.Nome + "</legend>";
    html += " <input type='radio' name='rdb' id='rdb1' value='direita' /><label for='rdb1'>Direita</label>";
    html += " <input type='radio' name='rdb' id='rdb2' value='esquerda' /><label for='rdb2'>Esquerda</label>";
    html += " <input type='radio' name='rdb' id='rdb3' value='desligado' /><label for='rdb3'>Desligado</label>";
    html += "</fieldset>";
    $div.append(html);
    $div.trigger('create');
    $("#" + dispositivo.htmlId + " input[type='radio']").on('change', function(event, ui) {
      var opcao = $($("input[type='radio']:checked , #" + dispositivo.htmlId)[1]).val();
      var data = {};
      data.nomeSensor = sensor.nome;
      data.nomeDispositivo = dispositivo.nome;
      data.comando = 'AlteraValorDigital';
      data.endereco = sensor.Endereco;
      data.id = dispositivo.htmlId;
      switch(opcao) {
        case 'direita': {
          data.porta = dispositivo.Porta.split(',')[0];
          data.valor = 4;
          socket.emit('EnviaMensagemSensor', {data: data});          
          data.porta = dispositivo.Porta.split(',')[1];
          data.valor = 5;
          socket.emit('EnviaMensagemSensor', {data: data});          
          break;
        }
        case 'esquerda': {
          data.porta = dispositivo.Porta.split(',')[0];
          data.valor = 5;
          socket.emit('EnviaMensagemSensor', {data: data});          
          data.porta = dispositivo.Porta.split(',')[1];
          data.valor = 4;
          socket.emit('EnviaMensagemSensor', {data: data});                    
          break;
        }
        case 'desligado': {
          data.porta = dispositivo.Porta.split(',')[0];
          data.valor = 4;
          socket.emit('EnviaMensagemSensor', {data: data});          
          data.porta = dispositivo.Porta.split(',')[1];
          data.valor = 4;
          socket.emit('EnviaMensagemSensor', {data: data});          
          break;
        }
      };
    });
  };

  function CarregaDispositivoLeitura(sensor,dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<label for='" + dispositivo.htmlId + "'>" + dispositivo.Nome + "</label>";
    html += "<input type='text' readonly='true' id='" + dispositivo.htmlId + "'>";
    html += "</fieldset>";
    $div.append(html);
    $div.trigger('create');
    var $disp = $('#' + dispositivo.htmlId);
    var data = {};
    data.porta = dispositivo.Porta;
    data.endereco = sensor.Endereco;
    data.comando = "AlteraValorDigital";
    data.valor = 3;
    data.id = dispositivo.htmlId;
    data.nomeSensor = sensor.nome;
    data.nomeDispositivo = dispositivo.nome;
    socket.emit('EnviaMensagemSensor', {data: data});          
    window.setInterval(function(){
      data.comando = "LerValorDigital";
      socket.emit('EnviaMensagemSensor', {data: data});          
    },1000);
  };
  
  function CarregaDispositivoLeituraAnalogica(sensor,dispositivo) {
    var $div = $('#ConteudoSensores');
    var html = "<br /><br />";
    html += "<label for='" + dispositivo.htmlId + "'>" + dispositivo.Nome + "</label>";
    html += "<input type='text' readonly='true' id='" + dispositivo.htmlId + "'>";
    html += "</fieldset>";
    $div.append(html);
    $div.trigger('create');
    var $disp = $('#' + dispositivo.htmlId);
    var data = {};
    data.porta = dispositivo.Porta;
    data.endereco = sensor.Endereco;
    data.comando = "AlteraValorDigital";
    data.valor = 2;
    data.id = dispositivo.htmlId;
    data.nomeSensor = sensor.nome;
    data.nomeDispositivo = dispositivo.nome;
    socket.emit('EnviaMensagemSensor', {data: data});          
    window.setInterval(function(){
      data.comando = "LerValorAnalogico";
      socket.emit('EnviaMensagemSensor', {data: data});          
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
