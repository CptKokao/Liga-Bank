"use strict";

const inputRealty = document.getElementById("calc-realty");
const inputFirstpay = document.getElementById("calc-firstpay");
const inputFirstpayRange = document.getElementById("calc-firstpay-range");

const calcSelect = document.getElementById("calc__select");
const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcProcentValue = document.getElementById("calc-firstpay-value");
const calcFirstpayError = document.getElementById("calc-fistpay-error");

const calcDate = document.getElementById("calc-date");
const calcDateRange = document.getElementById("calc-date-range");
const calcDateValue = document.getElementById("calc-date-value");
const calcСapital = document.getElementById("calc-capital");

const valueMin = 1200000;
const valueMax = 25000000;
const defValue = 2000000;
const step = 100000;
const capital = 470000;
// let minRange;
// let maxRange;
let generalSum;
let procentSum;
let procRate;
let procRateMonth;
let payMonth;
let sumCredit = 0;

/* получает ежемесячный платеж */
const formula = () => {
  // payMonth = sumCredit * (procRateMonth + procRateMonth/((1+procRateMonth)*12)-1);
  // payMonth = (sumCredit * procRateMonth) - (1 - 1/(1 + procRateMonth)* 12)
} 

// const getMinMax = () => {
//   minRange = generalSum / 100 * 10
//   maxRange = generalSum;
// } 

/* Проверка суммы первоначального взноса */
// const chcekSum = (target, error) => {
//   /* Если валидность false */
//   if (!target.checkValidity()) {
//     /* Если значение больше */
//     if (target.validity.rangeUnderflow) {
//       error.textContent = `Взнос должен быть больше ${minRange}`
//     } else
//     /* Если значение меньше */
//     if (target.validity.rangeOverflow) {
//       error.textContent = `Взнос должен быть меньше ${maxRange}`
//     }
//   /* Если валидность true */
//   } else {
//     error.textContent = ``;
//   }
// }

/* Проверка на min max */
let checkValue = () => {
  /* если значение пустое */
  if (inputRealty.value === "") {
    /* поставить defValue */
    inputRealty.value = defValue;
    generalSum = defValue;
    inputFirstpay.value = defValue * 10 / 100;
  } else
  /* если значение меньше */
  if (inputRealty.value < valueMin) {
    /* поставить valueMin */
    inputRealty.value = valueMin;
    generalSum = valueMin;
    inputFirstpay.value = inputRealty.value * 10 / 100
  } else
  /* если значение больше */
  if (inputRealty.value > valueMax) {
    /* поставить valueMax */
    inputRealty.value = valueMax;
    generalSum = valueMax;
    inputFirstpay.value = inputRealty.value * 10 / 100
  } else {
    generalSum = inputRealty.value;
  }
};

/* Получает дефолтное % значение в зависимости от категории */
const getDefProcent = () => {
  const hypothecProc = 10;
  const autoProc = 20;

  if (calcSelect.value === 'Ипотечное кредитование') {
    /* добавляет value для input */
    inputFirstpayRange.value = hypothecProc;
    /* выводим % в html */
    calcProcentValue.textContent = hypothecProc;
  } else 
  if (calcSelect.value === 'Автомобильное кредитование') {
    /* добавляет value для input */
    inputFirstpayRange.value = autoProc;
    /* выводим % в html */
    calcProcentValue.textContent = autoProc;
  }
};

/* Получает дефолтные % и выводим в html */
getDefProcent();

/* Получает сумму % от общей суммы */
const getProcentSum = () => {
  /* Получает % */
  let procent = Number(inputFirstpayRange.value);
  /* выводим % в html */
  calcProcentValue.textContent = procent;
  /* вычисляем какой % от суммы */
  procentSum = generalSum / 100 * procent;
  inputFirstpay.value = procentSum;

  /* Получаем % ставку */
  if (procent >= 20) {
    procRate = '8.50';
    procRateMonth = 0.00708;
  } else {
    procRate = '9.40';
    procRateMonth = 0.00783;
  }
};

/* Получить сумму кредита */
const getSumCredit = () => {
  sumCredit = generalSum;
  if (calcСapital.checked) {
    sumCredit = sumCredit - procentSum - capital;
  } else {
    sumCredit = sumCredit - procentSum;
  }
  formula()

  console.log(generalSum);
  console.log(procentSum);
  console.log(sumCredit);
  console.log(procRate);
  console.log(payMonth);
};

/* Событие на фокус */
inputRealty.onfocus = () => {
  checkValue();
  getProcentSum();
  getSumCredit();
};

/* Событие при изменении стоимости недвижимости */
inputRealty.onblur = () => {
  checkValue();
  // getMinMax();
  getProcentSum();
  getSumCredit();
};

/* Отслеживание клика plus */
calcPlus.onclick = () => {
  inputRealty.valueAsNumber += step;
  generalSum = inputRealty.value * 10 / 100;
  inputFirstpay.value = generalSum;
  // getMinMax();
  checkValue();
  getProcentSum();
  getSumCredit();
}

/* Отслеживание клика minus */
calcMinus.onclick = () => {
  inputRealty.valueAsNumber -= step;
  generalSum = inputRealty.value * 10 / 100;
  inputFirstpay.value = generalSum;
  // getMinMax();
  checkValue();
  getProcentSum();
  getSumCredit();
}

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = () => {
  // getMinMax();
  getProcentSum();
  getSumCredit();
};

/* отслеживание выбор материнского капитала */
calcСapital.oninput = () => {
  getSumCredit();
};

/* Отслеживание изменения срока кредитования */
calcDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};

