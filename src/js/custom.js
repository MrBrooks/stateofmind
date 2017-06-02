/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

$(window).load(function(){

});
$(document).ready(function() {

  var menu = new Menu();

});


function Menu(){
  var menu_btn, state = 0;

  function init(){
    menu_btn = $('.menu-btn');

    menu_btn.on('click', onClick);
  }

  function onClick(){
    if(state == 0){
      menuBtnOpen();
    } else{
      menuBtnClose();
    }

  }

  function menuBtnOpen(){
    menu_btn.addClass('open');
    setTimeout(function(){
      menu_btn.addClass('cross');
      state = 1;
    },500);
  }

  function menuBtnClose(){
    menu_btn.removeClass('cross');
    setTimeout(function(){
      menu_btn.removeClass('open');
      state = 0;
    },500);
  }

  init();
}
