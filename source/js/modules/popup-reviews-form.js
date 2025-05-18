//Popup reviews form

/*Ищем подходящий селектор во всем документе*/
const popupOpacityReviews = document.querySelector('.popup-opacity--reviews');
const buttonOpenFormReviews = document.querySelectorAll('.button--open-reviews');
const popupReviews = document.querySelector('.popup-reviews-form');

/*Ищем подходящий селектор в форме*/
const popupCloseReviews = document.querySelectorAll('.button-close--reviews');

/*Ищем подходящий селектор в форме комментариев*/
const formReviews = popupReviews.querySelector('.reviews-form');
const reviewsName = popupReviews.querySelector('.reviews-form__input--name');
const reviewsEmail = popupReviews.querySelector('.reviews-form__input--email');
/*Не все браузеры поддерживают localStorage поэтому проверим работоспособность.*/
// let isStorageSupport = true;
// let storage = '';

try {
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

/*Обработчик событий для отображения коментариев формы */
for (let i = 0; i < buttonOpenFormReviews.length; i++) {
  buttonOpenFormReviews[i].addEventListener('click', function(evt) {

 /*Стандартное действие по умолчанию у ссылки переход на другую страницу.
 Такое поведение нам не нужно, поэтому отключим его.*/
    evt.preventDefault();
    popupReviews.classList.add('popup-reviews--show');
    // if('popup-contacts-form--show') {
    if('popup-reviews--show') {
      popupOpacityReviews.classList.add('popup-opacity--show');
    } else {
      popupOpacityReviews.classList.remove('popup-opacity--show');
    }
    if(storage) {
        reviewsName.value = storage;
        reviewsEmail.focus();
    } else {
    /*Установим фокус при открытии модального окна в поле ввода логина. */
    reviewsName.focus();
    }
  });
};

  /*Обработчик событий для закрытия формы*/
  for (let i = 0; i < popupCloseReviews.length; i++) {
    popupCloseReviews[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      popupOpacityReviews.classList.remove('popup-opacity--show');
      popupReviews.classList.remove('popup-reviews--show');
    });

   // /*Повесим обработчик отправки данных на форму комментариев и отменим его.
// если поле пустое отправки не будет */
    formReviews.addEventListener('submit', function(evt) {
      if(!reviewsName.value) {
        evt.preventDefault();
        popupReviews.classList.remove("popup-form-error");
        popupReviews.offsetWidth = popupReviews.offsetWidth;
        popupReviews.classList.add("popup-form-error");
      } else {
        if (isStorageSupport) {
          console.log(localStorage.setItem('name', reviewsName.value));
        }
      }
    });
  };

  /*Добавим обработчик события, который будет отлавливать
  нажатие кнопки Esc и в случае, если модальное окно открыто, закрывать его.*/
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (popupReviews.classList.contains('popup-reviews--show') || popupOpacityReviews.classList.contains('popup-opacity--show')) {
        evt.preventDefault();
        popupReviews.classList.remove('popup-reviews--show');
        popupReviews.classList.remove('popup-form--error');
        popupOpacityReviews.classList.remove('popup-opacity--show');
      }
    }
  });
