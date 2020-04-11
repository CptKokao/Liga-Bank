/* eslint-disable */


const dropdown = document.querySelector(".dropdown");

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
dropdown.onclick = (e) => {
  if (e.target.classList.contains("active")) {
    return;
  }
  getDefValue();
  getSumDate();
  getOfferReset();
}

/* Событие при снятии фокуса */
inputRealty.oninput = () => {
  
  if(!getProcentSum()) {
    return;
  }
  
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
  ;
};

/* Отслеживание клика plus */
calcPlus.onclick = (e) => {
  getStep(e);
  if(!getProcentSum()) {
    return;
  }
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()
}

/* Отслеживание клика minus */
calcMinus.onclick = (e) => {
  getStep(e);
  if(!getProcentSum()) {
    return;
  }
  getSumCredit();
  getSumDate();
  getPayMonth();
  getOffer()

}

/* Отслеживание изменения срока кредитования */
inputDateRange.onchange = () => {
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