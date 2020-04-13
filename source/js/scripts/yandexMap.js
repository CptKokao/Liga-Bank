
/* eslint-disable */
'use strict';

/* Yandex map */
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map('map', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.58873129, 56.70376289],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 3,
    controls: ['zoomControl', 'geolocationControl'],
    behaviors: ['drag'],
  });

  // Функция, которая по состоянию чекбоксов в меню
  // показывает или скрывает геообъекты из выборки.
  function checkState() {
    var shownObjects;
    var byCity = new ymaps.GeoQueryResult();

    // Отберем объекты по форме.
    if ($('#rus').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "RUS"');
    }
    if ($('#cng').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "CNG"').add(byCity);
    }
    if ($('#euro').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "EURO"').add(byCity);
    }

    // Мы отобрали объекты по цвету и по форме. Покажем на карте объекты,
    // которые совмещают нужные признаки.
    shownObjects = byCity.addToMap(myMap);
    // Объекты, которые не попали в выборку, нужно убрать с карты.
    myObjects.remove(shownObjects).removeFromMap(myMap);
  }

  $('#rus').click(checkState);
  $('#cng').click(checkState);
  $('#euro').click(checkState);

  // Создадим объекты из их JSON-описания и добавим их на карту.
  window.myObjects = ymaps.geoQuery({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.75897861, 37.6158744],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [58.59281591, 49.66310862],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.55538262, 46.059593],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: './img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',

      geometry: {
        type: 'Point',
        coordinates: [57.18885551, 65.57131175],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.00336661, 73.30568675],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [59.94241846, 30.2392805],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [40.36391621, 49.83888987],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [41.29850313, 69.30666331],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [53.87639833, 27.55861644],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [43.22421706, 76.90920237],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [48.9644317, 2.29006175],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [50.05179937, 14.50685862],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.61013852, -0.08298513],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [42.05625121, 12.6611555],
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO',
      },
    },
    ],
  }).addToMap(myMap);
}