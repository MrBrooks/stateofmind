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
  var main_slider = new MainSlider();
  var play_btn = new PlayButton();
  var projectSlider = new ProjectSlider();
  var pressSlider = new PressSlider();
  var tabs = new Tabs();
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

function PlayButton(){
  var btn, borders;

  function init(){
    btn = $('.play-btn');
    if(btn.length){
      borders = $('.borders');
      btn.hover(onMouseIn, onMouseOut);
    }
  }

  function onMouseIn(){
    borders.addClass('hover');
  }
  function onMouseOut(){
    borders.removeClass('hover');
  }

  init();
}

function MainSlider(){
  var slider, slides, current, next_btn, delay, last_scroll, count, anim_flag, temp;

  function init(){
    slider = $('.main-slider');
    if(slider.length){
      slides = slider.find('.main-slider__slide');
      next_btn = slider.find('.main-slider__next');
      count = slides.length;
      current = 0;
      delay = 750;
      anim_flag = false;
      next_btn.on('click', next);
      // $(document).on('wheel', onMouseWheel);
      document.addEventListener("wheel", onMouseWheel, false);
      // slider.on('touchstart', function(e){
      //   console.log(e);
      // });
    }
  }

  function next(){
    if(current === count - 1){
      return 0;
    } else{
      slides.eq(current).removeClass('active');
      ++current;
    }
    slides.eq(current).addClass('active');
  }

  function prev(){

    if(current === 0){
      return 0;
    } else{
      slides.eq(current).removeClass('active');
      --current;
    }
    slides.eq(current).addClass('active');
  }


  function onMouseWheel(e){
    // console.log(e);
    if(!anim_flag){
      if(e.deltaY < 0){
        anim_flag = true;
        prev();
      }
      if(e.deltaY > 0){
        anim_flag = true;
        next();
      }
      if(e.deltaY !== 0){
        setTimeout(function(){
          anim_flag = false;
        },delay);
      }
    }
  }

  init();
}

function ProjectSlider(){
  var slider, slides, dots_wrapper, next, prev, backgrounds, count, dots, current, visible_count;

  function init(){
    slider = $('.projects-slider');
    if(slider.length > 0){
      slides = slider.find('.projects-slider__item');
      backgrounds = slider.find('.projects-slider__background');
      dots_wrapper = slider.find('.projects-slider__dots');
      next = slider.find('.projects-slider__next');
      prev = slider.find('.projects-slider__prev');
      count = backgrounds.length;
      current = 0;
      visible_count = 5;
      dots = [];
      addDots();

      next.on('click', Next);
      prev.on('click', Prev);
    }
  }

  function addDots(){
    for(var i = 0; i < count; i++){
      dots_wrapper.append($('<div class="projects-slider__dot"></div>'));
    }
    dots = dots_wrapper.children();
    // dots.eq(0).addClass('active');
    updateDots();
  }

  function Next(){
    current = (current+1) % count;
    updateDots();
    updateSlide();
    updateBackground();
  }

  function Prev(){
    if(current === 0){
      current = count - 1;
    } else{
      --current;
    }
    updateDots();
    updateSlide();
    updateBackground();
  }

  function updateDots(){
    var temp, half;
    if(count < visible_count){
      visible_count = count;
    }
    half =  visible_count / 2;
    dots.removeClass('active next prev');
    dots.eq(current).addClass('active');
    for(var i = 1; i <= half; i++){
      dots.eq(current + i).addClass('next');
      dots.eq(current - i).addClass('prev');
    }
  }

  function updateSlide(){
    slides.removeClass('active');
    slides.eq(current).addClass('active');
  }

  function updateBackground(){
    backgrounds.removeClass('active');
    backgrounds.eq(current).addClass('active');
  }

  init();
}

function Tabs(){
  var tabs, pags, numbers, current, items;

  function init() {
    tabs = $('.tabs');
    if(tabs.length > 0){
      pags = tabs.find('.tabs__pagination-item');
      numbers = tabs.find('.tabs__number');
      items = tabs.find('.tabs__item');
      current = 0;

      pags.on('click', onPagClick);
    }
  }

  function onPagClick(){
    var index = parseInt($(this).attr('data-index'));
    if(current !== index){
      current = index;
      pags.removeClass('active');
      numbers.removeClass('active');
      items.removeClass('active');
      pags.eq(current).addClass('active');
      numbers.eq(current).addClass('active');
      items.eq(current).addClass('active');
    }
  }

  init();
}

function PressSlider(){
  var slider, next, logos, prev, slide, current, count;

  function init(){
    slider = $('.press-slider');
    if(slider.length > 0){
      prev = slider.find('.press-slider__prev');
      next = slider.find('.press-slider__next');
      slide = slider.find('.press-slider__item');
      logos = slider.find('.press-slider__logo');
      current = 0;
      count = slide.length;

      prev.on('click', onPrevClick);
      next.on('click', onNextClick);
    }
  }

  function onPrevClick(){
    current = current === 0? count - 1 : current - 1;
    updateLogo();
    updateSlide();
  }

  function onNextClick(){
    current = (current+1) % count;
    updateLogo();
    updateSlide();
  }

  function updateLogo(){
    logos.removeClass('active');
    logos.eq(current).addClass('active');
  }
  function updateSlide(){
    slide.removeClass('active');
    slide.eq(current).addClass('active');
  }

  init();
}