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

/* Слайдер для блока tab */
var mySwiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
  }, 
  autoplay: {
    delay: 4000,
  },
  loop: true,
});

/* Слайдер для блока slider */
var mySwiper = new Swiper('.swiper-container-tab', {
  // pagination: {
  //   el: '.swiper-pagination-tab',
  //   clickable: true, 
  // },  
  loop: true,
});

/* маска формы телефона */
$("#phone").mask("8(999) 999-9999");