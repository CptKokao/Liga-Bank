'use strict';

const body = document.querySelector('body');
const inputRealty = document.getElementById('calc-realty');
const inputFirstpay = document.getElementById('calc-firstpay');
const inputFirstpayRange = document.getElementById('calc-firstpay-range');
const inputDateRange = document.getElementById('calc-date-range');
const inputDate = document.getElementById('calc-date');
const dropdown = document.querySelector('.dropdown');
const dropdownInput = document.getElementById('dropdown-input');
const calcStep2 = document.getElementById('calc-step2');
const calcFirstpayWrap = document.getElementById('calc-firstpay-wrap');
const calcTitle = document.getElementById('calc-title');
const calcCost = document.getElementById('calc-cost');
const calcDateFirst = document.getElementById('calc-date-first');
const calcDateLast = document.getElementById('calc-date-last');
const calcPlus = document.getElementById('calc-plus');
const calcMinus = document.getElementById('calc-minus');
const calcRealtyError = document.getElementById('calc-realty-error');
const calcProcentValue = document.getElementById('calc-firstpay-value');
const checkboxСapital = document.getElementById('calc-extra-capital');
const checkboxKacko = document.getElementById('calc-extra-kacko');
const checkboxLife = document.getElementById('calc-extra-life');
const checkboxProject = document.getElementById('calc-extra-project');
const calcStepCheckbox = document.querySelectorAll('.calc__step-checkbox');
const calcCheckbox = document.querySelectorAll('.calc__step-checkbox input[type=checkbox]');
const offerSuccess = document.getElementById('offer-success');
const offerFailed = document.getElementById('offer-failed');
const offerFailedText = document.getElementById('offer-failed-text');
const offerSuccessText = document.getElementById('offer-success-text');
const offerBtn = document.getElementById('offer-btn');
const request = document.getElementById('request');
const requestWrap = document.getElementById('request-wrap');
const requestBtn = document.getElementById('request-btn');
const inputs = document.querySelectorAll('.calc__request-form input');
const formName = document.getElementById('name');
const formPhone = document.getElementById('phone');
const formEmail = document.getElementById('email');
// const calcFlex = document.getElementById('calc__flex');
// const calcFirstpayError = document.getElementById('calc-fistpay-error');
// const requestForm = document.getElementById('request-form');


let requestNumber = 0;
let requestTarget;
let requestPrice;
let procent;

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

const offerSum = document.getElementById('calc-offer-sum');
const offerProc = document.getElementById('calc-offer-proc');
const offerMonthpay = document.getElementById('calc-offer-monthpay');
const offerMonthprofit = document.getElementById('calc-offer-monthprofit');

/*
 * defValue.js
 */

/* получает дефолтное значение в зависимости от категории */
const getDefValue = () => {
  /* название категорий */
  const realtyTitle = `Стоимость недвижимости`;
  const autoTitle = `Стоимость автомобиля`;
  const creditTitle = `Сумма потребительского кредита`;

  /* текст min/max для категорий */
  const realtyCost = `От 1 200 000  до 25 000 000 рублей`;
  const autoCost = `От 500 000  до 5 000 000 рублей`;
  const creditCost = `От 50 000  до 3 000 000 рублей`;

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

  if (dropdownInput.value === 'credit-realty') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains('visually-hidden')) {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
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
    // inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    // inputFirstpay.value = (generalSum * 10) / 100;

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
    // inputDate.value = realtyYearFirst;

    offerSuccessText.textContent = `Сумма ипотеки`;

    /* выводим defVal в html */
    calcTitle.textContent = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + ' лет';
    calcDateLast.textContent = realtyYearLast + ' лет';
  } else if (dropdownInput.value === 'credit-auto') {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains('visually-hidden')) {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }
    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (
        calcStepCheckbox[i].children[0].id !== checkboxKacko.id &&
        calcStepCheckbox[i].children[0].id !== checkboxLife.id
      ) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
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
    inputFirstpay.value = (generalSum * 20) / 100;

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
    // inputDate.value = autoYearFirst;

    offerSuccessText.textContent = `Сумма автокредита`;

    /* выводим defVal в html */
    calcTitle.textContent = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + ' лет';
    calcDateLast.textContent = autoYearLast + ' лет';
  } else if (dropdownInput.value === 'credit-user') {
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    }
    if (calcStep2.classList.contains('visually-hidden')) {
      calcStep2.classList.remove('visually-hidden');
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains('visually-hidden')) {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
    }

    /* записывает defValue в переменную где храниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(credit-realty) */
    inputRealty.min = creditMin;
    inputRealty.max = creditMax;

    /* добавляет defVal для инпута(credit-realty) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = 0;

    offerSuccessText.textContent = `Сумма кредита`;

    /* добавляет параметры для инпута(дата) */
    inputDateRange.min = creditYearFirst;
    inputDateRange.max = 7;
    inputDateRange.step = 1;
    inputDateRange.value = creditYearFirst;
    inputDate.value = creditYearFirst;

    /* выводим defVal в html */
    calcTitle.textContent = creditTitle;
    calcCost.textContent = creditCost;
    calcDateFirst.textContent = creditYearFirst + ' лет';
    calcDateLast.textContent = creditYearLast + ' лет';

    /* скрывает блок */
    calcFirstpayWrap.classList.add('visually-hidden');
  }
};

