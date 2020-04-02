"use strict";

const body = document.querySelector("body")
const inputRealty = document.getElementById("calc-realty");
const inputFirstpay = document.getElementById("calc-firstpay");
const inputFirstpayRange = document.getElementById("calc-firstpay-range");
const inputDateRange = document.getElementById("calc-date-range");
const inputDate = document.getElementById("calc-date");

const calcSelect = document.getElementById("calc-select");
const calcTitle = document.getElementById("calc-title");
const calcCost = document.getElementById("calc-cost");
const calcDateFirst = document.getElementById("calc-date-first");
const calcDateLast = document.getElementById("calc-date-last");
const calcFirstpayWrap = document.getElementById("calc-firstpay-wrap");

const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcRealtyError = document.getElementById("calc-realty-error");
const calcProcentValue = document.getElementById("calc-firstpay-value");
const calcFirstpayError = document.getElementById("calc-fistpay-error");

const checkboxСapital = document.getElementById("calc-extra-capital");
const checkboxKacko = document.getElementById("calc-extra-kacko");
const checkboxLife = document.getElementById("calc-extra-life");
const checkboxProject = document.getElementById("calc-extra-project");

const calcStepCheckbox = document.querySelectorAll(".calc__step-checkbox");
const calcCheckbox = document.querySelectorAll(".calc__step-checkbox input[type=checkbox]");

const offerSuccess = document.getElementById("offer-success");
const offerFailed = document.getElementById("offer-failed");
const offerFailedText = document.getElementById("offer-failed-text");
const offerSuccessText = document.getElementById("offer-success-text");

const offerBtn = document.getElementById("offer-btn");

const request = document.getElementById("request");
const requestWrap = document.getElementById("request-wrap");
const requestBtn = document.getElementById("request-btn");
const requestForm = document.getElementById("request-form");
const inputs = document.querySelectorAll(".calc__request-form input");
const formName = document.getElementById("name");
const formPhone = document.getElementById("phone");
const formEmail = document.getElementById("email");
let requestNumber = 0;
let requestTarget;

const defValue = 2000000;
const capital = 470000;

let generalSum; // стоимость недвижимости
let procentSum; // сумма первоначальный взнос
let procRate; // % первоначального взноса
let procRateMonth; // процентная ставка
let dateSum; // срок кредитования
let sumCredit; // сумма кредита(с вычитом первоначального взноса)
let payMonth; // ежемесячный платеж
let profitMonth; // ежемесячный платеж

const offerSum = document.getElementById("calc-offer-sum"); 
const offerProc = document.getElementById("calc-offer-proc"); 
const offerMonthpay = document.getElementById("calc-offer-monthpay"); 
const offerMonthprofit = document.getElementById("calc-offer-monthprofit");

/* получает ежемесячный платеж */
const getPayMonth = () => {
  let countPeriods = dateSum * 12;
  payMonth = (sumCredit * (procRateMonth / (1 - (1 / Math.pow((1 + procRateMonth),countPeriods)))))
  profitMonth = payMonth / 0.45;
  console.log(sumCredit);
  console.log(procRateMonth);
  console.log(countPeriods);
  console.log(procRate);

}

/* отображает значения для offer */
const getOffer = () => {
  if (calcSelect.value === 'Ипотечное кредитование') {
    if (sumCredit < 500000) {
      offerFailedText.textContent = `Наш банк не выдыет ипотечные кредиты меньше 500000 рублей`;
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = sumCredit;
      offerProc.textContent = procRate;
      offerMonthpay.textContent = payMonth;
      offerMonthprofit.textContent = profitMonth; 
    }
  } else 
  if (calcSelect.value === 'Автомобильное кредитование') {
    if (sumCredit < 200000) {
      offerFailedText.textContent = `Наш банк не выдыет автокредиты меньше 200000 рублей`;
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = sumCredit;
      offerProc.textContent = procRate;
      offerMonthpay.textContent = payMonth;
      offerMonthprofit.textContent = profitMonth; 
    }
  } else {
  if (calcSelect.value === 'Потребительский кредит') {
    offerSum.textContent = sumCredit;
    offerProc.textContent = procRate;
    offerMonthpay.textContent = payMonth;
    offerMonthprofit.textContent = profitMonth; 
    }
  }
}

/* сброс значения для offer */
const getOfferReset = () => {
  offerSum.textContent = "";
  offerProc.textContent = "";
  offerMonthpay.textContent = "";
  offerMonthprofit.textContent = ""; 
}

