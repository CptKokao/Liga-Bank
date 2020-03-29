// const getMinMax = () => {
//   minRange = generalSum / 100 * 10
//   maxRange = generalSum;
// } 

/* Проверка суммы первоначального взноса */
// const chcekSum = (target, error) => {
//   /* Если валидность false */
//   if (!target.checkValidity()) {
//     /* Если значение больше */
//     if (target.validity.rangeUnderflow) {
//       error.textContent = `Взнос должен быть больше ${minRange}`
//     } else
//     /* Если значение меньше */
//     if (target.validity.rangeOverflow) {
//       error.textContent = `Взнос должен быть меньше ${maxRange}`
//     }
//   /* Если валидность true */
//   } else {
//     error.textContent = ``;
//   }
// }