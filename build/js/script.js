/* eslint-disable */
'use strict'; // polyfill swiper for IE11

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function value(search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}
/* Слайдер для блока slider */


var mySwiper = new Swiper('#swiper1', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: {
    delay: 4000
  },
  loop: true
});
/* Слайдер для блока tab */

var tabSwiper = new Swiper('#swiper2', {
  loop: true
});
mySwiper.init();
tabSwiper.init();
/* маска формы телефона */

$("#phone").mask("8(999) 999-9999");
"use strict";

(function () {
  /* Internet Explorer 11 may have trouble retrieving the number type
  of an input value. This short script performs a quick test, and repairs
  the functionality if necessary. Load before attempting to use the
  `valueAsNumber` property on input elements. */
  "use strict";

  var a = document.createElement("input");
  a.setAttribute("type", "number");
  a.setAttribute("value", 2319);

  if ("valueAsNumber" in a && a.value != a.valueAsNumber) {
    if ("defineProperty" in Object && "getPrototypeOf" in Object) {
      Object.defineProperty(Object.getPrototypeOf(a), "valueAsNumber", {
        get: function get() {
          return parseInt(this.value, 10);
        }
      });
    }
  }
})();
"use strict";

var body = document.querySelector("body");
var inputRealty = document.getElementById("calc-realty");
var inputFirstpay = document.getElementById("calc-firstpay");
var inputFirstpayRange = document.getElementById("calc-firstpay-range");
var inputDateRange = document.getElementById("calc-date-range");
var inputDate = document.getElementById("calc-date");
var calcStep2 = document.getElementById("calc-step2");
var calcFlex = document.getElementById("calc__flex");
var optionHidden = document.getElementById("option-hidden");
var calcSelect = document.getElementById("calc-select");
var calcTitle = document.getElementById("calc-title");
var calcCost = document.getElementById("calc-cost");
var calcDateFirst = document.getElementById("calc-date-first");
var calcDateLast = document.getElementById("calc-date-last");
var calcFirstpayWrap = document.getElementById("calc-firstpay-wrap");
var calcPlus = document.getElementById("calc-plus");
var calcMinus = document.getElementById("calc-minus");
var calcRealtyError = document.getElementById("calc-realty-error");
var calcProcentValue = document.getElementById("calc-firstpay-value");
var calcFirstpayError = document.getElementById("calc-fistpay-error");
var checkboxСapital = document.getElementById("calc-extra-capital");
var checkboxKacko = document.getElementById("calc-extra-kacko");
var checkboxLife = document.getElementById("calc-extra-life");
var checkboxProject = document.getElementById("calc-extra-project");
var calcStepCheckbox = document.querySelectorAll(".calc__step-checkbox");
var calcCheckbox = document.querySelectorAll(".calc__step-checkbox input[type=checkbox]");
var offerSuccess = document.getElementById("offer-success");
var offerFailed = document.getElementById("offer-failed");
var offerFailedText = document.getElementById("offer-failed-text");
var offerSuccessText = document.getElementById("offer-success-text");
var offerBtn = document.getElementById("offer-btn");
var request = document.getElementById("request");
var requestWrap = document.getElementById("request-wrap");
var requestBtn = document.getElementById("request-btn");
var requestForm = document.getElementById("request-form");
var inputs = document.querySelectorAll(".calc__request-form input");
var formName = document.getElementById("name");
var formPhone = document.getElementById("phone");
var formEmail = document.getElementById("email");
var requestNumber = 0;
var requestTarget;
var defValue = 2000000;
var capital = 470000;
var generalSum; // стоимость недвижимости

var procentSum; // сумма первоначальный взнос

var procRate; // % первоначального взноса

var procRateMonth; // процентная ставка

var dateSum; // срок кредитования

var sumCredit; // сумма кредита(с вычитом первоначального взноса)

var payMonth; // ежемесячный платеж

var profitMonth; // ежемесячный платеж

var offerSum = document.getElementById("calc-offer-sum");
var offerProc = document.getElementById("calc-offer-proc");
var offerMonthpay = document.getElementById("calc-offer-monthpay");
var offerMonthprofit = document.getElementById("calc-offer-monthprofit");
"use strict";
/* отслеживает клик по кнопки Оформить заявку*/

