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

const defValue = 2000000;
const step = 100000;
const capital = 470000;

let generalSum; // стоимость недвижимости
let procentSum; // сумма первоначальный взнос
let procRate; // % первоначального взноса
let procRateMonth; // Процентная ставка
let sumDate = 5; // срок кредитования
let sumCredit = 0; // сумма кредита(с вычитом первоначального взноса)
let payMonth; // ежемесячный платеж
let profitMonth; // ежемесячный платеж

const offerSum = document.getElementById("calc-offer-sum"); 
const offerProc = document.getElementById("calc-offer-proc"); 
const offerMonthpay = document.getElementById("calc-offer-monthpay"); 
const offerMonthprofit = document.getElementById("calc-offer-monthprofit");

/* получает ежемесячный платеж */
const formula = () => {
  let countPeriods = sumDate * 12;
  payMonth = (sumCredit * (procRateMonth / (1 - (1 / Math.pow((1 + procRateMonth),countPeriods)))))
  profitMonth = payMonth / 0.45;
  console.log(sumCredit);
  console.log(procRateMonth);
  console.log(countPeriods);
} 

/* отображает значения для offer */
const getOffer = () => {
  offerSum.textContent = sumCredit;
  offerProc.textContent = procRate;
  offerMonthpay.textContent = payMonth;
  offerMonthprofit.textContent = profitMonth; 
}

/* Проверка основной суммы */
const chcekSum = (target, error) => {
  /* Если валидность false */
  if (!target.validity.valid) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      error.textContent = `Взнос должен быть больше ${target.min}`
    } else
    /* Если значение меньше */
    if (target.validity.rangeOverflow) {
      error.textContent = `Взнос должен быть меньше ${target.max}`
    }
  /* Если валидность true */
  } else {
    error.textContent = ``;
  }
}

/* Получает дефолтное % значение в зависимости от категории */
const getDefProcent = () => {
  const realtyTitle = `Стоимость недвижимость`
  const autoTitle = `Стоимость автомобиля`
  const creditTitle = `Сумма потребительского кредита`
  
  const realtyCost = `От 1 200 000  до 25 000 000 рублей`
  const autoCost = `От 500 000  до 5 000 000 рублей`
  const creditCost = `От 50 000  до 3 000 000 рублей`

  const realtyProc = 10;
  const autoProc = 20;

  const realtyMin = 1200000;
  const realtyMax = 25000000;
  const autoMin = 500000;
  const autoMax = 5000000;
  const creditMin = 50000;
  const creditMax = 3000000;

  const realtyYearFirst = 5;
  const realtyYearLast = 30;
  const autoYearFirst = 1;
  const autoYearLast = 5;
  const creditYearFirst = 1;
  const creditYearLast = 7;

  if (calcSelect.value === 'Ипотечное кредитование') {
    
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    } 

    /* добавляет min max для инпута общей стоимости */
    inputRealty.min = realtyMin;
    inputRealty.max = realtyMax;
    /* выводит основную сумму в html */
    inputRealty.value = defValue;
    
    /* добавляет деф.значение для инпута общей стоимости */
    generalSum = defValue;
    /* добавляет значение для инпута первоначальный взнос*/
    inputFirstpay.value = generalSum * 10 / 100

    /* добавляет параметры для input */
    inputFirstpayRange.min = realtyProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;
    inputFirstpayRange.value = realtyProc;

    inputDateRange.value = realtyYearFirst;
    inputDateRange.min = realtyYearFirst;
    inputDateRange.max = 30;
    inputDateRange.step = 1;

    /* выводим % в html */
    calcTitle.textContent = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + ' лет';
    calcDateLast.textContent = realtyYearLast + ' лет';


  } else 
  if (calcSelect.value === 'Автомобильное кредитование') {

    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if ((calcStepCheckbox[i].children[0].id !== checkboxKacko.id) && (calcStepCheckbox[i].children[0].id !== checkboxLife.id)) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
        
      }
    }
    
    /* добавляет min max для инпута общей стоимости */
    inputRealty.min = autoMin;
    inputRealty.max = autoMax;

    /* добавляет деф.значение для инпута общей стоимости */
    inputRealty.value = defValue;
    generalSum = defValue;
    /* добавляет значение для инпута первоначальный взнос*/
    inputFirstpay.value = generalSum * 10 / 100

    /* добавляет value для input */
    inputFirstpayRange.value = autoProc;
    inputFirstpayRange.min = autoProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;

    /* добавляет параметры для input */
    inputFirstpayRange.value = 0;

    inputDateRange.min = autoYearFirst;
    inputDateRange.max = 5;
    inputDateRange.step = 1;
    inputDateRange.value = autoYearFirst;

    /* выводим % в html */
    calcTitle.textContent = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + ' лет';
    calcDateLast.textContent = autoYearLast + ' лет';
  } else 
  if (calcSelect.value === 'Потребительский кредит') {

    for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      if (calcStepCheckbox[i].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[i].classList.add('visually-hidden');
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove('visually-hidden');
      }
    } 
    /* добавляет min max для инпута общей стоимости */
    inputRealty.min = creditMin;
    inputRealty.max = creditMax;

    /* добавляет деф.значение для инпута общей стоимости */
    inputRealty.value = defValue;
    generalSum = defValue;
    /* добавляет значение для инпута первоначальный взнос*/
    inputFirstpay.value = 0;
    

    /* добавляет value для input */
    inputDateRange.min = creditYearFirst;
    inputDateRange.max = 7;
    inputDateRange.step = 1;
    inputDateRange.value = creditYearFirst;

    /* выводим % в html */
    calcTitle.textContent = creditTitle;
    calcCost.textContent = creditCost;
    calcDateFirst.textContent = creditYearFirst + ' лет';
    calcDateLast.textContent = creditYearLast + ' лет';

    /* Удаляет блок */
    calcFirstpayWrap.classList.add('visually-hidden');
  }
};

