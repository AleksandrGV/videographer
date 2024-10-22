//Popup contacts form

/*Ищем подходящий селектор во всем документе*/
const popupOpacity = document.querySelector('.popup-opacity');
const popupContactsForm = document.querySelector('.popup-contacts-form');
const buttonOpenForm = document.querySelectorAll('.button--open-form');

/*Ищем подходящий селектор в форме*/
const popupClose = popupContactsForm.querySelector(".button-close");
const formFeedback = popupContactsForm.querySelector('.contacts-form');
const nameField = popupContactsForm.querySelector('.contacts-form__input--name');
const emailField = popupContactsForm.querySelector('.contacts-form__input--email');

/*Не все браузеры поддерживают localStorage поэтому проверим работоспособность.*/
let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

/*Обработчик событй для отображения формы */
for (let i = 0; i < buttonOpenForm.length; i++) {
  buttonOpenForm[i].addEventListener('click', function(evt) {

 /*Стандартное действие по умолчанию у ссылки переход на другую страницу.
 Такое поведение нам не нужно, поэтому отключим его.*/
    evt.preventDefault();
    popupContactsForm.classList.add('popup-contacts-form--show');
    if('popup-contacts-form--show') {
      popupOpacity.classList.add('popup-opacity--show');
    } else {
      popupOpacity.classList.remove('popup-opacity--show');
    }
    // if(storage) {
    //   nameField.value = storage;
    //   emailField.focus();
    //  } else {
    // /*Установим фокус при открытии модального окна в поле ввода логина. */
    //   nameField.focus();
    // }
  });
};

  /*Обработчик событий для закрытия формы*/

  popupClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupContactsForm.classList.remove('popup-contacts-form--show');
    // popupContactsForm.classList.remove('popup-form--error');
    popupOpacity.classList.remove('popup-opacity--show');
  });

  // /*Повесим обработчик отправки данных на форму и отменим его. */

  formFeedback.addEventListener('submit', function(evt) {
    if(!nameField.value || !emailField.value) {
      evt.preventDefault();
      popupContactsForm.classList.remove("popup-form-error");
      popupContactsForm.offsetWidth = popupContactsForm.offsetWidth;
      popupContactsForm.classList.add("popup-form-error");
    } else {
      if (isStorageSupport) {
        console.log(localStorage.setItem('name', nameField.value));
      }
    }
  });

  /*Добавим обработчик события, который будет отлавливать
  нажатие кнопки Esc и в случае, если модальное окно открыто, закрывать его.*/

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (popupContactsForm.classList.contains('popup-contacts-form--show') || popupOpacity.classList.contains('popup-opacity--show')) {
        evt.preventDefault();
        popupContactsForm.classList.remove('popup-contacts-form--show');
        // popupContactsForm.classList.remove('popup-form--error');
        popupOpacity.classList.remove('popup-opacity--show');
      }
    }
  });
