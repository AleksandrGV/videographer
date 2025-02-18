const sliderWrapper = document.querySelector('.slider-our-locations');
const sliderOurLocations = document.querySelector('.slider-our-locations__list');
const firstCardWidth = sliderOurLocations.querySelector('.slider-our-locations__item').offsetWidth;
const arrowBtns = document.querySelectorAll('.control-our-locations');
const sliderChildrens = [...sliderOurLocations.children];

let isDragging = false;
let isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards thet can fit in the sliderOurLocations at once
// Получим количество карточек, которые могут поместиться в карусели одновременно.
let cardPerView = Math.round(sliderOurLocations.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of sliderOurLocations for infinite scrolling
// Вставляем копии последних нескольких карточек в начало карусели для бесконечной прокрутки.
sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
  sliderOurLocations.insertAdjacentHTML('afterbegin', card.outerHTML);
});

// Insert copies of the first few cards to end of sliderOurLocations for infinite scrolling
// Вставляем копии первых нескольких карточек в конец карусели для бесконечной прокрутки.
sliderChildrens.slice(0, cardPerView).forEach(card => {
  sliderOurLocations.insertAdjacentHTML('beforeend', card.outerHTML);
});

// Scroll the sliderOurLocations at appropriate postition to hide first few duplicate cards on Firefox
// Прокрутим карусель в нужном месте, чтобы скрыть первые несколько дубликатов карточек в Firefox.
sliderOurLocations.classList.add('no-transition');
sliderOurLocations.scrollLeft = sliderOurLocations.offsetWidth;
sliderOurLocations.classList.remove('no-transition');

// Add event listeners for the arrow buttons to scroll the sliderOurLocations left and right
// Добавим прослушиватели событий для кнопок со стрелками для прокрутки карусели влево и вправо.
arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sliderOurLocations.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
    });
});

const infiniteScroll = () => {
    // If the slider is at the biginning, scroll to the end
    // Если карусель находится в самом начале, прокрутим до конца
    if(sliderOurLocations.scrollLeft === 0) {
      sliderOurLocations.classList.add('no-transition');
      sliderOurLocations.scrollLeft = sliderOurLocations.scrollWidth - (2 * sliderOurLocations.offsetWidth);
      sliderOurLocations.classList.remove('no-transition');
    } else if (Math.ceil(sliderOurLocations.scrollLeft) === sliderOurLocations.scrollWidth - sliderOurLocations.offsetWidth) {
      sliderOurLocations.classList.add('no-transition');
      sliderOurLocations.scrollLeft = sliderOurLocations.offsetWidth;
      sliderOurLocations.classList.remove('no-transition');
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over slider
    // Очистим существующий тайм-аут и запустить автовоспроизведение, если мышь не наведена на карусель.
    clearTimeout(timeoutId);
    if(!sliderWrapper.matches(':hover')) autoPlay();
};

const autoPlay = () => {
    // Return if window is smaller that 800 or isAutoPlay is false
    // Возврат, если окно меньше 800 или isAutoPlay имеет значение false
    if(window.innerWidth < 800 || !isAutoPlay) return;
    // AutoPlay the slider after every 2500 ms
    // Автозапуск карусели каждые 2500 мс
    timeoutId = setTimeout( () => sliderOurLocations.scrollLeft += firstCardWidth, 2500);
};
autoPlay();


sliderOurLocations.addEventListener('scroll', infiniteScroll);
sliderWrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
sliderWrapper.addEventListener('mouseleave', autoPlay);
