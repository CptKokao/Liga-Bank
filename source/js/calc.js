"use strict";

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





