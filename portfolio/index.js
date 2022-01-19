document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.querySelector(".js-nav-btn"),
    navLink = document.querySelectorAll(".nav__link");
  nav = document.querySelector(".js-nav");

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
});

//self-esteem

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
  
  
`);
