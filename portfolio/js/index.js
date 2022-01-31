import i18Obj from "./translate.js";

document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.querySelector(".js-nav-btn"), // burger menu btn
    navLink = document.querySelectorAll(".nav__link"), // mobile menu links
    nav = document.querySelector(".js-nav"), // mobile menu
    portfolioBtns = document.querySelector(".js-portfolio"), // btns portfolio
    portfolioImgs = document.querySelectorAll(".js-portfolio-img"), // imgs portfolio
    langRadioBtn = document.querySelector(".lang"), // lang btn
    themeBtn = document.querySelector(".js-theme"); // theme btn

  //  ================== Menu ==================
  function openNav() {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
      navBtn.style.zIndex = "9999";
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }

  function closeNav() {
    nav.classList.remove("open");
    if (!nav.classList.contains("open")) {
      navBtn.children[0].checked = false;
      document.body.removeAttribute("style");
    }
  }

  navLink.forEach((link) => link.addEventListener("click", closeNav)); //закрытие меню
  navBtn.addEventListener("click", openNav); // открытие меню

  // =========== !Menu =========================

  // ============ Portfolio ======================

  portfolioBtns.addEventListener("click", function (e) {
    let btn = e.target;

    if (btn.classList.contains("btn-group__btn")) {
      Array.from(this.children).forEach((item) =>
        item.classList.remove("active-btn")
      );
      btn.classList.add("active-btn");
      changeImage(btn);
    }
  });

  // change photos in the portfolio section
  function changeImage(btn) {
    portfolioImgs.forEach((img, index) => {
      img.classList.add("scale-img");
      img.src = `./assets/portfolio/${btn.dataset.season}/${index + 1}.jpg`;
      img.alt = `${btn.dataset.season}-photo`;
      setTimeout(() => img.classList.remove("scale-img"), 500);
    });
  }

  // ============ !Portfolio ======================

  // ============= Translate ======================

  langRadioBtn.addEventListener("change", function (e) {
    Array.from(e.currentTarget.children).forEach((label) =>
      label.classList.remove("active-lang")
    );
    getTranslate(e.target.id);
  });

  function getTranslate(lang) {
    document.querySelector(`[for="${lang}"]`).classList.add("active-lang"); // backlight active btn

    document.querySelectorAll("[data-i18n]").forEach((elem) => {
      elem.textContent = i18Obj[lang][elem.dataset.i18n];
      localStorage.setItem("lang", lang);
      if (elem.placeholder) {
        elem.placeholder = i18Obj[lang][elem.dataset.i18n];
        elem.textContent = "";
      }
    });
  }

  if (localStorage.getItem("lang") != null) {
    getTranslate(localStorage.getItem("lang"));
  }

  // ============= !Translate ======================

  // ============= Theme ===========================

  themeBtn.addEventListener("click", function (e) {
    this.children[0].classList.add("change-theme");

    setTimeout(() => {
      this.children[0].classList.remove("change-theme");
    }, 900);
    if (this.dataset.theme === "black") {
      this.dataset.theme = "light";
      changeTheme(this.dataset.theme);
      localStorage.setItem("theme", this.dataset.theme);
    } else {
      this.dataset.theme = "black";
      changeTheme(this.dataset.theme);
      localStorage.setItem("theme", this.dataset.theme);
    }
  });

  if (localStorage.getItem("theme") != null) {
    changeTheme(localStorage.getItem("theme"));
  } else {
  }

  function changeTheme(theme) {
    let icon = document.querySelector(".theme-icon > use");
    if (theme === "light") {
      icon.setAttribute("xlink:href", "./assets/img/svg/moon-sprite.svg#moon");
      document.documentElement.style.setProperty("--body-color", "#fff"),
        document.documentElement.style.setProperty("--text-color", "#000");
      themeBtn.dataset.theme = theme;
    } else {
      icon.setAttribute("xlink:href", "./assets/img/svg/sun-sprite.svg#sun");
      document.documentElement.style.setProperty("--body-color", "#000"),
        document.documentElement.style.setProperty("--text-color", "#fff");
      themeBtn.dataset.theme = theme;
    }
  }

  // ============= !Theme ===========================
});

//self-esteem
/*
console.log(`
1. Верстка валидная. +10
  ° Для проверки использован сервис W3C, ошибки отсутствуют\n
2. Вёрстка семантическая. +20 
  В коде странице присутствуют следующие элементы:
  ° <header>, <main>, <footer>
  ° шесть элементов <section>
  ° только один заголовок <h1>
  ° пять заголовков <h2>
  ° один элемент <nav>
  ° два списка ul > li > a
  ° десять кнопок <button>
  ° два инпута: <input type="email"> и <input type="tel">
  ° один элемент <textarea>
  ° три атрибута placeholder\n
3. Вёрстка соответствует макету. +48
  Присутствуют блоки:
  ° блок <header> 
  ° секция hero 
  ° секция skills 
  ° секция portfolio 
  ° секция video 
  ° секция price 
  ° секция contacts 
  ° блок <footer>\n
4. Требования к css. + 12
  °  для построения сетки используются флексы или гриды 
  °  при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону 
  °  фоновый цвет тянется на всю ширину страницы 
  °  иконки добавлены в формате .svg
  °  изображения добавлены в формате .jpg 
  °  есть favicon\n
5. Интерактивность, реализуемая через css. +20
  °  плавная прокрутка по якорям 
  °  ссылки в футере ведут на гитхаб автора проекта и на страницу курса
  °  интерактивность, визуальные эффекты, изменение цвета фона и цвета шрифта. Реализованные на свое усмотрение,руководствуясь общим стилем макета 
  °  плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы\n
  
  POrtfolio#2\n
1. Вёрстка соответствует макету. Ширина экрана 768px +48
  °  блок <header> 
  °  секция hero 
  °  секция skills 
  °  секция portfolio 
  °  секция video 
  °  секция price 
  °  секция contacts 
  °  блок <footer> \n
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15
  ° нет полосы прокрутки при ширине страницы от 1440рх до 768рх 
  ° нет полосы прокрутки при ширине страницы от 768рх до 480рх 
  ° нет полосы прокрутки при ширине страницы от 480рх до 320рх\n
3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22
  ° при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка 
  ° при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик 
  ° высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету когда экран становится уже, меню занимает всю ширину экрана 
  ° при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку 
  ° бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений 
  ° ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям 
  ° при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку 
  
`);
*/