offerBtn.onclick = function (e) {
  e.preventDefault();
  /* проверка на ввод значений */

  if (procentSum !== undefined) {
    // calcFlex.classList.add('visually-hidden');
    formName.focus();
    offerBtn.disabled = true;
    /* прибавляет ++ к номеру заказа, ТОЛЬКО один раз */

    if (requestNumber === 0) {
      requestNumber = addZero(requestNumber, 4);
    }

    getRequest();
    request.classList.remove('visually-hidden'); // сбросить значения

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.value = '';
    }
  } else {
    return;
  }
};
/* отслеживает клик по кнопки Отправить*/


requestBtn.onclick = function (e) {
  e.preventDefault();
  var error = 0; // Пройдёмся по всем полям

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i]; // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()

    if (input.checkValidity() === false) {
      error++;
    }
  }

  if (error === 0) {
    /* открытие модального окна */
    openOverlay(overlay);
    /* хранение данных в localStorage */

    localStorage.setItem('name', formName.value);
    localStorage.setItem('phone', formPhone.value);
    localStorage.setItem('email', formEmail.value);
    /* скрыывает запрос */

    request.classList.add('visually-hidden');
    offrOverlay.classList.remove('visually-hidden');
    /* очищает поля запроса */

    requestWrap.innerHTML = "";
    offerBtn.disabled = false;
    requestNumber = addZero(requestNumber, 4);
    getOfferReset();
    getDefValue();
  }
};
/* Событие при изменении категории */


calcSelect.onchange = function (e) {
  getDefValue();
  getSumDate();
  getOfferReset();
  calcStep2.classList.remove('visually-hidden');
};
/* Событие при снятии фокуса */


inputRealty.onblur = function () {
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer();
  chcekSum(inputRealty);
};
/* Отслеживание клика plus */


calcPlus.onclick = function (e) {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer();
  chcekSum(inputRealty);
};
/* Отслеживание клика minus */


calcMinus.onclick = function (e) {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer();
  chcekSum(inputRealty);
};
/* Отслеживание изменения срока кредитования */


inputDateRange.onchange = function () {
  getSumDate();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer();
};
/* Отслеживание изменения % первоначального взноса */


inputFirstpayRange.onchange = function () {
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer();
};
"use strict";

/* получает ежемесячный платеж */
var getPayMonth = function getPayMonth() {
  var countPeriods = dateSum * 12;
  payMonth = Math.round(sumCredit * (procRateMonth / (1 - 1 / Math.pow(1 + procRateMonth, countPeriods))));
  profitMonth = Math.round(payMonth / 0.45);
};
/* проверяет основную сумму на min/max и выводит сообщение в случае !valid */


var chcekSum = function chcekSum(target) {
  /* Если валидность false */
  if (!target.validity.valid) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      calcRealtyError.textContent = "\u0412\u0437\u043D\u043E\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 ".concat(target.min);
    } else
      /* Если значение меньше */
      if (target.validity.rangeOverflow) {
        calcRealtyError.textContent = "\u0412\u0437\u043D\u043E\u0441 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 ".concat(target.max);
      }
    /* Если валидность true */

  } else {
    calcRealtyError.textContent = "";
  }
};
/* получает сумму % от общей суммы */


