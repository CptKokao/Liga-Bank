"use strict";

const body = document.querySelector("body")
const inputRealty = document.getElementById("calc-realty");
const inputFirstpay = document.getElementById("calc-firstpay");
const inputFirstpayRange = document.getElementById("calc-firstpay-range");
const inputDateRange = document.getElementById("calc-date-range");
const inputDate = document.getElementById("calc-date");

const calcFlex = document.getElementById("calc__flex");




const calcTitle = document.getElementById("calc-title");
const calcCost = document.getElementById("calc-cost");
const calcDateFirst = document.getElementById("calc-date-first");
const calcDateLast = document.getElementById("calc-date-last");


const calcPlus = document.getElementById("calc-plus");
const calcMinus = document.getElementById("calc-minus");
const calcRealtyError = document.getElementById("calc-realty-error");
const calcProcentValue = document.getElementById("calc-firstpay-value");
const calcFirstpayError = document.getElementById("calc-fistpay-error");

const checkboxСapital = document.getElementById("calc-extra-capital");
const checkboxKacko = document.getElementById("calc-extra-kacko");
const checkboxLife = document.getElementById("calc-extra-life");
const checkboxProject = document.getElementById("calc-extra-project");

const calcStepCheckbox = document.querySelectorAll(".calc__step-checkbox");
const calcCheckbox = document.querySelectorAll(".calc__step-checkbox input[type=checkbox]");

const offerSuccess = document.getElementById("offer-success");
const offerFailed = document.getElementById("offer-failed");
const offerFailedText = document.getElementById("offer-failed-text");
const offerSuccessText = document.getElementById("offer-success-text");

const offerBtn = document.getElementById("offer-btn");

const request = document.getElementById("request");
const requestWrap = document.getElementById("request-wrap");
const requestBtn = document.getElementById("request-btn");
const requestForm = document.getElementById("request-form");
const inputs = document.querySelectorAll(".calc__request-form input");
const formName = document.getElementById("name");
const formPhone = document.getElementById("phone");
const formEmail = document.getElementById("email");
let requestNumber = 0;
let requestTarget;

const defValue = 2000000;
const capital = 470000;

let generalSum; // стоимость недвижимости
let procentSum; // сумма первоначальный взнос
let procRate; // % первоначального взноса
let procRateMonth; // процентная ставка
let dateSum; // срок кредитования
let sumCredit; // сумма кредита(с вычитом первоначального взноса)
let payMonth; // ежемесячный платеж
let profitMonth; // ежемесячный платеж

const offerSum = document.getElementById("calc-offer-sum"); 
const offerProc = document.getElementById("calc-offer-proc"); 
const offerMonthpay = document.getElementById("calc-offer-monthpay"); 
const offerMonthprofit = document.getElementById("calc-offer-monthprofit");