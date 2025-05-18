// Popup slider functionaliry

const popupSliderShowGallery = document.querySelector('.popup-opacity--slider-show-gallery');
const popupSliderShowGalleryWrap = document.querySelector('.popup-slider-show-gallery-wrap');
const popupSliderShowGalleryList = document.querySelector('.popup-slider-show-gallery__list');
const sliderShowGallerySliderShowItems = document.querySelectorAll('.slider-show__item');
const sliderShowGalleryLink = document.querySelectorAll('.slider-show__link');

const btnCloseSliderShowGallery = document.querySelector('.button-close--slider-show-gallery');

const galleryLeftBtn = document.querySelector('#popup-slider-show-gallery-left');
const galleryRightBtn = document.querySelector('#popup-slider-show-gallery-right');
const gallerySliderShowItems = [];
let currentSliderShowIndex = 0;

//Fill gallery with images (Заполнить popup slider изображениями)

const initSliderShowGallery = () => {
    popupSliderShowGalleryList.innerHTML = '';
    sliderShowGallerySliderShowItems.forEach(item => {
        const img = item.querySelector('img');

        const slide = document.createElement('li');
        slide.className = 'popup-slider-show-gallery__item';
        slide.innerHTML = `<img class="popup-slider-show-gallery__img" src="${img.src}" alt="${img.alt}">
        <p class="popup-slider-show-gallery__text">${img.alt}</p>`;
        popupSliderShowGalleryList.appendChild(slide);
        gallerySliderShowItems.push(slide);
    });
};

const updateSliderShowGalleryPosition = () => {
    popupSliderShowGalleryList.style.transform = `translateX(-${currentSliderShowIndex * 100}%)`;
};

//Open gallery with specific slide (Открыть галерею с определенным слайдом)
const openSliderShowGallery = (index) => {
    if(gallerySliderShowItems.length === 0) initSliderShowGallery();
    
    currentSliderShowIndex = index;
    // popupSliderShowGalleryList.style.transform = `translateX(-${index * 100}%)`;
    updateSliderShowGalleryPosition();
    popupSliderShowGallery.classList.add('popup-opacity--show');
    popupSliderShowGalleryWrap.classList.add('popup-slider-show-gallery-wrap--show');
    document.body.classList.add('no-scroll');
};

// инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    sliderShowGalleryLink.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openSliderShowGallery(index);
        });
    });
});

//Close gallery (Закрыть попап слайдера c jxbcnrjq)
const closeShowGallery = () => {
    popupSliderShowGallery.classList.remove('popup-opacity--show');
    popupSliderShowGalleryWrap.classList.remove('popup-slider-show-gallery-wrap--show');
    document.body.classList.remove('no-scroll');

    //Очистка через 300ms (после завершения анимации)
    setTimeout(() => {
        popupSliderShowGalleryList.innerHTML = '';
        gallerySliderShowItems.length = 0;
    }, 300);
};

//Navigation controls
galleryLeftBtn.addEventListener('click', () => {
    currentSliderShowIndex = (currentSliderShowIndex > 0) ? currentSliderShowIndex - 1 : document.querySelectorAll('.popup-slider-show-gallery__item').length - 1;
    updateSliderShowGalleryPosition();
});

galleryRightBtn.addEventListener('click', () => {
    currentSliderShowIndex = (currentSliderShowIndex < document.querySelectorAll('.popup-slider-show-gallery__item').length - 1) ? currentSliderShowIndex + 1 : 0;
    updateSliderShowGalleryPosition();
});

//Close gallery
btnCloseSliderShowGallery.addEventListener('click', closeShowGallery);

//Close when clicking outside
popupSliderShowGallery.addEventListener('click', (e) => {
    if(e.target === popupSliderShowGallery) {
        closeShowGallery();
    }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if(popupSliderShowGallery.classList.contains('popup-opacity--show') || popupSliderShowGalleryWrap.classList.contains('popup-slider-show-gallery-wrap--show')) {
        if(e.keyCode === 27) {
            closeShowGallery();
        } else if (e.key === 'ArrowLeft') {
            currentSliderShowIndex = (currentSliderShowIndex > 0) ? currentSliderShowIndex - 1 : locationItems.length - 1;
            updateSliderShowGalleryPosition();
        } else if (e.key === 'ArrowRight') {
            currentSliderShowIndex = (currentSliderShowIndex < locationItems.length - 1) ? currentSliderShowIndex + 1 : 0;
            updateSliderShowGalleryPosition();
        }
    }
});