var getProcentSum = function getProcentSum() {
  /* проверяет если общая сумма NaN, то добавляет defValue */
  if (inputRealty.value === '') {
    /* добавляет defVal для инпута(общей стоимости) */
    inputRealty.value = defValue;
    generalSum = inputRealty.valueAsNumber;
  } else {
    generalSum = inputRealty.valueAsNumber;
  }

  if (calcSelect.value === 'Потребительский кредит') {
    /* %=0 т.к. нет блока первоначальный взнос */
    procentSum = 0;

    if (checkboxProject.checked) {
      if (sumCredit >= 2000000) {
        procRate = '9';
        procRateMonth = 9 / 100 / 12;
      } else if (750000 <= sumCredit < 2000000) {
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
      } else if (750000 <= sumCredit < 2000000) {
        procRate = '12.5';
        procRateMonth = 12.5 / 100 / 12;
      } else {
        procRate = '15';
        procRateMonth = 15 / 100 / 12;
      }
    }
  } else {
    /* получает % */
    var procent = Number(inputFirstpayRange.value);
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
    } else if (calcSelect.value === 'Автомобильное кредитование') {
      /* проверяет % и checkbox с услугами, на основе этого находит % ставку  */
      if (checkboxKacko.checked && checkboxLife.checked) {
        procRate = '3.5';
        procRateMonth = 3.5 / 100 / 12;
      } else if (checkboxKacko.checked || checkboxLife.checked) {
        procRate = '8.5';
        procRateMonth = 8.5 / 100 / 12;
      } else if (sumCredit >= 2000000) {
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


var getSumCredit = function getSumCredit() {
  sumCredit = generalSum;

  if (checkboxСapital.checked) {
    sumCredit = sumCredit - procentSum - capital;
  } else {
    sumCredit = sumCredit - procentSum;
  }
};
/* получает срок кредитования */


var getSumDate = function getSumDate() {
  dateSum = inputDateRange.value;
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};
/* получает step для инпута */


var getStep = function getStep(e) {
  var target = e.target;
  var realtyStep = 100000;
  var otherStep = 50000;

  if (target.id === calcPlus.id) {
    if (calcSelect.value === 'Ипотечное кредитование') {
      generalSum += realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum += otherStep;
      inputRealty.value = generalSum;
    }
  } else if (target.id === calcMinus.id) {
    if (calcSelect.value === 'Ипотечное кредитование') {
      generalSum -= realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum -= otherStep;
      inputRealty.value = generalSum;
    }
  }
};
/* добавляет события для всех checkbox */


for (var i = 0; calcStepCheckbox.length > i; i++) {
  var ckeckbox = calcStepCheckbox[i].children[0];
  ckeckbox.addEventListener('click', function (e) {
    getProcentSum();
    getSumCredit();
    getSumDate();
    getPayMonth();
    getOffer();
  });
}
/* добавляет нули к номеру заказа */


function addZero(num, size) {
  num++;
  var s = num + "";

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}
"use strict";

/* получает дефолтное значение в зависимости от категории */
var getDefValue = function getDefValue() {
  /* название категорий */
  var realtyTitle = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C";
  var autoTitle = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044F";
  var creditTitle = "\u0421\u0443\u043C\u043C\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043A\u0440\u0435\u0434\u0438\u0442\u0430";
  /* текст min/max для категорий */

  var realtyCost = "\u041E\u0442 1 200 000  \u0434\u043E 25 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  var autoCost = "\u041E\u0442 500 000  \u0434\u043E 5 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  var creditCost = "\u041E\u0442 50 000  \u0434\u043E 3 000 000 \u0440\u0443\u0431\u043B\u0435\u0439";
  /* defVal % для категорий */

  var realtyProc = 10;
  var autoProc = 20;
  /* defVal min/max для категорий */

  var realtyMin = 1200000;
  var realtyMax = 25000000;
  var autoMin = 500000;
  var autoMax = 5000000;
  var creditMin = 50000;
  var creditMax = 3000000;
  /* defVal years для категорий */

  var realtyYearFirst = 5;
  var realtyYearLast = 30;
  var autoYearFirst = 1;
  var autoYearLast = 5;
  var creditYearFirst = 1;
  var creditYearLast = 7;
  /* скрывает option */

  optionHidden.hidden = true;

  if (calcSelect.value === 'Ипотечное кредитование') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */


    for (var i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i = 0; calcCheckbox.length > _i; _i++) {
      calcCheckbox[_i].checked = false;
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
    // inputRealty.value = defValue;

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
    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u0438\u043F\u043E\u0442\u0435\u043A\u0438";
    /* выводим defVal в html */

    calcTitle.textContent = realtyTitle;
    requestTarget = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + ' лет';
    calcDateLast.textContent = realtyYearLast + ' лет';
  } else if (calcSelect.value === 'Автомобильное кредитование') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */


    for (var _i2 = 0; calcStepCheckbox.length > _i2; _i2++) {
      if (calcStepCheckbox[_i2].children[0].id !== checkboxKacko.id && calcStepCheckbox[_i2].children[0].id !== checkboxLife.id) {
        calcStepCheckbox[_i2].classList.add('visually-hidden');

        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[_i2].classList.remove('visually-hidden');
      }
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i3 = 0; calcCheckbox.length > _i3; _i3++) {
      calcCheckbox[_i3].checked = false;
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

    inputFirstpay.value = generalSum * 20 / 100;
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
    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u0430\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442\u0430";
    /* выводим defVal в html */

    calcTitle.textContent = autoTitle;
    requestTarget = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + ' лет';
    calcDateLast.textContent = autoYearLast + ' лет';
  } else if (calcSelect.value === 'Потребительский кредит') {
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (var _i4 = 0; calcStepCheckbox.length > _i4; _i4++) {
      if (calcStepCheckbox[_i4].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[_i4].classList.add('visually-hidden');

        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[_i4].classList.remove('visually-hidden');
      }
    }
    /* цикл сбрасывает значения checkbox  */


    for (var _i5 = 0; calcCheckbox.length > _i5; _i5++) {
      calcCheckbox[_i5].checked = false;
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
    offerSuccessText.textContent = "\u0421\u0443\u043C\u043C\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u0430";
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
"use strict";

/* модальное окно - Спасибо за обращение */
var esc = 27;
var overlay = document.getElementById("overlay");
var offrOverlay = document.getElementById("offer-overlay");
var iconClose = document.getElementById("close-overlay");
var inputLogin = document.getElementById("login");

var closeOverlay = function closeOverlay(target) {
  overlay.classList.add("visually-hidden");
  target.classList.add("visually-hidden");
  body.style.overflow = "auto";
};

var openOverlay = function openOverlay(target) {
  overlay.classList.remove("visually-hidden");
  target.classList.remove("visually-hidden");
  body.style.overflow = "hidden";
  inputLogin.focus();
};
/* закрытие модального окна */


iconClose.onclick = function () {
  closeOverlay(offrOverlay);
};

window.addEventListener("keydown", function (e) {
  console.log(e);

  if (e.code === "Escape" || e.keyCode === esc) {
    closeOverlay(offrOverlay);
  }
});
/* Модальное окно */

var enterCabinet = document.getElementById("enter-cabinet");
var modal = document.getElementById("modal");
var modalClose = document.getElementById("modal-close");
var showPassword = document.getElementById("show-password");
var inputPassword = document.getElementById("password");

enterCabinet.onclick = function () {
  openOverlay(modal);
};

modalClose.onclick = function () {
  closeOverlay(modal);
};

overlay.onclick = function (e) {
  if (modal.classList.contains("visually-hidden")) {
    closeOverlay(offrOverlay);
  } else if (offrOverlay.classList.contains("visually-hidden")) {
    closeOverlay(modal);
  }
};

window.addEventListener("keydown", function (e) {
  if (e.code === "Escape" || e.keyCode === esc) {
    if (modal.classList.contains("visually-hidden")) {
      closeOverlay(offrOverlay);
    } else if (offrOverlay.classList.contains("visually-hidden")) {
      closeOverlay(modal);
    }
  }
});

showPassword.onclick = function () {
  console.dir(inputPassword);

  if (inputPassword.type === "password") {
    inputPassword.type = "text";
  } else {
    inputPassword.type = "password";
  }
};
"use strict";

/* отображает значения для offer */
var getOffer = function getOffer() {
  if (calcSelect.value === "Ипотечное кредитование") {
    if (sumCredit < 500000) {
      offerFailedText.textContent = "\u041D\u0430\u0448 \u0431\u0430\u043D\u043A \u043D\u0435 \u0432\u044B\u0434\u044B\u0435\u0442 \u0438\u043F\u043E\u0442\u0435\u0447\u043D\u044B\u0435 \u043A\u0440\u0435\u0434\u0438\u0442\u044B \u043C\u0435\u043D\u044C\u0448\u0435 500000 \u0440\u0443\u0431\u043B\u0435\u0439";
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  } else if (calcSelect.value === "Автомобильное кредитование") {
    if (sumCredit < 200000) {
      offerFailedText.textContent = "\u041D\u0430\u0448 \u0431\u0430\u043D\u043A \u043D\u0435 \u0432\u044B\u0434\u044B\u0435\u0442 \u0430\u0432\u0442\u043E\u043A\u0440\u0435\u0434\u0438\u0442\u044B \u043C\u0435\u043D\u044C\u0448\u0435 200000 \u0440\u0443\u0431\u043B\u0435\u0439";
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  } else {
    if (calcSelect.value === "Потребительский кредит") {
      offerSum.textContent = "".concat(sumCredit, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerProc.textContent = "".concat(procRate, " %");
      offerMonthpay.textContent = "".concat(payMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
      offerMonthprofit.textContent = "".concat(profitMonth, " \u0440\u0443\u0431\u043B\u0435\u0439");
    }
  }
};
/* сброс значения для offer */


var getOfferReset = function getOfferReset() {
  offerSum.textContent = "";
  offerProc.textContent = "";
  offerMonthpay.textContent = "";
  offerMonthprofit.textContent = "";
};

var getRequest = function getRequest() {
  requestWrap.insertAdjacentHTML("afterbegin", "<div class=\"calc__request-item\">\n        <p>\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u044F\u0432\u043A\u0438</p>\n        <span>\u2116 ".concat(requestNumber, "</span>\n        </div>\n  \n        <div class=\"calc__request-item\">\n        <p>\u0426\u0435\u043B\u044C \u043A\u0440\u0435\u0434\u0438\u0442\u0430</p>\n        <span>").concat(requestTarget, "</span>\n        </div>\n  \n        <div class=\"calc__request-item\">\n        <p>\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438</p>\n        <span>").concat(generalSum, " \u0440\u0443\u0431\u043B\u0435\u0439</span>\n        </div>\n  \n        <div class=\"calc__request-item\">\n        <p>\u041F\u0435\u0440\u0432\u043E\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0437\u043D\u043E\u0441</p>\n        <span>").concat(procentSum, " \u0440\u0443\u0431\u043B\u0435\u0439</span>\n        </div>\n  \n        <div class=\"calc__request-item\">\n        <p>\u0421\u0440\u043E\u043A \u043A\u0440\u0435\u0434\u0438\u0442\u043E\u0432\u0430\u043D\u0438\u044F</p>\n        <span>").concat(dateSum, " \u043B\u0435\u0442</span>\n      </div>"));
};
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
    behaviors: ['drag']
  }); // Функция, которая по состоянию чекбоксов в меню
  // показывает или скрывает геообъекты из выборки.

  function checkState() {
    var shownObjects;
    var byCity = new ymaps.GeoQueryResult(); // Отберем объекты по форме.

    if ($('#rus').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "RUS"');
    }

    if ($('#cng').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "CNG"').add(byCity);
    }

    if ($('#euro').prop('checked')) {
      byCity = myObjects.search('options.iconContent = "EURO"').add(byCity);
    } // Мы отобрали объекты по цвету и по форме. Покажем на карте объекты,
    // которые совмещают нужные признаки.


    shownObjects = byCity.addToMap(myMap); // Объекты, которые не попали в выборку, нужно убрать с карты.

    myObjects.remove(shownObjects).removeFromMap(myMap);
  }

  $('#rus').click(checkState);
  $('#cng').click(checkState);
  $('#euro').click(checkState); // Создадим объекты из их JSON-описания и добавим их на карту.

  window.myObjects = ymaps.geoQuery({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.75897861, 37.6158744]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [58.59281591, 49.66310862]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.55538262, 46.059593]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [57.18885551, 65.57131175]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [55.00336661, 73.30568675]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [59.94241846, 30.2392805]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'RUS'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [40.36391621, 49.83888987]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [41.29850313, 69.30666331]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [53.87639833, 27.55861644]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [43.22421706, 76.90920237]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'CNG'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [48.9644317, 2.29006175]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [50.05179937, 14.50685862]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [51.61013852, -0.08298513]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [42.05625121, 12.6611555]
      },
      options: {
        iconLayout: 'default#image',
        iconImageHref: '../img/location.svg',
        iconImageSize: [30, 35],
        iconContent: 'EURO'
      }
    }]
  }).addToMap(myMap);
}