/*
 * calculation.js
 */

/* получает введенную сумму и записывает в generalSum*/
const getGeneralSum = () => {
  /* проверяет если общая сумма NaN, то добавляет defValue */
  if (inputRealty.value === '') {
    /* добавляет defVal для инпута(общей стоимости) */
    inputRealty.value = defValue;
    generalSum = inputRealty.valueAsNumber;
  } else {
    generalSum = inputRealty.valueAsNumber;
  }
};

/* проверяет основную сумму на min/max и выводит сообщение в случае !valid */
const checkGeneralSum = (target) => {
  /* Если валидность false */
  if (!target.validity.valid) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      calcRealtyError.textContent = `Взнос должен быть больше ${target.min}`;
      calcRealtyError.style.color = '#d40101';
      calcRealtyError.style.display = 'block';
      inputRealty.style.border = '1px solid #d40101';
      offerBtn.disabled = true;
      return false;
    } else if (target.validity.rangeOverflow) {
      /* Если значение меньше */
      calcRealtyError.textContent = `Взнос должен быть меньше ${target.max}`;
      calcRealtyError.style.color = '#d40101';
      inputRealty.style.border = '1px solid #d40101';
      calcRealtyError.style.display = 'block';
      offerBtn.disabled = true;
      return false;
    }
    /* Если валидность true */
  } else {
    calcRealtyError.textContent = ``;
    calcRealtyError.style.display = 'none';
    inputRealty.style.border = '';
    offerBtn.disabled = false;
    return true;
  }
};

/* Задает дефолтный % для категории */
const setDefProcent = () => {
  /* defVal % для категорий */
  const realtyProc = 10;
  const autoProc = 20;

  if (dropdownInput.value === 'credit-realty') {
    let value = Number(inputFirstpay.value);
    procent = realtyProc;
    /* выводим % в html */
    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */
    procentSum = (generalSum / 100) * procent;

    /* проверка на введенное число, если value < min, то def % */
    if (value > procentSum) {
      inputFirstpay.value = value;
      inputFirstpayRange.value = realtyProc;
      procentSum = value;
    } else {
      /* добавляет procent в value инпута(первоначальный взнос) */
      inputFirstpay.value = procentSum;
      inputFirstpayRange.value = realtyProc;
    }
  } else if (dropdownInput.value === 'credit-auto') {
    let value = Number(inputFirstpay.value);
    procent = autoProc;
    /* выводим % в html */
    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */
    procentSum = (generalSum / 100) * procent;

    /* проверка на введенное число, если value < min, то def % */
    if (value > procentSum) {
      inputFirstpay.value = value;
      inputFirstpayRange.value = autoProc;
      procentSum = value;
    } else {
      /* добавляет procent в value инпута(первоначальный взнос) */
      inputFirstpay.value = procentSum;
      inputFirstpayRange.value = autoProc;
    }
  }
};

/* Задает % для категории */
const setCurProcent = () => {
  if (dropdownInput.value === 'credit-user') {
    procentSum = 0;
  } else {
    /* получает % */
    procent = Number(inputFirstpayRange.value);
    /* выводим % в html */
    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */
    procentSum = (generalSum / 100) * procent;
    /* добавляет procent в value инпута(первоначальный взнос) */
    inputFirstpay.value = procentSum;
  }
};

/* получает срок кредитования */
const getSumYears = () => {
  /* Значение input[type='range'] записывает в переменную dateSum */
  dateSum = inputDateRange.value;
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};

/* получает срок кредитования */
const getPutYears = () => {
  /* Значение input[type='range'] записывает в переменную dateSum */
  dateSum = Number(inputDate.value);
  let dateMin = Number(inputDateRange.min);
  let dateMax = Number(inputDateRange.max);
  if (dateSum < dateMin) {
    dateSum = dateMin;
  } else if (dateSum > dateMax) {
    dateSum = dateMax;
  }
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};

/* получает ежемесячный платеж */
const getPayMonth = () => {
  let countPeriods = dateSum * 12;
  payMonth = Math.round(sumCredit * (procRateMonth / (1 - 1 / Math.pow(1 + procRateMonth, countPeriods))));
  profitMonth = Math.round(payMonth / 0.45);
};

