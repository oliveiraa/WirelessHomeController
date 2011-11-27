var index = function(){

  function CarregaMenu() {
    var $menu = $('#ulMenu');
    CarregaSensores($menu);
  };

  function CarregaSensores($menu){
    $.getJSON('/sensor.json',function(data){
      if(data.length > 0)
        $menu.append('<li data-role="list-divider">Sensores</li>');
      $(data).each(function(index, item){
        $menu.append('<li><a href="/sensor/'+ item._id +'">' + item.Nome + '</a></li>');
      });
      $menu.listview('refresh');
    });
  };

  return {
    initialize: function(){
      CarregaMenu();
    }
  };
}();

$(function(){
  index.initialize();
})
