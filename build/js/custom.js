/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

(function(){

var class_trigger;

$(window).load(function(){
  class_trigger = new classTrigger();
});

$(document).ready(function() {
  var menu = new Menu();
  var lang = new LangSwitcher();
});


function Menu(){
  var menu_btn, state = 0, menu, body;

  function init(){
    body = $('html, body');
    menu_btn = $('.menu-btn');
    menu = $('.menu');

    menu_btn.on('click', onClick);
  }

  function onClick(){
    if(state === 0){
      menuOpen();
    } else{
      menuClose();
    }
  }

  function lockScroll(){
    body.addClass('no-scroll');
  }
  function allowScroll(){
    body.removeClass('no-scroll');
  }

  function menuOpen(){
    menu_btn.addClass('open');
    menu.addClass('open');
    class_trigger.on('menu');
    setTimeout(function(){
      menu_btn.addClass('cross');
      state = 1;
    },500);
    lockScroll();
  }

  function menuClose(){
    menu_btn.removeClass('cross');
    menu.removeClass('open');
    class_trigger.off('menu');
    setTimeout(function(){
      menu_btn.removeClass('open');
      state = 0;
    },500);
    allowScroll();
  }

  init();
}
function LangSwitcher(){
  var langs;

  function init() {
    langs = $('.lang-switcher__lang');
    langs.on('click',onClick);
  }

  function onClick() {
    langs.removeClass('active');
    $(this).addClass('active');
  }

  init();
}

})();

function classTrigger(){
  var elements, triggers;

  function init(){
    triggers = {};
    elements = $('[data-class]');
    elements.each(initEach);
  }

  function initEach(){
    var elem = $(this);
    var delay = parseInt(elem.attr('data-class-delay')),
      data_class = elem.attr('data-class'),
      trigger = elem.attr('data-class-trigger');
    if(trigger){
      addTrigger(trigger, elem, data_class, delay);
    } else{
      setTimeout(function(){
        elem.addClass(data_class);
      }, delay);
    }
  }

  function addTrigger(trigger, elem, data_class, delay){
    if(!triggers.hasOwnProperty(trigger)){
      triggers[trigger] = [];
    }
    triggers[trigger].push({el:elem, class: data_class, delay: delay});
  }

  this.on = function(trigger){
    if(triggers.hasOwnProperty(trigger)){
      var l = triggers[trigger].length;
      for(var i = 0; i < l; i++){
        setTimer(triggers[trigger][i]);
      }
    }
  };

  this.off = function(trigger){
    if(triggers.hasOwnProperty(trigger)){
      var l = triggers[trigger].length;
      for(var i = 0; i < l; i++){
        triggers[trigger][i].el.removeClass(triggers[trigger][i].class);
      }
    }
  };


  function setTimer(item){
    setTimeout(function(){
      item.el.addClass(item.class);
    }, item.delay);
  }

  init();
}