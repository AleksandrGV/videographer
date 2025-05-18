// Раскрытие скрытие текста

const points = document.querySelectorAll('.points');
const moreDetails = document.querySelectorAll('.more-details');
const moreDetailsBtn = document.querySelectorAll('.presentation__button');
const continuation = document.querySelectorAll('.continuation');

for ( let i = 0; i < moreDetailsBtn.length; i++) {
  moreDetailsBtn[i].addEventListener('click', () => {
    if (moreDetailsBtn[i].classList.contains('presentation__button--open')) {
      //Закрываем блок
      points[i].style.maxHeight = 'none';
      moreDetailsBtn[i].innerHTML = 'Подробнее';
      moreDetailsBtn[i].classList.remove('presentation__button--open');
      moreDetails[i].style.maxHeight = '0';
      continuation[i].style.maxHeight = '0';
    } else {
      //Открываем блок
      points[i].style.maxHeight = '0';
      moreDetailsBtn[i].innerHTML = 'Скрыть';
      moreDetailsBtn[i].classList.add('presentation__button--open');
      moreDetails[i].style.maxHeight = moreDetails[i].scrollHeight + 'px';
      continuation[i].style.maxHeight = continuation[i].scrollHeight + 'px';
    }
  });
};

