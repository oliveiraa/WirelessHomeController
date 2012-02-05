var DispositivosEditar = function(){

  function InitializeEvents() {
    $('#btnEditar').click(btnEditarClick);
    $('#btnDeletar').click(btnDeletarClick);
  };

  function btnDeletarClick() {
    var nomeSensor = $('#hdNomeSensor').val();
    var nomeDispositivo = $('#txtDispNome').val();
    var data = {};
    data.nomeSensor = nomeSensor;
    data.nomeDispositivo = nomeDispositivo;
    $.post('/dispositivos/deletar', data, function(d){
      $.mobile.changePage('/sensor/' + nomeSensor, {allowSamePageTransition: true, transition: 'slideup'});
    });
  };

  function btnEditarClick() {
    var nomeSensor = $('#hdNomeSensor').val();
    var dispositivo = {};
    var data = {};

    dispositivo.Nome = $('#txtDispNome').val();
    dispositivo.Porta = $('#txtDispPorta').val();
    dispositivo.Descricao = $('#txtDispDescricao').val();
    dispositivo.Funcao = $('#txtDispFuncao').val();
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
