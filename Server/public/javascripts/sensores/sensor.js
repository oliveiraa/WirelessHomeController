var SensorSensor = function(){

  function InitializeEvents() {
    $('#btnDeletar').click(btnDeletarClicked);
  };
  
  function btnDeletarClicked() {
    var nome = $('#txtNome').val();
    var data = {};
    data.nome = nome;
    $.post('/sensor/deletar', data, function(d){
      $.mobile.changePage('/sensor/sensores', {allowSamePageTransition: true, transition: 'slideup'});
    });  
  };

  return {
    initialize: function(){
      InitializeEvents();
    }
  };
}();
