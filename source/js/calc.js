"use strict";

const inputRealty = document.getElementById("calc-realty");
const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcFirstpay = document.getElementById("calc-firstpay");
const calcFirstpayRange = document.getElementById("calc-firstpay-range");


const valueMin = 1200000;
const valueMax = 25000000;
const defValue = 2000000;
const step = 100000;
// var calcFirstpayValue = inputRealty.value * 10 / 100;


/* Меняет значение при фокусе */
inputRealty.onfocus = () => {
  if (inputRealty.value === "") {
    inputRealty.value = defValue;
    calcFirstpay.value = inputRealty.value * 10 / 100
  }
};

/* Проверка на min max */
let checkValue = () => {
  console.log(inputRealty.value)
  if (inputRealty.value < valueMin) {
    inputRealty.value = valueMin;
    calcFirstpay.value = inputRealty.value * 10 / 100
  }
  if (inputRealty.value > valueMax) {
    inputRealty.value = valueMax;
    calcFirstpay.value = inputRealty.value * 10 / 100
  }
}

/* Отслеживание изменения значения */
inputRealty.onchange = () => {
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

/*  */
calcFirstpayRange.onchange = () => {
  console.log(calcFirstpayRange.value)
};

