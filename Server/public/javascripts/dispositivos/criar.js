var DispositivosCriar = function(){

  function InitializeEvents() {
    $('#btnCriar').click(btnCriarClick);
  };

  function btnCriarClick() {
    var nomeSensor = $('#hdNomeSensor').val();
    var dispositivo = {};
    var data = {};

    dispositivo.Nome = $('#txtDispNome').val();
    dispositivo.Porta = $('#txtDispPorta').val();
    dispositivo.funcao = $('#txtDispFuncao').val();
    dispositivo.Descricao = $('#txtDispDescricao').val();
    dispositivo.Tipo = $('#selectTipo').val();;
    data.dispositivo = dispositivo;
    data.nomeSensor = nomeSensor;
    $.post('/dispositivos/criar', data, function(rData){
      $.mobile.changePage('/sensor/' + nomeSensor, {allowSamePageTransition: true, transition: 'slideup'});
    });
  };

  return {
    initialize: function(){
      InitializeEvents();
    }
  };
}();
