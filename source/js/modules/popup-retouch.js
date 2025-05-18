//Popup contacts form

/*Ищем подходящий селектор во всем документе*/
const popupOpacityRetouch = document.querySelector('.popup-opacity--retouch');
const buttonOpenFormRetouch = document.querySelectorAll('.button--open-retouch');
const popupRetouch = document.querySelector('.popup-retouch');

/*Ищем подходящий селектор в форме*/
const popupCloseRetouch = document.querySelectorAll('.button-close--retouch');

/*Ищем подходящий селектор в форме ретушь*/
const formRetouch = popupRetouch.querySelector('.form-retouch');
const numberRetouch = popupRetouch.querySelector('.form-retouch__input');

/*Не все браузеры поддерживают localStorage поэтому проверим работоспособность.*/
// let isStorageSupport = true;
// let storage = '';

try {
  storage = localStorage.getItem('number');
} catch (err) {
  isStorageSupport = false;
}

/*Обработчик событй для отображения формы */
for (let i = 0; i < buttonOpenFormRetouch.length; i++) {
  buttonOpenFormRetouch[i].addEventListener('click', function(evt) {

 /*Стандартное действие по умолчанию у ссылки переход на другую страницу.
 Такое поведение нам не нужно, поэтому отключим его.*/
    evt.preventDefault();
    popupRetouch.classList.add('popup-retouch--show');
    // if('popup-contacts-form--show') {
    if('popup-retouch--show') {
      popupOpacityRetouch.classList.add('popup-opacity--show');
    } else {
      popupOpacityRetouch.classList.remove('popup-opacity--show');
    }
    /*Установим фокус при открытии модального окна в поле ввода числа. */
      numberRetouch.focus();
    // }
  });
};

  /*Обработчик событий для закрытия формы*/
  for (let i = 0; i < popupCloseRetouch.length; i++) {
    popupCloseRetouch[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      popupOpacityRetouch.classList.remove('popup-opacity--show');
      popupRetouch.classList.remove('popup-retouch--show');
    });

   // /*Повесим обработчик отправки данных на форму ретуши и отменим его.
// если поле пустое отправки не будет */
    formRetouch.addEventListener('submit', function(evt) {
      if(!numberRetouch.value) {
        evt.preventDefault();
        popupRetouch.classList.remove("popup-form-error");
        popupRetouch.offsetWidth = popupRetouch.offsetWidth;
        popupRetouch.classList.add("popup-form-error");
      } else {
        if (isStorageSupport) {
          console.log(localStorage.setItem('number', numberRetouch.value));
        }
      }
    });
  };

  /*Добавим обработчик события, который будет отлавливать
  нажатие кнопки Esc и в случае, если модальное окно открыто, закрывать его.*/
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (popupRetouch.classList.contains('popup-retouch--show') || popupOpacityRetouch.classList.contains('popup-opacity--show')) {
        evt.preventDefault();
        popupRetouch.classList.remove('popup-retouch--show');
        // popupContactsForm.classList.remove('popup-form--error');
        popupOpacityRetouch.classList.remove('popup-opacity--show');
      }
    }
  });