/* Получить сумму кредита */
const calcSumCredit = () => {
  if (checkboxСapital.checked) {
    sumCredit = generalSum - procentSum - capital;
  } else {
    sumCredit = generalSum - procentSum;
  }
};

/* получает % ставку */
const getProcentRate = () => {
  /* если проверка не пройдена на min/max то false  */
  if (!checkGeneralSum(inputRealty)) {
    return false;
  } else {
    if (dropdownInput.value === 'credit-user') {
      /* %=0 т.к. нет блока первоначальный взнос */
      procentSum = 0;
      if (checkboxProject.checked) {
        if (sumCredit >= 2000000) {
          procRate = '9';
          procRateMonth = 9 / 100 / 12;
        } else if (sumCredit >= 750000 && sumCredit < 2000000) {
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
        } else if (sumCredit >= 750000 && sumCredit < 2000000) {
          procRate = '12.5';
          procRateMonth = 12.5 / 100 / 12;
        } else {
          procRate = '15';
          procRateMonth = 15 / 100 / 12;
        }
      }
    } else {
      /* проверяет %, на основе этого находит % ставку  */
      if (dropdownInput.value === 'credit-realty') {
        if (procent >= 20) {
          procRate = '8.5';
          procRateMonth = 8.5 / 100 / 12;
        } else {
          procRate = '9.4';
          procRateMonth = 9.4 / 100 / 12;
        }
      } else if (dropdownInput.value === 'credit-auto') {
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
    return true;
  }
};

/* получает step для инпута */
const getStep = (e) => {
  const target = e.target;

  const realtyStep = 100000;
  const otherStep = 50000;
  if (target.id === calcPlus.id) {
    if (dropdownInput.value === 'credit-realty') {
      generalSum += realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum += otherStep;
      inputRealty.value = generalSum;
    }
  } else if (target.id === calcMinus.id) {
    if (dropdownInput.value === 'credit-realty') {
      generalSum -= realtyStep;
      inputRealty.value = generalSum;
    } else {
      generalSum -= otherStep;
      inputRealty.value = generalSum;
    }
  }
};

/* получает step для инпута */
const disableForm = (state) => {
  inputRealty.disabled = state;
  calcPlus.disabled = state;
  calcMinus.disabled = state;
  inputFirstpay.disabled = state;
  inputFirstpayRange.disabled = state;
  inputDate.disabled = state;
  inputDateRange.disabled = state;
  for (let i = 0; calcStepCheckbox.length > i; i++) {
    calcStepCheckbox[i].children[0].disabled = state;
  }
};

/* добавляет события для всех checkbox */
for (let i = 0; calcStepCheckbox.length > i; i++) {
  const ckeckbox = calcStepCheckbox[i].children[0];
  ckeckbox.addEventListener('click', () => {
    /* После ввода стоимости недвижимости, должно автоматически проставляться минимальное значение первоначального взноса. */
    setDefProcent();
    /* получает сумму кредита */
    calcSumCredit();
    /* получает % ставку */
    getProcentRate();
    /* получает количество лет */
    getSumYears();
    /* вычисляет ежемесячный платеж */
    getPayMonth();
    /* показывает offer */
    getOffer();
  });
}

/* добавляет нули к номеру заказа */
function addZero(num, size) {
  num++;
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}

/*
 * offer.js
 */

/* отображает значения для offer */
const getOffer = () => {
  if (dropdownInput.value === 'credit-realty') {
    if (sumCredit < 500000) {
      offerFailedText.textContent = `Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей`;
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  } else if (dropdownInput.value === 'credit-auto') {
    if (sumCredit < 200000) {
      offerFailedText.textContent = `Наш банк не выдыет автокредиты меньше 200000 рублей`;
      offerFailed.classList.remove('visually-hidden');
      offerSuccess.classList.add('visually-hidden');
    } else {
      offerFailed.classList.add('visually-hidden');
      offerSuccess.classList.remove('visually-hidden');
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  } else {
    if (dropdownInput.value === 'credit-user') {
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  }
};

/* сброс значения для offer */
const getOfferReset = () => {
  offerSum.textContent = '';
  offerProc.textContent = '';
  offerMonthpay.textContent = '';
  offerMonthprofit.textContent = '';
};

const getRequest = () => {
  let hidden;
  if (dropdownInput.value === 'credit-realty') {
    requestTarget = 'Ипотека';
    requestPrice = 'Стоимость недвижимости';
  } else if (dropdownInput.value === 'credit-auto') {
    requestTarget = 'Автокредит';
    requestPrice = 'Стоимость автомобиля';
  } else if (dropdownInput.value === 'credit-user') {
    requestTarget = 'Потребительский кредит';
    requestPrice = 'Сумма кредита';
    hidden = `style='display: none;'`;
  }
  requestWrap.insertAdjacentHTML('afterbegin',
      `<div class='calc__request-item'>
        <p>Номер заявки</p>
        <span>№ ${requestNumber}</span>
      </div>
    
      <div class='calc__request-item'>
        <p>Цель кредита</p>
        <span>${requestTarget}</span>
      </div>
    
      <div class='calc__request-item'>
        <p>${requestPrice}</p>
        <span>${generalSum} рублей</span>
      </div>
    
      <div class='calc__request-item' ${hidden}>
        <p>Первоначальный взнос</p>
        <span>${procentSum} рублей</span>
      </div>
    
      <div class='calc__request-item'>
        <p>Срок кредитования</p>
        <span>${dateSum} лет</span>
      </div>`
  );
};

/*
 * calcOn.js
 */

/* Событие при изменения значения */
inputRealty.oninput = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* После ввода стоимости недвижимости, должно автоматически проставляться минимальное значение первоначального взноса. */
  setDefProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание клика plus */
calcPlus.onclick = (e) => {
  getStep(e);
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setCurProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  getStep(e);
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setCurProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.onchange = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setCurProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание изменения % первоначального взноса */
inputFirstpay.onchange = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setDefProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание изменения срока кредитования */
inputDateRange.onchange = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setCurProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getSumYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* Отслеживание изменения срока кредитования */
inputDate.onchange = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if (!checkGeneralSum(inputRealty)) {
    return;
  }
  /* получает текущий % */
  setCurProcent();
  /* получает сумму кредита */
  calcSumCredit();
  /* получает % ставку */
  getProcentRate();
  /* получает количество лет */
  getPutYears();
  /* вычисляет ежемесячный платеж */
  getPayMonth();
  /* показывает offer */
  getOffer();
};

/* отслеживает клик по кнопки Оформить заявку*/
offerBtn.onclick = (e) => {
  e.preventDefault();
  /* проверка на ввод значений */
  if (typeof procentSum !== 'undefined') {
    // calcFlex.classList.add('visually-hidden');
    disableForm(true);
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
};

/* отслеживает клик по кнопки Отправить*/
requestBtn.onclick = (e) => {
  e.preventDefault();
  let error = 0;
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() === false) {
      error++;
      input.style.border = '1px solid #d40101';
    } else {
      input.style.border = 'none';
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
    requestWrap.innerHTML = '';
    requestNumber = addZero(requestNumber, 4);
    disableForm(false);
    getOfferReset();
    getDefValue();
  }
};

/* Событие при изменении категории */
dropdown.onclick = (e) => {
  if (e.target.classList.contains('active')) {
    return;
  }
  getDefValue();
  // getSumYears();
  getOfferReset();
};

/*
 * modal.js
 */

/* модальное окно - Спасибо за обращение */
var esc = 27;
const overlay = document.getElementById('overlay');
const offrOverlay = document.getElementById('offer-overlay');
const iconClose = document.getElementById('close-overlay');
const inputLogin = document.getElementById('login');

let closeOverlay = (target) => {
  overlay.classList.add('visually-hidden');
  target.classList.add('visually-hidden');
  body.style.overflow = 'auto';
};

let openOverlay = (target) => {
  overlay.classList.remove('visually-hidden');
  target.classList.remove('visually-hidden');
  body.style.overflow = 'hidden';
  inputLogin.focus();
};

/* закрытие модального окна */
iconClose.onclick = () => {
  closeOverlay(offrOverlay);
};

window.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' || e.keyCode === esc) {
    closeOverlay(offrOverlay);
  }
});

/* Модальное окно */
const enterCabinet = document.getElementById('enter-cabinet');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const showPassword = document.getElementById('show-password');
const inputPassword = document.getElementById('password');

enterCabinet.onclick = () => {
  openOverlay(modal);
};

modalClose.onclick = () => {
  closeOverlay(modal);
};

overlay.onclick = () => {
  if (modal.classList.contains('visually-hidden')) {
    closeOverlay(offrOverlay);
  } else if (offrOverlay.classList.contains('visually-hidden')) {
    closeOverlay(modal);
  }
};

window.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' || e.keyCode === esc) {
    if (modal.classList.contains('visually-hidden')) {
      closeOverlay(offrOverlay);
    } else if (offrOverlay.classList.contains('visually-hidden')) {
      closeOverlay(modal);
    }
  }
});


showPassword.addEventListener('mousedown', function () {
  inputPassword.type = 'text';
});

showPassword.addEventListener('mouseup', function () {
  inputPassword.type = 'password';
});

