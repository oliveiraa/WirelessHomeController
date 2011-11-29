var sensor = function(){

  function lnkClick(lnk) {
    var sensorId = $(lnk).attr('data-sensor-id');
    var dispNome = $(lnk).attr('data-dispositivo-nome');
    $.mobile.changePage('/dispositivos/criar/' + sensorId + '/' + dispNome, {allowSamePageTransition: true, transition: 'slideup'});
  };

  return {
    initialize: function(){
      $('body').on('click','.liDisp',function(){
        lnkClick(this);
      });
    }
  };
}();

$(function() {
  sensor.initialize();
});
