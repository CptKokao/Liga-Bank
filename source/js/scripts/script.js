/* eslint-disable */
'use strict';

// polyfill swiper for IE11
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, rawPos) {
          var pos = rawPos > 0 ? rawPos|0 : 0;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

/* Слайдер для блока slider */
var mySwiper = new Swiper('#swiper1', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
  }, 
  autoplay: {
    delay: 4000,
  },
  loop: true,
});

/* Слайдер для блока tab */
var tabSwiper = new Swiper('#swiper2', {
  loop: true,
});

mySwiper.init();
tabSwiper.init();

/* маска формы телефона */
$("#phone").mask("8(999) 999-9999");