/* проверяет основную сумму на min/max и выводит сообщение в случае !valid */
const chcekSum = (target) => {
  /* Если валидность false */
  if (!target.validity.valid) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      calcRealtyError.textContent = `Взнос должен быть больше ${target.min}`
    } else
    /* Если значение меньше */
    if (target.validity.rangeOverflow) {
      calcRealtyError.textContent = `Взнос должен быть меньше ${target.max}`
    }
  /* Если валидность true */
  } else {
    calcRealtyError.textContent = ``;
  }
}

/* получает дефолтное значение в зависимости от категории */
const getDefValue = () => {
  /* название категорий */
  const realtyTitle = `Стоимость недвижимость`
  const autoTitle = `Стоимость автомобиля`
  const creditTitle = `Сумма потребительского кредита`
  
  /* текст min/max для категорий */
  const realtyCost = `От 1 200 000  до 25 000 000 рублей`
  const autoCost = `От 500 000  до 5 000 000 рублей`
  const creditCost = `От 50 000  до 3 000 000 рублей`

  /* defVal % для категорий */
  const realtyProc = 10;
  const autoProc = 20;

  /* defVal min/max для категорий */
  const realtyMin = 1200000;
  const realtyMax = 25000000;
  const autoMin = 500000;
  const autoMax = 5000000;
  const creditMin = 50000;
  const creditMax = 3000000;

  /* defVal years для категорий */
  const realtyYearFirst = 5;
  const realtyYearLast = 30;
  const autoYearFirst = 1;
  const autoYearLast = 5;
  const creditYearFirst = 1;
  const creditYearLast = 7;

  if (calcSelect.value === 'Ипотечное кредитование') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++ ) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }
    /* записывает defValue в переменную где храниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(общей стоимости) */
    inputRealty.min = realtyMin;
    inputRealty.max = realtyMax;
    /* добавляет defVal для инпута(общей стоимости) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = generalSum * 10 / 100;

    /* добавляет параметры для инпута(слайдер) */
    inputFirstpayRange.min = realtyProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;
    inputFirstpayRange.value = realtyProc;
  

    /* добавляет параметры для инпута(дата) */
    inputDateRange.min = realtyYearFirst;
    inputDateRange.max = 30;
    inputDateRange.step = 1;
    inputDateRange.value = realtyYearFirst;
    inputDate.value = realtyYearFirst;

    offerSuccessText.textContent = `Сумма ипотеки`

    /* выводим defVal в html */
    calcTitle.textContent = realtyTitle;
    requestTarget = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + ' лет';
    calcDateLast.textContent = realtyYearLast + ' лет';
  } else 
  if (calcSelect.value === 'Автомобильное кредитование') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if ((calcStepCheckbox[i].children[0].id !== checkboxKacko.id) && (calcStepCheckbox[i].children[0].id !== checkboxLife.id)) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++ ) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }

    /* записывает defValue в переменную где зраниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(первоначальный взнос) */
    inputRealty.min = autoMin;
    inputRealty.max = autoMax;
    /* добавляет defVal для инпута(первоначальный взнос) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = generalSum * 20 / 100

    /* добавляет параметры для инпута(слайдер) */
    inputFirstpayRange.value = autoProc;
    inputFirstpayRange.min = autoProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;

    /* добавляет параметры для инпута(дата) */
    inputDateRange.min = autoYearFirst;
    inputDateRange.max = 5;
    inputDateRange.step = 1;
    inputDateRange.value = autoYearFirst;
    inputDate.value = autoYearFirst;

    offerSuccessText.textContent = `Сумма автокредита`

    /* выводим defVal в html */
    calcTitle.textContent = autoTitle;
    requestTarget = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + ' лет';
    calcDateLast.textContent = autoYearLast + ' лет';
  } else 
  if (calcSelect.value === 'Потребительский кредит') {

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if (calcStepCheckbox[i].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++ ) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }

    /* записывает defValue в переменную где храниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(потребительский кредит) */
    inputRealty.min = creditMin;
    inputRealty.max = creditMax;

    /* добавляет defVal для инпута(потребительский кредит) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = 0;
    
    offerSuccessText.textContent = `Сумма кредита`

    /* добавляет параметры для инпута(дата) */
    inputDateRange.min = creditYearFirst;
    inputDateRange.max = 7;
    inputDateRange.step = 1;
    inputDateRange.value = creditYearFirst;
    inputDate.value = creditYearFirst;

    /* выводим defVal в html */
    calcTitle.textContent = creditTitle;
    requestTarget = creditTitle;
    calcCost.textContent = creditCost;
    calcDateFirst.textContent = creditYearFirst + ' лет';
    calcDateLast.textContent = creditYearLast + ' лет';

    /* скрывает блок */
    calcFirstpayWrap.classList.add('visually-hidden');
  }
};

