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
let calcDate = document.getElementById("calc-date");
let calcDateRange = document.getElementById("calc-date-range");
let calcDateValue = document.getElementById("calc-date-value");
console.dir(calcFirstpayRange)


/* Отслеживание изменения % первоначального взноса */
calcFirstpayRange.oninput = (e) => {
  let procent = e.target.value;
  calcFirstpayValue.textContent = procent;
  calcFirstpay.value = inputRealty.value / 100 * procent;
};

/* Отслеживание изменения срока кредитования */
calcDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};

