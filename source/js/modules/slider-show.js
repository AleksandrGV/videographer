//Slider show

const slider = document.querySelector('.slider-show');
const sliderList = slider.querySelector('.slider-show__list');
const sliderItem = slider.querySelectorAll('.slider-show__item');

const btnLeft = slider.querySelector('.control--left');
const btnRight = slider.querySelector('.control--right');

const dots = slider.querySelector('.dots');
const dotsBtn = dots.querySelectorAll('.dots__button');

let current = 0;
let prev = 4;
let next = 1;

//Функция перелистывания слайдов кнопкой назад
const gotoPrev = () => current > 0 ? showSlides(current - 1) : showSlides(sliderItem.length - 1);

//Функция перелистывания слайдов кнопкой вперед
const gotoNext = () => current < 4 ? showSlides(current + 1) : showSlides(0);

//Функция показа слайдов и dots
const showSlides = (number) => {
  current = number;
  prev = current - 1;
  next = current + 1;

  for (let i = 0; i < sliderItem.length; i++) {
    sliderItem[i].classList.remove("slider-show__item--active");
    sliderItem[i].classList.remove("slider-show__item--prev");
    sliderItem[i].classList.remove("slider-show__item--next");
  }

  if (next == 5) {
    next = 0;
  }

  if (prev == -1) {
    prev = 4;
  }

  //Перебираем кнопки (dots) переключения слайдов если текущий слайд и кнопка не активны удаляем класс dots__button--active
  for (let j = 0; j < dotsBtn.length; j++) {
      dotsBtn[j].classList.remove('dots__button--active')
  }
    //Активной кнопке (dots) присваеваем класс dots__button--active
    dotsBtn[current].classList.add('dots__button--active');

    sliderItem[current].classList.add("slider-show__item--active");
    sliderItem[prev].classList.add("slider-show__item--prev");
    sliderItem[next].classList.add("slider-show__item--next");
  }

  //Обработчки событий клика принажатии на левую кнопку
  btnLeft.addEventListener('click', gotoPrev);

  //Обработчки событий клика принажатии на правую кнопку
  btnRight.addEventListener('click', gotoNext);

  //Обработчик событий для кнопок (dots)
  dots.addEventListener('click', (evt) => {
    //Перебираем в цикле элементы массива кнопок (dots)
    for (let i = 0; i< dotsBtn.length + 1; i++) {
      if(evt.target.classList.contains('dots__button') && evt.target == dotsBtn[i]) {
        showSlides(i);
      }
    }
  });
