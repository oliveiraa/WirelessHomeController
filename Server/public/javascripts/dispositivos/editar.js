var DispositivosEditar = function(){

  function InitializeEvents() {
    $('#btnEditar').click(btnEditarClick);
  };

  function btnEditarClick() {
    var nomeSensor = $('#hdNomeSensor').val();
    var dispositivo = {};
    var data = {};

    dispositivo.Nome = $('#txtDispNome').val();
    dispositivo.Porta = $('#txtDispPorta').val();
    dispositivo.Descricao = $('#txtDispDescricao').val();
    dispositivo.Tipo = $('#selectTipo').val();;
    data.dispositivo = dispositivo;
    data.nomeSensor = nomeSensor;
    $.post('/dispositivos/editar', data, function(rData){
      console.log(rData);
      $.mobile.changePage('/sensor/' + nomeSensor, {allowSamePageTransition: true, transition: 'slideup'});
    });
  };

  return {
    initialize: function(){
      InitializeEvents();
    }
  };
}();
