// Popup locations form

/*Ищем подходящий селектор во всем документе*/
const popupOpacityLocations = document.querySelector('.popup-opacity--locations');
const buttonOpenFormLocations = document.querySelectorAll('.button--open-locations');
const popupLocationsForm = document.querySelector('.popup-locations-form');

/*Ищем подходящий селектор в форме*/
const popupCloseLocations = document.querySelectorAll('.button-close--locations');

/*Ищем подходящий селектор в форме locations*/
const formLocations = popupLocationsForm.querySelector('.locations-form');
const nameLocations = popupLocationsForm.querySelector('.locations-form__input--name');
const emailLocations = popupLocationsForm.querySelector('.locations-form__input--email');

/*Не все браузеры поддерживают localStorage поэтому проверим работоспособность.*/
// let isStorageSupport = true;
// let storage = '';

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

/*Обработчик событй для отображения формы locations*/
for (let i = 0; i < buttonOpenFormLocations.length; i++) {
  buttonOpenFormLocations[i].addEventListener('click', function(evt) {

 /*Стандартное действие по умолчанию у ссылки переход на другую страницу.
 Такое поведение нам не нужно, поэтому отключим его.*/
    evt.preventDefault();
    popupLocationsForm.classList.add('popup-locations-form--show');
    // if('popup-contacts-form--show') {
    if('popup-locations-form--show') {
      popupOpacityLocations.classList.add('popup-opacity--show');
    } else {
      popupOpacityLocations.classList.remove('popup-opacity--show');
    }
    if(storage) {
      nameField.value = storage;
      emailField.focus();
     } else {
    /*Установим фокус при открытии модального окна в поле ввода логина. */
      nameField.focus();
    }
  });
};

  /*Обработчик событий для закрытия формы*/
  for (let i = 0; i < popupCloseLocations.length; i++) {
    popupCloseLocations[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      popupOpacityLocations.classList.remove('popup-opacity--show');
      popupLocationsForm.classList.remove('popup-locations-form--show');
    });

   // /*Повесим обработчик отправки данных на форму ретуши и отменим его.
// если поле пустое отправки не будет */
    formLocations.addEventListener('submit', function(evt) {
      if(!numberRetouch.value) {
        evt.preventDefault();
        popupLocationsForm.classList.remove("popup-form-error");
        popupLocationsForm.offsetWidth = popupLocationsForm.offsetWidth;
        popupLocationsForm.classList.add("popup-form-error");
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
      if (popupLocationsForm.classList.contains('popup-locations-form--show') || popupOpacityLocations.classList.contains('popup-opacity--show')) {
        evt.preventDefault();
        popupLocationsForm.classList.remove('popup-locations-form--show');
        popupLocationsForm.classList.remove('popup-form--error');
        popupOpacityLocations.classList.remove('popup-opacity--show');
      }
    }
  });
