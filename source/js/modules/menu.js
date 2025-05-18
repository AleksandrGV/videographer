// Навигиция сайта

const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const menuList = menu.querySelector('.menu__list');
const menuToggle = document.querySelector('.menu__toggle');

header.classList.remove('header--nojs');
menu.classList.add('menu--closed');
menu.classList.remove('menu--nojs');

menuToggle.addEventListener('click', function() {
  if (menu.classList.contains('menu--closed')) {
    menu.classList.remove('menu--closed');
    menu.classList.add('menu--open');
    menuList.style.transition = 'all 1s ease-in-out';
  } else {
    menu.classList.add('menu--closed');
    menu.classList.remove('menu--open');
  }
});
