/* eslint-disable */


/* модальное окно - Спасибо за обращение */
var esc = 27;
const overlay = document.getElementById("overlay");
const offrOverlay = document.getElementById("offer-overlay");
const iconClose = document.getElementById("close-overlay");
const inputLogin = document.getElementById("login");

let closeOverlay = (target) => {
  overlay.classList.add("visually-hidden");
  target.classList.add("visually-hidden");
  body.style.overflow = "auto";
};

let openOverlay = (target) => {
  overlay.classList.remove("visually-hidden");
  target.classList.remove("visually-hidden");
  body.style.overflow = "hidden";
  inputLogin.focus();
};

/* закрытие модального окна */
iconClose.onclick = () => {
  closeOverlay(offrOverlay);
};

window.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.code === "Escape" || e.keyCode === esc) {
    closeOverlay(offrOverlay);
  }
});

/* Модальное окно */
const enterCabinet = document.getElementById("enter-cabinet");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const showPassword = document.getElementById("show-password");
const inputPassword = document.getElementById("password");

enterCabinet.onclick = () => {
  openOverlay(modal);
};

modalClose.onclick = () => {
  closeOverlay(modal);
};

overlay.onclick = (e) => {
  if (modal.classList.contains("visually-hidden")) {
    closeOverlay(offrOverlay);
  } else if (offrOverlay.classList.contains("visually-hidden")) {
    closeOverlay(modal);
  }
};

window.addEventListener("keydown", function (e) {
  if (e.code === "Escape" || e.keyCode === esc) {
    if (modal.classList.contains("visually-hidden")) {
      closeOverlay(offrOverlay);
    } else if (offrOverlay.classList.contains("visually-hidden")) {
      closeOverlay(modal);
    }
  }
});

showPassword.onclick = () => {
  console.dir(inputPassword);
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
  } else {
    inputPassword.type = "password";
  }
};
