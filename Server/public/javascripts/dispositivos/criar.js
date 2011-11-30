var criarDispositivo = function(){

  function InitializeEvents() {
    $('#btnCriar').click(btnCriarClick);
  };

  function btnCriarClick() {
    var idSensor = $('#hdIDSensor').val();
    $.get('/sensor.json/' + idSensor,function(data) {
      CriaDispositivo(data);
    });
  };

  function CriaDispositivo(sensor) {
    console.log(sensor);
  };

  return {
    initialize: function(){
      InitializeEvents();
    }
  };
}();

$('#content').live('pageinit', function(event) {
  criarDispositivo.initialize();
})