/* получает сумму % от общей суммы */
const getProcentSum = () => {
  generalSum = inputRealty.valueAsNumber;

  if (calcSelect.value === 'Потребительский кредит') {
    /* %=0 т.к. нет блока первоначальный взнос */
    procentSum = 0;
    if (checkboxProject.checked) {
      if (sumCredit >= 2000000) {
        procRate = '9';
        procRateMonth = 9 / 100 / 12;
      } else 
      if (750000 <= sumCredit < 2000000) {
        procRate = '12';
        procRateMonth = 12 / 100 / 12;
      } else {
        procRate = '14.5';
        procRateMonth = 14.5 / 100 / 12;
      }
    } else {
      if (sumCredit >= 2000000) {
        procRate = '9.5';
        procRateMonth = 9.5 / 100 / 12;
      } else 
      if (750000 <= sumCredit < 2000000) {
        procRate = '12.5';
        procRateMonth = 12.5 / 100 / 12;
      } else {
        procRate = '15';
        procRateMonth = 15 / 100 / 12;
      }
    }
  } else {
    /* получает % */
    let procent = Number(inputFirstpayRange.value);
    /* выводим % в html */
    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */
    procentSum = generalSum / 100 * procent;
    /* добавляет procent в value инпута(первоначальный взнос) */
    inputFirstpay.value = procentSum;

    /* проверяет %, на основе этого находит % ставку  */
    if (calcSelect.value === 'Ипотечное кредитование') {
      if (procent >= 20) {
        procRate = '8.5';
        procRateMonth = 8.5 / 100 / 12;
      } else {
        procRate = '9.4';
        procRateMonth = 9.4 / 100 / 12;
      }
    } else
    if (calcSelect.value === 'Автомобильное кредитование') {
      /* проверяет % и checkbox с услугами, на основе этого находит % ставку  */
      if (checkboxKacko.checked && checkboxLife.checked) {
        procRate = '3.5';
        procRateMonth = 3.5 / 100 / 12;
      } else 
      if (checkboxKacko.checked || checkboxLife.checked) {
        procRate = '8.5';
        procRateMonth = 8.5 / 100 / 12;
      } else
      if (sumCredit >= 2000000) {
        procRate = '15';
        procRateMonth = 15 / 100 / 12;
      } else {
        procRate = '16';
        procRateMonth = 16 / 100 / 12;
      }
    }
  }
};

/* Получить сумму кредита */
const getSumCredit = () => {
  sumCredit = generalSum;
  if (checkboxСapital.checked) {
    sumCredit = sumCredit - procentSum - capital;
  } else {
    sumCredit = sumCredit - procentSum;
  }
};

/* получает срок кредитования */
const getSumDate = () => {
  dateSum = inputDateRange.value;
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};

/* получает step для инпута */
const getStep = (e) => {
  const target = e.target;

  const realtyStep = 100000;
  const otherStep = 50000;
  if (target.id === calcPlus.id) {
    if (calcSelect.value === 'Ипотечное кредитование') {
      generalSum += realtyStep;
      inputRealty.valueAsNumber = generalSum;
    } else {
      generalSum += otherStep;
      inputRealty.valueAsNumber = generalSum;
    }
  } else
  if (target.id === calcMinus.id) {
    if (calcSelect.value === 'Ипотечное кредитование') {
      generalSum -= realtyStep;
      inputRealty.valueAsNumber = generalSum;
    } else {
      generalSum -= otherStep;
      inputRealty.valueAsNumber = generalSum;
    }
  }
};