/* Получает сумму % от общей суммы */
const getProcentSum = () => {
  generalSum = inputRealty.valueAsNumber;

  if(calcSelect.value === 'Потребительский кредит') {
    procentSum = 0;

    if (sumCredit >= 200000) {
      procRate = '9.5';
      procRateMonth = 0.00791;
    } else 
    if (750000 <= sumCredit <= 200000) {
      procRate = '12.5';
      procRateMonth = 0.01041;
    } else {
      procRate = '15';
      procRateMonth = 0.0125;
    }
  } else {
    /* Получает % */
    let procent = Number(inputFirstpayRange.value);
    /* выводим % в html */
    calcProcentValue.textContent = procent;
    /* вычисляем какой % от суммы */
    procentSum = generalSum / 100 * procent;
    inputFirstpay.value = procentSum;

    if (calcSelect.value === 'Ипотечное кредитование') {
      if (procent >= 20) {
        procRate = '8.50';
        procRateMonth = 0.00708;
      } else {
        procRate = '9.40';
        procRateMonth = 0.00783;
      }
    } else
    if (calcSelect.value === 'Автомобильное кредитование') {
      if (checkboxKacko.checked && checkboxLife.checked) {
        procRate = '3.5';
        procRateMonth = 0.00291;
      } else 
      if (checkboxKacko.checked || checkboxLife.checked) {
        procRate = '8.5';
        procRateMonth = 0.00708;
      } else
      if (sumCredit >= 2000000) {
        procRate = '15';
        procRateMonth = 0.0125;
      } else {
        procRate = '16';
        procRateMonth = 0.01333;
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

  formula();
  getOffer()
};

/* Получает дефолтные % и выводим в html */
getDefProcent();


/* Событие при изменении категории */
calcSelect.onchange = () => {
  getDefProcent();
  getOffer();
}

/* Событие при снятии фокуса */
inputRealty.onblur = () => {
  getProcentSum();
  getSumCredit();
  chcekSum(inputRealty, calcRealtyError);
};

/* Отслеживание клика plus */
calcPlus.onclick = () => {
  generalSum += step;
  inputRealty.valueAsNumber = generalSum;
  getProcentSum();
  getSumCredit();
  chcekSum(inputRealty, calcRealtyError);
}

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  generalSum -= step;
  inputRealty.valueAsNumber = generalSum;
  getProcentSum();
  getSumCredit();
  chcekSum(inputRealty, calcRealtyError);
}

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};


/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = () => {
  getProcentSum();
  getSumCredit();
};

/* отслеживание выбор материнского капитала */
for (let i = 0; calcStepCheckbox.length > i; i++ ) {
  const ckeckbox = calcStepCheckbox[i].children[0];
  ckeckbox.addEventListener('click', (e) => {
    getProcentSum();
    getSumCredit();
  });
} 


/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = (e) => {
  sumDate = e.target.value;
  calcDateFirst.textContent = sumDate + ' лет';
  inputDateRange.value = sumDate;
  inputDate.value = sumDate;
  getSumCredit();
};


