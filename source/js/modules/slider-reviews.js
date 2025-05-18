//Slider reviews

//Общее количество слайдов в слайдере
const NUMBER_OF_SLIDES = 3;

//Ширина одного слайда
const WIDTH_SLIDE = 340;

//Размер gap
const GAP = 24;


const NAME = ['Мария', 'Сергей', 'Руслан'];
const IMAGES = ['maria.png', 'sergey.png', 'ruslan.png'];
const TEXT = ['Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю.',
              'Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю.',
              'Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю. Съешь еще этих мягких французских булок, да выпей чаю.']

const sliderPlace = document.querySelector('.slider-reviews__list'); //Получаем доступ к слайдеру
const widthOffset = document.querySelector('.slider-reviews').offsetWidth; //Получаем доступ к ширине элемента слайдер
const slideTemplate = document.querySelector('#slide-template').content.querySelector('.slider-reviews__item'); //Получаем доступ к элементу template

const prevButton = document.querySelector('.control-reviews--left'); //получаем доступ к следующей кнопке
const nextButton = document.querySelector('.control-reviews--right'); //получаем доступ к предыдущей кнопке

//Для разных экранов
const mediaQuery = {
    desktop: window.matchMedia('(min-width: 1301px)'),
    tablet: window.matchMedia('(min-width: 900px) and (max-width: 1300px'),
    mobile: window.matchMedia('(max-width: 899px)'),
};

//будем хранить номер активного слайда
let activeImage = 0;
//флаг будет срабатывать при многократном нажатия кнопки
let flag = true;

if (mediaQuery.mobile.matches) {
    //присваиваем ширину равную блоку из одной картинки
    sliderPlace.style.width = widthOffset + 'px';
}

if (mediaQuery.tablet.matches) {
    sliderPlace.style.width = ((WIDTH_SLIDE * 2) + GAP) + 'px';
}

if (mediaQuery.desktop.matches) {
    sliderPlace.style.width = ((WIDTH_SLIDE * 3) + GAP) + 'px';
}


// Обновляет стили активного слайда
const updateActiveSlide = (active) => {
     const sliderItem = sliderPlace.querySelectorAll('.slider-reviews__item');
     sliderItem.forEach(slide => {
       slide.classList.remove('active');
       slide.style.transform = 'none';
    });

    // Добавляем класс и стили активному слайду
    const activeSlide = active;
    if (activeSlide) {
      activeSlide.classList.add('active');
      activeSlide.style.transform = 'translateY(-121px)';
 }
};


//функция отрисовки изображений (слайдов)
const initSlider = () => {
    const slideCloneActive = slideTemplate.cloneNode(true);

    	slideCloneActive.querySelector('.revievs-card');
        slideCloneActive.querySelector('.reviews-card__img').setAttribute('src', `img/${IMAGES[activeImage]}`);
        slideCloneActive.querySelector('.reviews-card__img').setAttribute('alt', `${IMAGES[activeImage]}`);
        slideCloneActive.querySelector('.reviews-card__title').textContent = NAME[activeImage];
        slideCloneActive.querySelector('.reviews-card__text').textContent = TEXT[activeImage];
        slideCloneActive.classList.add('active');
    sliderPlace.append(slideCloneActive);
    nextImageGenerate();
    prevImageGenerate();
};

//функция генерации следующего изображени относительно активного
const nextImageGenerate = () => {
    //прибавим к текущему изображению 1 и новое значение сохраним в переменную nextImage
    let nextImage = activeImage + 1;
    //Сделаем проверку если следующий слайд больше длины массива
    if(nextImage >= NUMBER_OF_SLIDES) {
        //то присваиваем nextImage 0
        nextImage = 0;
    }

    const slideCloneNext = slideTemplate.cloneNode(true);
    	slideCloneNext.querySelector('.revievs-card');
        slideCloneNext.querySelector('.reviews-card__img').setAttribute('src', `img/${IMAGES[nextImage]}`);
        slideCloneNext.querySelector('.reviews-card__img').setAttribute('alt', `${IMAGES[nextImage]}`);
        slideCloneNext.querySelector('.reviews-card__title').textContent = NAME[nextImage];
        slideCloneNext.querySelector('.reviews-card__text').textContent = TEXT[nextImage];
    sliderPlace.append(slideCloneNext);
};

