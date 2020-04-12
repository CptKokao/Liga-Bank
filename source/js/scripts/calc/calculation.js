/* eslint-disable */

let generalSum; // стоимость недвижимости

let procent; // % 
let procentSum; // сумма первоначальный взнос
let procRate; // % первоначального взноса

let procRateMonth; // процентная ставка
let dateSum; // срок кредитования

let sumCredit; // сумма кредита(с вычитом первоначального взноса)
let payMonth; // ежемесячный платеж
let profitMonth; // ежемесячный платеж



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
    } else
    /* Если значение меньше */
    if (target.validity.rangeOverflow) {
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
    procentSum = generalSum / 100 * procent;

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
    procentSum = generalSum / 100 * procent;

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
    procentSum = generalSum / 100 * procent;
    /* добавляет procent в value инпута(первоначальный взнос) */
    inputFirstpay.value = procentSum;
  }
};


/* получает срок кредитования */
const getSumYears = () => {
  /* Значение input[type="range"] записывает в переменную dateSum */
  dateSum = inputDateRange.value;
  inputDate.value = dateSum;
  calcDateFirst.textContent = dateSum + ' лет';
  inputDateRange.value = dateSum;
};

/* получает срок кредитования */
const getPutYears = () => {
  /* Значение input[type="range"] записывает в переменную dateSum */
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
  payMonth = Math.round((sumCredit * (procRateMonth / (1 - (1 / Math.pow((1 + procRateMonth),countPeriods))))));
  profitMonth = Math.round(payMonth / 0.45)
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
  if(!checkGeneralSum(inputRealty)) {
    return false;
  } else {
    if (dropdownInput.value === 'credit-user') {
      /* %=0 т.к. нет блока первоначальный взнос */
      procentSum = 0;
      if (checkboxProject.checked) {
        if (sumCredit >= 2000000) {
          procRate = '9';
          procRateMonth = 9 / 100 / 12;
        } else 
        if ((750000 <= sumCredit) && (sumCredit < 2000000)) {
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
        if ((750000 <= sumCredit) && (sumCredit < 2000000)) {
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
      } else
      if (dropdownInput.value === 'credit-auto') {
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
  } else
  if (target.id === calcMinus.id) {
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
  console.dir(inputRealty);
  inputRealty.disabled = state;
  calcPlus.disabled = state;
  calcMinus.disabled = state;
  inputFirstpay.disabled = state;
  inputFirstpayRange.disabled = state;
  inputDate.disabled = state;
  inputDateRange.disabled = state;
  for (let i = 0; calcStepCheckbox.length > i; i++ ) {
    calcStepCheckbox[i].children[0].disabled = state;

  } 
};
  
  /* добавляет события для всех checkbox */
  for (let i = 0; calcStepCheckbox.length > i; i++ ) {
      const ckeckbox = calcStepCheckbox[i].children[0];
      ckeckbox.addEventListener('click', (e) => {
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
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

/* Событие при изменения значения */
inputRealty.oninput = (e) => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if(!checkGeneralSum(inputRealty)) {
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
  if(!checkGeneralSum(inputRealty)) {
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
}

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  getStep(e);
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if(!checkGeneralSum(inputRealty)) {
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
}

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if(!checkGeneralSum(inputRealty)) {
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
  if(!checkGeneralSum(inputRealty)) {
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
inputDateRange.oninput = () => {
  getGeneralSum();
  /* проверяет сумму, если возвращает false то проверка не пройдена */
  if(!checkGeneralSum(inputRealty)) {
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
  if(!checkGeneralSum(inputRealty)) {
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
  

  

  
