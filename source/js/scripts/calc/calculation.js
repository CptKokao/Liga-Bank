/* получает ежемесячный платеж */
const getPayMonth = () => {
    let countPeriods = dateSum * 12;
    payMonth = Math.round((sumCredit * (procRateMonth / (1 - (1 / Math.pow((1 + procRateMonth),countPeriods))))));
    profitMonth = Math.round(payMonth / 0.45)
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
  
  
  /* получает сумму % от общей суммы */
  const getProcentSum = () => {
    
    /* проверяет если общая сумма NaN, то добавляет defValue */
    if (inputRealty.value === '') {
      /* добавляет defVal для инпута(общей стоимости) */
      inputRealty.value = defValue; 
      generalSum = inputRealty.valueAsNumber;
    } else {
      generalSum = inputRealty.valueAsNumber;
    }
  

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
        inputRealty.value = generalSum;
      } else {
        generalSum += otherStep;
        inputRealty.value = generalSum;
      }
    } else
    if (target.id === calcMinus.id) {
      if (calcSelect.value === 'Ипотечное кредитование') {
        generalSum -= realtyStep;
        inputRealty.value = generalSum;
      } else {
        generalSum -= otherStep;
        inputRealty.value = generalSum;
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
  
  
  /* добавляет нули к номеру заказа */
  function addZero(num, size) {
    num++;
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
