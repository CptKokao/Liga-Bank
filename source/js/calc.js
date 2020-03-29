"use strict";

const inputRealty = document.getElementById("calc-realty");
const inputFirstpay = document.getElementById("calc-firstpay");
const inputFirstpayRange = document.getElementById("calc-firstpay-range");
const inputDateRange = document.getElementById("calc-date-range");

const calcSelect = document.getElementById("calc-select");
const calcTitle = document.getElementById("calc-title");
const calcCost = document.getElementById("calc-cost");
const calcDateFirst = document.getElementById("calc-date-first");
const calcDateLast = document.getElementById("calc-date-last");
const calcFirstpayWrap = document.getElementById("calc-firstpay-wrap");

const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcProcentValue = document.getElementById("calc-firstpay-value");
const calcFirstpayError = document.getElementById("calc-fistpay-error");

const calcDate = document.getElementById("calc-date");
const calcСapital = document.getElementById("calc-capital");

const valueMin = 1200000;
const valueMax = 25000000;
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

/* Получает дефолтное % значение в зависимости от категории */
const getDefProcent = () => {
  const hypothecTitle = `Стоимость недвижимость`
  const autoTitle = `Стоимость автомобиля`
  const creditTitle = `Сумма потребительского кредита`
  
  const hypothecCost = `От 1 200 000  до 25 000 000 рублей`
  const autoCost = `От 500 000  до 5 000 000 рублей`
  const creditCost = `От 50 000  до 3 000 000 рублей`

  const hypothecProc = 10;
  const autoProc = 20;

  const hypothecYearFirst = 5;
  const hypothecYearLast = 30;

  const autoYearFirst = 1;
  const autoYearLast = 5;

  const creditYearFirst = 1;
  const creditYearLast = 7;

  if (calcSelect.value === 'Ипотечное кредитование') {
    
    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    /* добавляет параметры для input */
    inputFirstpayRange.min = hypothecProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;
    inputFirstpayRange.value = hypothecProc;

    inputDateRange.value = hypothecYearFirst;
    inputDateRange.min = hypothecYearFirst;
    inputDateRange.max = 30;
    inputDateRange.step = 1;

    /* выводим % в html */
    calcTitle.textContent = hypothecTitle;
    calcCost.textContent = hypothecCost;
    calcProcentValue.textContent = hypothecProc;
    calcDateFirst.textContent = hypothecYearFirst + ' лет';
    calcDateLast.textContent = hypothecYearLast + ' лет';


  } else 
  if (calcSelect.value === 'Автомобильное кредитование') {

    if (calcFirstpayWrap.className === "visually-hidden") {
      calcFirstpayWrap.classList.remove('visually-hidden');
    }

    /* добавляет value для input */
    inputFirstpayRange.value = autoProc;
    inputFirstpayRange.min = autoProc;
    inputFirstpayRange.max = 100;
    inputFirstpayRange.step = 5;

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
    console.dir(calcFirstpayWrap)
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

/* получает ежемесячный платеж */
const formula = () => {
  let countPeriods = sumDate * 12;
  payMonth = (sumCredit * procRateMonth) - (1 - 1/Math.pow((1 + procRateMonth),countPeriods))
} 

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = (e) => {
  let date = e.target.value;
  calcDateValue.textContent = date;
  calcDate.value = `${date} лет`;
};

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

/* Получает дефолтные % и выводим в html */
getDefProcent();

/* Событие при изменении категории */
calcSelect.onchange = () => {
  getDefProcent();
}

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
inputDateRange.oninput = (e) => {
  sumDate = e.target.value;
  calcDateFirst.textContent = sumDate + ' лет';
  inputDateRange.value = sumDate;
};

