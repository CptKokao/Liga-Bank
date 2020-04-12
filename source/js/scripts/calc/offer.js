/* eslint-disable */

/* отображает значения для offer */
const getOffer = () => {
  if (dropdownInput.value === "credit-realty") {
    if (sumCredit < 500000) {
      offerFailedText.textContent = `Наш банк не выдаёт ипотечные кредиты меньше 500 000 рублей`;
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  } else if (dropdownInput.value === "credit-auto") {
    if (sumCredit < 200000) {
      offerFailedText.textContent = `Наш банк не выдыет автокредиты меньше 200000 рублей`;
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  } else {
    if (dropdownInput.value === "credit-user") {
      offerSum.textContent = `${sumCredit} рублей`;
      offerProc.textContent = `${procRate} %`;
      offerMonthpay.textContent = `${payMonth} рублей`;
      offerMonthprofit.textContent = `${profitMonth} рублей`;
    }
  }
};

/* сброс значения для offer */
const getOfferReset = () => {
  offerSum.textContent = "";
  offerProc.textContent = "";
  offerMonthpay.textContent = "";
  offerMonthprofit.textContent = "";
};



const getRequest = () => {
  let hidden;
  if (dropdownInput.value === "credit-realty") {
    requestTarget = 'Ипотека';
    requestPrice = 'Стоимость недвижимости';
  } else if (dropdownInput.value === "credit-auto") {
    requestTarget = 'Автокредит';
    requestPrice = 'Стоимость автомобиля';

  } else if (dropdownInput.value === "credit-user") {
    requestTarget = 'Потребительский кредит';
    requestPrice = 'Сумма кредита';
    hidden = `style="display: none;"`;
  }
  requestWrap.insertAdjacentHTML(
    "afterbegin",
    `<div class="calc__request-item">
        <p>Номер заявки</p>
        <span>№ ${requestNumber}</span>
        </div>
  
        <div class="calc__request-item">
        <p>Цель кредита</p>
        <span>${requestTarget}</span>
        </div>
  
        <div class="calc__request-item">
        <p>${requestPrice}</p>
        <span>${generalSum} рублей</span>
        </div>
  
        <div class="calc__request-item" ${hidden}>
        <p>Первоначальный взнос</p>
        <span>${procentSum} рублей</span>
        </div>
  
        <div class="calc__request-item">
        <p>Срок кредитования</p>
        <span>${dateSum} лет</span>
      </div>`
  );
};
