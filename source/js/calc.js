"use strict";

/* отслеживает клик по кнопки Оформить заявку*/
offerBtn.onclick = (e) => {
  e.preventDefault();
  /* проверка на ввод значений */
  if (procentSum !== undefined) {
    // calcFlex.classList.add('visually-hidden');
    formName.focus();
    offerBtn.disabled = true;
    /* прибавляет ++ к номеру заказа, ТОЛЬКО один раз */
    if (requestNumber === 0) {
      requestNumber = addZero(requestNumber, 4);
    }
    getRequest();
    request.classList.remove('visually-hidden');
    // сбросить значения
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.value = '';
    }
  } else {
    return;
  }
}

/* отслеживает клик по кнопки Отправить*/
requestBtn.onclick = (e) => {
  e.preventDefault();
  let error = 0;
  // Пройдёмся по всем полям
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    // Проверим валидность поля, используя встроенную в JavaScript функцию checkValidity()
    if (input.checkValidity() === false) {
      error++
    } 
  }

  if (error === 0 ) {
    /* открытие модального окна */
    openOverlay(overlay);

    /* хранение данных в localStorage */
    localStorage.setItem('name', formName.value);
    localStorage.setItem('phone', formPhone.value);
    localStorage.setItem('email', formEmail.value);
    
    /* скрыывает запрос */
    request.classList.add('visually-hidden');

    offrOverlay.classList.remove('visually-hidden');
    /* очищает поля запроса */
    requestWrap.innerHTML = "";
    offerBtn.disabled = false;
    requestNumber = addZero(requestNumber, 4);
    getOfferReset();
    getDefValue();
  }
}

/* Событие при изменении категории */
calcSelect.onchange = (e) => {
  getDefValue();
  getSumDate();
  getOfferReset();
  calcStep2.classList.remove('visually-hidden')
}

/* Событие при снятии фокуса */
inputRealty.onblur = () => {
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
};

/* Отслеживание клика plus */
calcPlus.onclick = (e) => {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
}

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  getStep(e);
  getProcentSum();
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  chcekSum(inputRealty);
}

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = () => {
  getSumDate();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};

/* Отслеживание изменения % первоначального взноса */
inputFirstpayRange.oninput = () => {
  getProcentSum();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};

/* Отслеживание изменения срока кредитования */
inputDateRange.oninput = (e) => {
  getSumDate();
  getSumCredit();
  getSumDate()
  getPayMonth();
  getOffer()
};
