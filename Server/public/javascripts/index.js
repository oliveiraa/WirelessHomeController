var index = function(){

  function CarregaMenu() {
    var $menu = $('#ulMenu');
    CarregaSensores($menu);
    CarregarConfiguracoes($menu);
  };

  function CarregaSensores($menu){
    $.getJSON('/sensor.json',function(data){
      var tmp = '';
      if(data.length > 0)
        tmp += '<li data-role="list-divider">Sensores</li>';
      $(data).each(function(index, item){
        tmp += '<li><a href="/gerenciar/'+ item.Nome +'">' + item.Nome + '</a></li>';
      });
      $menu.append(tmp);
      $menu.listview('refresh');
    });
  };

  function CarregarConfiguracoes($menu) {
    var tmp = '';
    tmp += '<li data-role="list-divider">Configurações</li>';
    tmp += '<li><a href="/sensor/sensores">Configurar Sensores</a></li>';
    $menu.append(tmp);
    $menu.listview('refresh');
  };

  return {
    initialize: function(){
      CarregaMenu();
    }
  };
}();