//функция генерации предыдущего изображени относительно активного
//аргумент позволяет отслеживать ширину слайда
const prevImageGenerate = (widthElement = false) => {
    //отнимем от текущего изображения 1 и новое значение сохраним в переменную prevImage
    let prevImage = activeImage - 1;

    //Сделаем проверку если предыдущий слайд меньше 0
    if(prevImage < 0) {
        //то присваиваем prevImage последний элемент массива
        prevImage = NUMBER_OF_SLIDES - 1;
    }

    const slideClonePrev = slideTemplate.cloneNode(true);
    	slideClonePrev.querySelector('.revievs-card');
        slideClonePrev.querySelector('.reviews-card__img').setAttribute('src', `img/${IMAGES[prevImage]}`);
        slideClonePrev.querySelector('.reviews-card__img').setAttribute('alt', `${IMAGES[prevImage]}`);
        slideClonePrev.querySelector('.reviews-card__title').textContent = NAME[prevImage];
        slideClonePrev.querySelector('.reviews-card__text').textContent = TEXT[prevImage];

        if(widthElement) {
            slideClonePrev.style.width = 0;
        }
        //добавим созданное изображение в sliderPlace до текущего изображения
        sliderPlace.prepend(slideClonePrev);
};


//функция перелистывания к следующему слайду
const nextSlide = () => {
    //проверка на частое нажатие кнопки ждем до конца анимации
    if(!flag) return;
    flag = !flag;
    //прибавляем 1 слайд
    activeImage++;
    //проверка если слайд больше длины массива присваиваем 0
    if(activeImage >= NUMBER_OF_SLIDES) {
        activeImage = 0;
    }
    nextImageGenerate();

    //Используем класс active для слайда только на desktop
    if(mediaQuery.desktop.matches) {
        //Присвоим активный слайд
        const activeSlide = document.querySelector('.slider-reviews__item:nth-child(3)');
        //Вызовем функция с активным слайдом
        updateActiveSlide(activeSlide);
    }
    //вызываю функцию анимации
    animate({
        duration: 1000,
        draw: function(progress) {

            document.querySelector('.slider-reviews__item:last-child').style.width = (widthOffset * progress) + 'px',

            //получаем доступ к первому слайду (картинке)
            document.querySelector('.slider-reviews__item').style.width = widthOffset * (1 - progress) + 'px'

        },
        //удаляем первый слайд после окончания анимации
        removeElement: document.querySelector('.slider-reviews__item')
    });
};

//функция перелистывания к предыдущему слайду
const prevSlide = () => {
    //проверка на частое нажатие кнопки ждем до конца анимации
    if(!flag) return;
    flag = !flag;
    //вычитаем 1 слайд
    activeImage--;
    //если слайд меньше 0
    if (activeImage < 0) {
        //присвоить activeImage последний слайд в массиве
        activeImage = NUMBER_OF_SLIDES - 1;
    }

    prevImageGenerate(true);

    //Используем класс active для слайда только на desktop
    if(mediaQuery.desktop.matches) {
        const activeSlide = document.querySelector('.slider-reviews__item:nth-child(2)');

        updateActiveSlide(activeSlide);
    }

    //вызываю функцию анимации
    animate({
        duration: 1000,
        draw: function(progress) {

                //получаем доступ к первому слайду (картинке)
                document.querySelector('.slider-reviews__item').style.width = (widthOffset * progress) + 'px',

                document.querySelector('.slider-reviews__item:last-child').style.width = widthOffset * (1 - progress) + 'px'

            },
            //удаляем последний слайд после окончания анимации
            removeElement: document.querySelector('.slider-reviews__item:last-child')
        });
};

//Функция анимации которая принимает объект с 3 ключами,
// 1 время анимации,
// 2 ссылка на функцию которая рисует анимацию,
// 3 ссылка на элемент который нужно удалить
const animate = ({duration, draw, removeElement}) => {
    //получим текущее (начальное) время
    const start = performance.now();
    console.log(start);
    //расчитаем время анимации (количество шагов)
    //пишем метод > который принимает функцию через рекурсивную ссылку > передаю аргумент время
    requestAnimationFrame(function animate(time) {
        //расчитаем количество шагов
        let step = (time - start) / duration;
        console.log(step);
        //сделать проверки если количество шагов больше 1 step = 1
        if(step > 1) {
            step = 1;
        }
        //иначе делаем анимацию
        draw(step);
        //если шаг менее 1
        if(step < 1) {
            //снова пишем и ссылку на функцию
            requestAnimationFrame(animate);
        }
        //иначе удаляем помеченный на удаление элемент
        else {
            removeElement.remove();
            flag = true;
        }
    });
};

//запускаем функции
 initSlider();

//вешаем кнопки на обработчик событий
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
