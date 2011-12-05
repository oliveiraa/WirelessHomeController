var SensorCriar = function() {
  
  function InitializeEvents() {
    $('#btnCriar').click(btnCriarClick);
  };
  
  function btnCriarClick() {
      var sensor = {};
      sensor.Nome = $('#txtNome').val();
      sensor.Endereco = $('#txtEndereco').val();
      sensor.Descricao = $('#txtDescricao').val();
      sensor.Dispositivos = [];
      var body = {};
      body.sensor = sensor;
      $.post('/sensor/criar', body, function(data){
        $.mobile.changePage('/sensor/sensores', {allowSamePageTransition: true, transition: 'slideup'});
      });  
  };
  
  return {
    initialize: function(){
      InitializeEvents();
    }
  }
}();
