/* отображает значения для offer */
const getOffer = () => {
  if (calcSelect.value === "Ипотечное кредитование") {
    if (sumCredit < 500000) {
      offerFailedText.textContent = `Наш банк не выдыет ипотечные кредиты меньше 500000 рублей`;
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = sumCredit;
      offerProc.textContent = procRate;
      offerMonthpay.textContent = payMonth;
      offerMonthprofit.textContent = profitMonth;
    }
  } else if (calcSelect.value === "Автомобильное кредитование") {
    if (sumCredit < 200000) {
      offerFailedText.textContent = `Наш банк не выдыет автокредиты меньше 200000 рублей`;
      offerFailed.classList.remove("visually-hidden");
      offerSuccess.classList.add("visually-hidden");
    } else {
      offerFailed.classList.add("visually-hidden");
      offerSuccess.classList.remove("visually-hidden");
      offerSum.textContent = sumCredit;
      offerProc.textContent = procRate;
      offerMonthpay.textContent = payMonth;
      offerMonthprofit.textContent = profitMonth;
    }
  } else {
    if (calcSelect.value === "Потребительский кредит") {
      offerSum.textContent = sumCredit;
      offerProc.textContent = procRate;
      offerMonthpay.textContent = payMonth;
      offerMonthprofit.textContent = profitMonth;
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
        <p>Стоимость недвижимости</p>
        <span>${generalSum} рублей</span>
        </div>
  
        <div class="calc__request-item">
        <p>Первоначальный взнос</p>
        <span>${procentSum} рублей</span>
        </div>
  
        <div class="calc__request-item">
        <p>Срок кредитования</p>
        <span>${dateSum} лет</span>
      </div>`
  );
};
