"use strict";

const inputRealty = document.getElementById("calc-realty");
const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcFirstpay = document.getElementById("calc-firstpay");



const valueMin = 1200000;
const valueMax = 25000000;
const defValue = 2000000;
const step = 100000;
let countValue = 0;

console.log();

// /* Отслеживание изменения значения после фокуса */
// inputRealty.oninput = (e) => {
//   console.log(e.validity.rangeUnderflow);
// };

/* Проверка на min max */
let checkValue = () => {
  if (inputRealty.value === "") {
    inputRealty.value = defValue;
    calcFirstpay.value = defValue * 10 / 100;
  } else
  if (inputRealty.value < valueMin) {
    inputRealty.value = valueMin;
    calcFirstpay.value = inputRealty.value * 10 / 100
  } else
  if (inputRealty.value > valueMax) {
    inputRealty.value = valueMax;
    calcFirstpay.value = inputRealty.value * 10 / 100
  }
};

/* Событие на фокус */
inputRealty.onfocus = () => {
  checkValue();
};

/* Отслеживание клика plus */
calcPlus.onclick = () => {
  inputRealty.valueAsNumber += step;
  checkValue();
  calcFirstpay.value = inputRealty.value * 10 / 100
}

/* Отслеживание клика minus */
calcMinus.onclick = () => {
  inputRealty.valueAsNumber -= step;
  checkValue();
  calcFirstpay.value = inputRealty.value * 10 / 100
}

const calcFirstpayRange = document.getElementById("calc-firstpay-range");
let calcFirstpayValue = document.getElementById("calc-firstpay-value");
const calcFirstpayError = document.getElementById("calc-fistpay-error");
const calcDate = document.getElementById("calc-date");
const calcDateRange = document.getElementById("calc-date-range");
let calcDateValue = document.getElementById("calc-date-value");
let sumFirstpay = 200000;
console.dir(calcFirstpayRange)

/* Отслеживание изменения срока кредитования */
calcDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};

/* Отслеживание изменения % первоначального взноса */
calcFirstpayRange.oninput = (e) => {
  const target = e.target;
  /* получаем % */
  let procent = target.value;
  /* выводим % в html */
  calcFirstpayValue.textContent = procent;

  /* вычисляем какой % от суммы */
  sumFirstpay = inputRealty.value / 100 * procent;
  /* выводим значение в html */
  calcFirstpay.value = sumFirstpay;
};

/* Отслеживание изменения значение первоначального взноса */
calcFirstpay.oninput = (e) => {
  const target = e.target;
  let min = sumFirstpay / 100 * 10
  let max = sumFirstpay;

  /* задаем min */
  target.min = min;

  /* задаем max */
  target.max = max;

  /* Если валидность false */
  if (!target.checkValidity()) {
    console.dir(calcFirstpay.validity);
    /* Если значение больше */
    if (target.validity.rangeUnderflow) {
      calcFirstpayError.textContent = `Взнос должен быть меньше ${max}`
    } else
    /* Если значение меньше */
    if (target.validity.rangeOverflow) {
      calcFirstpayError.textContent = `Взнос должен быть больше ${min}`
    }
  /* Если валидность true */
  } else {
    calcFirstpayError.textContent = ``;
  }
};
