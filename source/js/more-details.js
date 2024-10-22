// Раскрытие скрытие текста

const points = document.querySelectorAll('.points');
const moreDetails = document.querySelectorAll('.more-details');
const moreDetailsBtn = document.querySelectorAll('.presentation__button');
const continuation = document.querySelectorAll('.continuation');

for ( let i = 0; i < moreDetailsBtn.length; i++) {
  moreDetailsBtn[i].addEventListener('click', () => {
    if (points[i].style.display === 'none') {
      points[i].style.display = 'inline';
      moreDetailsBtn[i].innerHTML = 'Подробнее';
      moreDetailsBtn[i].classList.remove('presentation__button--open');
      moreDetails[i].style.display = 'none';
      continuation[i].style.display = 'none';
    } else {
      points[i].style.display ='none';
      moreDetailsBtn[i].innerHTML = 'Скрыть';
      moreDetailsBtn[i].classList.add('presentation__button--open');
      moreDetails[i].style.display = 'flex';
      continuation[i].style.display = 'inline';
    }
  });
};
