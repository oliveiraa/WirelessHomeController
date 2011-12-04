var geral = function(){

  //Configuacao de Xbees
  var addressSala = "00 13 a2 00 40 6f b7 ac";

  //Configuracao de portas
  var portaLampadaSala = "D3";

  //Valor padrao para porta digital ligada no xbee
  var DigitalLiga = 5;
  //Valor padrao para porta digital desligada no xbee
  var DigitalDesliga = 4;

  function InitializePages() {

  }

  return {
    initialize: function() {

    }
  }
}();

$('#index').live('pageinit', function(event) {
  index.initialize();
});

$('#DispositivosCriar').live('pageinit', function(event) {
  DispositivosCriar.initialize();
});

$('#DispositivosEditar').live('pageinit', function(evet) {
  DispositivosEditar.initialize();
});

$('#SensorCriar').live('pageinit', function(event) {
  SensorCriar.initialize();
});

$('#SensorSensor').live('pageinit', function(event) {
  SensorSensor.initialize();
});

$('#SensorSensores').live('pageinit', function(event) {
  SensorSensores.initialize();
});

$('#GerenciarSensor').live('pageinit', function(event){
  GerenciarSensor.initialize();
});
