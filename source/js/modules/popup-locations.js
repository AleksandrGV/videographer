// Popup slider functionaliry

const galleryPopupLocations = document.querySelector('.popup-opacity--locations-gallery');
const popupLocations = document.querySelector('.popup-locations');
const galleryList = document.querySelector('.popup-locations__list');
const locationsItems = document.querySelectorAll('.slider-our-locations__item');
const locationsLink = document.querySelectorAll('.slider-our-locations__link');
// const buttonOpenSliderLocations = document.querySelectorAll('.button--open-slider-locations');
const btnCloseLocationsGallery = document.querySelector('.button-close--locations-gallery');

const galleryPrevBtn = document.querySelector('#popup-locations-left');
const galleryNextBtn = document.querySelector('#popup-locations-right');
const galleryItems = [];
let currentSlideIndex = 0;

//Fill gallery with images (Заполнить popup slider изображениями)

const initGallery = () => {
    galleryList.innerHTML = '';
    locationsItems.forEach(item => {
        const img = item.querySelector('img');

        const slide = document.createElement('li');
        slide.className = 'popup-locations__item';
        slide.innerHTML = `<img class="popup-locations__img" src="${img.src}" alt="${img.alt}">
        <p class="popup-locations__text">${img.alt}</p>`;
        galleryList.appendChild(slide);
        galleryItems.push(slide);
    });
};

const updateGalleryPosition = () => {
    galleryList.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
};

//Open gallery with specific slide (Открыть галерею с определенным слайдом)
const openGallery = (index) => {
    if(galleryItems.length === 0) initGallery();

    currentSlideIndex = index;
    // galleryList.style.transform = `translateX(-${index * 100}%)`;
    updateGalleryPosition();
    galleryPopupLocations.classList.add('popup-opacity--show');
    popupLocations.classList.add('popup-locations--show');
    document.body.classList.add('no-scroll');
};

// инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    locationsLink.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openGallery(index);
        });
    });
});

//Close gallery (Закрыть попап слайдера c jxbcnrjq)
const closeGallery = () => {
    galleryPopupLocations.classList.remove('popup-opacity--show');
    popupLocations.classList.remove('popup-locations--show');
    document.body.classList.remove('no-scroll');

    //Очистка через 300ms (после завершения анимации)
    setTimeout(() => {
        galleryList.innerHTML = '';
        galleryItems.length = 0;
    }, 300);
};

//Navigation controls
galleryPrevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : document.querySelectorAll('.popup-locations__item').length - 1;
    updateGalleryPosition();
});

galleryNextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex < document.querySelectorAll('.popup-locations__item').length - 1) ? currentSlideIndex + 1 : 0;
    updateGalleryPosition();
});

//Close gallery
btnCloseLocationsGallery.addEventListener('click', closeGallery);

//Close when clicking outside
galleryPopupLocations.addEventListener('click', (e) => {
    if(e.target === galleryPopupLocations) {
        closeGallery();
    }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if(galleryPopupLocations.classList.contains('popup-opacity--show') || popupLocations.classList.contains('popup-locations--show')) {
        if(e.keyCode === 27) {
            closeGallery();
        } else if (e.key === 'ArrowLeft') {
            currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : locationItems.length - 1;
            updateGalleryPosition();
        } else if (e.key === 'ArrowRight') {
            currentSlideIndex = (currentSlideIndex < locationItems.length - 1) ? currentSlideIndex + 1 : 0;
            updateGalleryPosition();
        }
    }
});