const getRequest = () => {
  requestWrap.insertAdjacentHTML('afterbegin', 
    `<div class="calc__request-item">
      <p>Номер заявки</p>
      <span>№ ${requestNumber}</span>
      </div>

      <div class="calc__request-item">
      <p>Цель кредита</p>
      <span>${requestTarget}</span>
      </div>

      <div class="calc__request-item">
      <p>Стоимость недвижимости</p>
      <span>${generalSum} рублей</span>
      </div>

      <div class="calc__request-item">
      <p>Первоначальный взнос</p>
      <span>${procentSum} рублей</span>
      </div>

      <div class="calc__request-item">
      <p>Срок кредитования</p>
      <span>${dateSum} лет</span>
    </div>`
  );
}
/* добавляет нули к номеру заказа */
function addZero(num, size) {
  num++;
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

/* отслеживает клик по кнопки Оформить заявку*/
offerBtn.onclick = (e) => {
  e.preventDefault();
  /* проверка на ввод значений */
  if (procentSum !== undefined) {
    formName.focus();
    offerBtn.disabled = true;
    /* прибавляет ++ к номеру заказа, ТОЛЬКО один раз */
    if (requestNumber === 0) {
      requestNumber = addZero(requestNumber, 4);
    }
    getRequest();
    request.classList.remove('visually-hidden');
    // сбросить значения
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.value = '';
    }
  } else {
    return;
  }
}

/* модальное окно */
var esc = 27;
const overlay = document.getElementById("overlay");
const offrOverlay = document.getElementById("offer-overlay");
const iconClose = document.getElementById("close-overlay");

let closeOverlay =() => {
  overlay.classList.add('visually-hidden');
  offrOverlay.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

let openOverlay =() => {
  overlay.classList.remove('visually-hidden');
  offrOverlay.classList.remove('visually-hidden');
  body.style.overflow = 'hidden';
};

/* закрытие модального окна */
iconClose.onclick = () => {
  closeOverlay();
}

overlay.onclick = () => {
  closeOverlay();
}

window.addEventListener('keydown', function (e) {
  console.log(e)
  if (e.code === 'Escape' || e.keyCode === esc) {
    closeOverlay();
  }
});


/* отслеживает клик по кнопки Отправить*/
requestBtn.onclick = (e) => {
  let error = 0;
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() === false) {
      error++
    } 
  }

  if (error === 0 ) {
    /* открытие модального окна */
    openOverlay();

    /* хранение данных в localStorage */
    localStorage.setItem('name', formName.value);
    localStorage.setItem('phone', formPhone.value);
    localStorage.setItem('email', formEmail.value);
    
    /* скрыывает запрос */
    request.classList.add('visually-hidden');
    /* очищает поля запроса */
    requestWrap.innerHTML = "";
    offerBtn.disabled = false;
    requestNumber = addZero(requestNumber, 4);
    getOfferReset();
    getDefValue();
  }
}



/* добавляет события для всех checkbox */
for (let i = 0; calcStepCheckbox.length > i; i++ ) {
  const ckeckbox = calcStepCheckbox[i].children[0];
  ckeckbox.addEventListener('click', (e) => {
    getProcentSum();
    getSumCredit();
    getSumDate();
    getPayMonth();
    getOffer()
  });
} 

/* Получает дефолтные % и выводим в html */
getDefValue();
getSumDate();

/* Событие при изменении категории */
calcSelect.onchange = () => {
  getDefValue();
  getOfferReset();
}

/* Событие при снятии фокуса */
inputRealty.onblur = () => {
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
};

/* Отслеживание клика plus */
calcPlus.onclick = (e) => {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
}

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
}

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = () => {
  getSumDate();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = () => {
  getProcentSum();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = (e) => {
  getSumDate();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};






/* маска формы телефона */
$("#phone").mask("8(999) 999-9999");



/* Yandex map */
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.58873129, 56.70376289],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 3,
    controls: ['zoomControl', 'geolocationControl'],
    behaviors: ['drag']
  });

   // Функция, которая по состоянию чекбоксов в меню
    // показывает или скрывает геообъекты из выборки.
    function checkState () {
      var shownObjects,
          byCity = new ymaps.GeoQueryResult();

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
    type: "FeatureCollection",
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [55.75897861, 37.61587440]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [58.59281591, 49.66310862]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [51.55538262, 46.05959300]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',

        geometry: {
          type: 'Point',
          coordinates: [57.18885551, 65.57131175]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [55.00336661, 73.30568675]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [59.94241846, 30.23928050]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'RUS',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [40.36391621, 49.83888987]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'CNG',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [41.29850313, 69.30666331]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'CNG',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [53.87639833, 27.55861644]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'CNG',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [43.22421706, 76.90920237]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'CNG',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [48.96443170, 2.29006175]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'EURO',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [50.05179937, 14.50685862]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'EURO',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [51.61013852, -0.08298513]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'EURO',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [42.05625121, 12.66115550]
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: '../img/location.svg',
          iconImageSize: [30, 42],
          iconContent: 'EURO',
        },
      },
    ]
  }).addToMap(myMap);
};
