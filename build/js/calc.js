"use strict";

const inputRealty = document.getElementById("calc-realty");
const inputFirstpay = document.getElementById("calc-firstpay");
const inputFirstpayRange = document.getElementById("calc-firstpay-range");

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
let generalSum;
let procentSum;
let minRange;
let maxRange;
let sumCredit = 0;

const getMinMax = () => {
  minRange = generalSum / 100 * 10
  maxRange = generalSum;
} 

// getMinMax();

/* Проверка суммы первоначального взноса */
const chcekSum = (target, error) => {
  /* Если валидность false */
  if (!target.checkValidity()) {
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      error.textContent = `Взнос должен быть больше ${minRange}`
    } else
    /* Если значение меньше */
    if (target.validity.rangeOverflow) {
      error.textContent = `Взнос должен быть меньше ${maxRange}`
    }
  /* Если валидность true */
  } else {
    error.textContent = ``;
  }
}

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

/* Получаем сумму процента */
const getProcentSum = (target) => {
  /* получаем % */
  let procent = Number(target.textContent);
  /* выводим % в html */
  calcProcentValue.textContent = procent;
  /* вычисляем какой % от суммы */
  procentSum = generalSum / 100 * procent;
  inputFirstpay.value = procentSum;
}

/* Получить сумму кредита */
const getSumCredit = () => {
  sumCredit = generalSum;
  if (calcСapital.checked) {
    sumCredit = sumCredit - procentSum - capital;
  } else {
    sumCredit = sumCredit - procentSum;
  }
};

/* Событие на фокус */
inputRealty.onfocus = () => {
  checkValue();
  getProcentSum(calcProcentValue);

  
  console.log(generalSum);
  console.log(procentSum);
  console.log(sumCredit);
};

/* Событие при изменении стоимости недвижимости*/
inputRealty.onblur = () => {
  getMinMax();
  checkValue();
  getProcentSum(calcProcentValue);
  getSumCredit();

  
  console.log(generalSum);
  console.log(procentSum);
  console.log(sumCredit);
};

/* Отслеживание клика plus */
calcPlus.onclick = () => {
  inputRealty.valueAsNumber += step;
  generalSum = inputRealty.value * 10 / 100;
  inputFirstpay.value = generalSum;
  getMinMax();
  checkValue();
  getProcentSum(calcProcentValue);
  getSumCredit();

  console.log(generalSum);
  console.log(procentSum);
  console.log(sumCredit);
}

/* Отслеживание клика minus */
calcMinus.onclick = () => {
  inputRealty.valueAsNumber -= step;
  generalSum = inputRealty.value * 10 / 100;
  inputFirstpay.value = generalSum;
  getMinMax();
  checkValue();
  getProcentSum(calcProcentValue);
  getSumCredit();

  console.log(generalSum);
  console.log(procentSum);
  console.log(sumCredit);
}

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = (e) => {
  const target = e.target;
  getMinMax();
  getProcentSum(target);
  getSumCredit();

  // chcekSum(inputFirstpay, calcFirstpayError);
};

/* Отслеживание изменения срока кредитования */
calcDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};


// /* Отслеживание изменения значение первоначального взноса */
// inputFirstpay.oninput = (e) => {
//   const target = e.target;
//   /*  получаем min и max */
//   getMinMax();
//   /* задаем min */
//   target.min = minRange;
//   /* задаем max */
//   target.max = maxRange;

//   /*  */
//   chcekSum(target, calcFirstpayError);
//   getSumCredit();

// };