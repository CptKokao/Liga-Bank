/* eslint-disable */


/* получает дефолтное значение в зависимости от категории */
const getDefValue = () => {
  /* название категорий */
  const realtyTitle = `Стоимость недвижимости`;
  const autoTitle = `Стоимость автомобиля`;
  const creditTitle = `Сумма потребительского кредита`;

  /* текст min/max для категорий */
  const realtyCost = `От 1 200 000  до 25 000 000 рублей`;
  const autoCost = `От 500 000  до 5 000 000 рублей`;
  const creditCost = `От 50 000  до 3 000 000 рублей`;

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

  if (dropdownInput.value === "credit-realty") {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains("visually-hidden")) {
      calcFirstpayWrap.classList.remove("visually-hidden");
    }
    
    if (calcStep2.classList.contains("visually-hidden")) {
      calcStep2.classList.remove('visually-hidden')    
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxСapital.id) {
        calcStepCheckbox[i].classList.add("visually-hidden");
      } else {
        calcStepCheckbox[i].classList.remove("visually-hidden");
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains("visually-hidden")) {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
    }

    /* записывает defValue в переменную где храниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(общей стоимости) */
    inputRealty.min = realtyMin;
    inputRealty.max = realtyMax;
    /* добавляет defVal для инпута(общей стоимости) */
    // inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    // inputFirstpay.value = (generalSum * 10) / 100;

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
    // inputDate.value = realtyYearFirst;

    offerSuccessText.textContent = `Сумма ипотеки`;

    /* выводим defVal в html */
    calcTitle.textContent = realtyTitle;
    calcCost.textContent = realtyCost;
    calcProcentValue.textContent = realtyProc;
    calcDateFirst.textContent = realtyYearFirst + " лет";
    calcDateLast.textContent = realtyYearLast + " лет";
  } else if (dropdownInput.value === "credit-auto") {
    /* проверяет если категория первоначальный взнос скрыта, то показать */
    if (calcFirstpayWrap.classList.contains("visually-hidden")) {
      calcFirstpayWrap.classList.remove("visually-hidden");
    }
    if (calcStep2.classList.contains("visually-hidden")) {
      calcStep2.classList.remove('visually-hidden')    
    }

    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (
        calcStepCheckbox[i].children[0].id !== checkboxKacko.id &&
        calcStepCheckbox[i].children[0].id !== checkboxLife.id
      ) {
        calcStepCheckbox[i].classList.add("visually-hidden");
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove("visually-hidden");
      }
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains("visually-hidden")) {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
    }

    /* записывает defValue в переменную где зраниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(первоначальный взнос) */
    inputRealty.min = autoMin;
    inputRealty.max = autoMax;
    /* добавляет defVal для инпута(первоначальный взнос) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = (generalSum * 20) / 100;

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
    // inputDate.value = autoYearFirst;

    offerSuccessText.textContent = `Сумма автокредита`;

    /* выводим defVal в html */
    calcTitle.textContent = autoTitle;
    calcCost.textContent = autoCost;
    calcProcentValue.textContent = autoProc;
    calcDateFirst.textContent = autoYearFirst + " лет";
    calcDateLast.textContent = autoYearLast + " лет";
  } else if (dropdownInput.value === "credit-user") {
    /* цикл проверяет все чекбоксы и показывает только для текущей категории */
    for (let i = 0; calcStepCheckbox.length > i; i++) {
      if (calcStepCheckbox[i].children[0].id !== checkboxProject.id) {
        calcStepCheckbox[i].classList.add("visually-hidden");
        calcStepCheckbox.checked = false;
      } else {
        calcStepCheckbox[i].classList.remove("visually-hidden");
      }
    }
    if (calcStep2.classList.contains("visually-hidden")) {
      calcStep2.classList.remove('visually-hidden')    
    }

    /* цикл сбрасывает значения checkbox  */
    for (let i = 0; calcCheckbox.length > i; i++) {
      calcCheckbox[i].checked = false;
    }

    if (offerSuccess.classList.contains("visually-hidden")) {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
    }

    /* записывает defValue в переменную где храниться общая сумма */
    generalSum = defValue;

    /* добавляет min/max для инпута(credit-realty) */
    inputRealty.min = creditMin;
    inputRealty.max = creditMax;

    /* добавляет defVal для инпута(credit-realty) */
    inputRealty.value = defValue;
    /* добавляет значение для инпута(первоначальный взнос) */
    inputFirstpay.value = 0;

    offerSuccessText.textContent = `Сумма кредита`;

    /* добавляет параметры для инпута(дата) */
    inputDateRange.min = creditYearFirst;
    inputDateRange.max = 7;
    inputDateRange.step = 1;
    inputDateRange.value = creditYearFirst;
    inputDate.value = creditYearFirst;

    /* выводим defVal в html */
    calcTitle.textContent = creditTitle;
    calcCost.textContent = creditCost;
    calcDateFirst.textContent = creditYearFirst + " лет";
    calcDateLast.textContent = creditYearLast + " лет";

    /* скрывает блок */
    calcFirstpayWrap.classList.add("visually-hidden");
  }
};
