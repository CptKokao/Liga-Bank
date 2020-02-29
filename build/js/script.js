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

var mySwiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },  
  autoplay: {
    delay: 4000,
  },
  loop: true,
});