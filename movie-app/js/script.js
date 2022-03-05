import translate from "./translate.js";
// import films from "./films.js";

let isTheme = false;
let isLang = "en";
const themeBtn = document.querySelector(".js-theme");
const form = document.querySelector("form");
let input = document.querySelector("input");
let searchBtn = document.querySelector(".search__btn");
let searchIcon = document.querySelector(".search__icon");
let parent = document.querySelector(".films__card");
let langGroup = document.querySelector(".theme__lang");
// модальное окно
let modal = document.querySelector(".modal");
let modalWindow = document.querySelector(".modal__wrap");

function changeTheme(isTheme) {
  let themeIcon = themeBtn.querySelector("use");
  if (isTheme) {
    document.body.style.setProperty("--bg-white", "#232323");
    document.body.style.setProperty("--bg-black", "#fff");

    themeIcon.setAttribute("href", "./assets/svg/sun-icon.svg#sun");
  } else {
    document.body.style.setProperty("--bg-white", "#fff");
    document.body.style.setProperty("--bg-black", "#232323");
    themeIcon.setAttribute("href", "./assets/svg/moon-icon.svg#moon");
  }
}

function changeLang(lang) {
  let input = lang.children[0].value;
  lang.classList.add("lang-active");
  isLang = input;
  getFilmsAll();
  document.querySelectorAll("[data-lang]").forEach((elem) => {
    elem.textContent = translate[input][elem.dataset.input];
  });
}
themeBtn.addEventListener("click", () => changeTheme((isTheme = !isTheme)));

langGroup.addEventListener("change", (e) => {
  Array.from(e.currentTarget.children).forEach((label) => {
    label.classList.remove("lang-active");
  });
  isLang = e.target.id;
  changeLang(e.target.parentElement);
});

// Очищаем инпут при клике на крестик
function clearInput(e) {
  input.value = " ";
  input.focus();
  searchIcon.children[0].setAttribute(
    "href",
    "./assets/svg/search-icon.svg#search"
  );
}

searchBtn.addEventListener("click", clearInput);

input.addEventListener("input", () => {
  if (!input.value.length == 0) {
    searchIcon.children[0].setAttribute(
      "href",
      "./assets/svg/cross-icon.svg#cross"
    );
  } else {
    searchIcon.children[0].setAttribute(
      "href",
      "./assets/svg/search-icon.svg#search"
    );
  }
});

function loadModal() {
  modal.classList.toggle("active");
  if (modal.classList.contains("active")) {
    modalWindow.classList.add("active-modal");
    document.body.style.overflow = "hidden";
  } else {
    modalWindow.classList.remove("active-modal");
    document.body.style.overflow = "auto";
    modalWindow.innerHTML = "";
  }
}

document.addEventListener("click", function (e) {
  let el = e.target.parentElement;

  if (el.parentElement.classList.contains("film")) {
    loadModal();
    filmInfo(el.parentElement.dataset);
  } else if (e.target.classList.contains("modal__close-btn")) {
    loadModal();
  }
});
document.addEventListener("click", (e) => {
  let el = e.target;
  if (el.classList.contains("modal")) {
    loadModal();
  }
});

// ============================ Films ===============================//
const API_KEY = "997f97c9c2ecf6e5b4eb38c47b4c3274";
let html = "";

//Получаем весь список фильмов
const getFilmsAll = async () => {
  try {
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${isLang}-${isLang.toUpperCase()}`
      ).then((r) => r.json()),
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${isLang}-${isLang.toUpperCase()}`
      ).then((r) => r.json()),
    ]).then((data) => {
      let [films, genres] = data;
      renderFilms(films.results, genres.genres);
    });
  } catch (error) {
    console.log(error);
  }
};
getFilmsAll();

// Ишем фильм по запросу
async function searchFilms(value) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}&language=${isLang}-${isLang.toUpperCase()}`;
    let res = await fetch(url);
    let data = await res.json();
    let searchFilms = await data.results;
    if (data.results.length === 0) {
      console.log("cwecwec");
      parent.innerHTML = "";
      let error = document.createElement("div");
      error.classList.add("error");
      error.innerHTML = "<h2>Films not found</h2>";
      parent.appendChild(error);
    } else {
      renderFilms(searchFilms);
    }
  } catch (error) {
    console.log(error);
  }
}

// Отправка формы и проверка инпута на пустоту
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    e.preventDefault();
    if (input.value.trim().length === 0) {
      alert("Ошибка, поле поиска пустое");
    } else {
      searchFilms(input.value);
    }
  }
  return false;
});

//  Получаем информацию по фильму
async function filmInfo(film) {
  console.log(film);
  try {
    const url = `https://api.themoviedb.org/3/movie/${
      film.id
    }?api_key=${API_KEY}&language=${isLang}-${isLang.toUpperCase()}`;
    let res = await fetch(url);
    let data = await res.json();

    renderModalInfo(data);
  } catch (error) {
    console.log(error);
  }
}

function renderModalInfo(data) {
  let relese = data.release_date.split("-").reverse().join("-");

  modalWindow.innerHTML = `
  <button class="modal__close-btn">
    <svg class="modal__close-icon">
      <use href="./assets/svg/cross-icon.svg#cross"></use>
    </svg>
  </button>
  <div class="modal__poster">
  <img
    src="https://image.tmdb.org/t/p/w1280${data.poster_path}"
    alt="poster"
  />
</div>
<div class="modal__info">
  <div class="modal__title">${data.original_title}</div>
  <p class="modal__tagline">${data.tagline}</p>
  <div class="modal__overview">${data.overview}</div>
  <div class="modal__properties">
    <ul class="modal__list">
      <li class="modal__item" data-lang="release date">
        Release date: <span>${relese}</span>
      </li>
      <li class="modal__item" data-lang="rating">
        Rating: <span>${data.vote_average}</span>
      </li>
      <li class="modal__item" data-lang="duration">
        Duration: <span>${data.runtime}</span> 
      </li>
    </ul>
  </div>
</div>
  `;
}

//  Рендер функция элеменов с данными о фильмах
function renderFilms(films, genres) {
  let genresStore = genres;
  parent.innerHTML = "";
  films.forEach((film) => {
    let img = `https://image.tmdb.org/t/p/w1280/${film.poster_path}`;
    const el = document.createElement("div");
    el.setAttribute("data-id", `${film.id}`);
    el.classList.add("film");
    if (film.poster_path === null) {
      img = "./assets/not-image.jpg";
    }

    el.innerHTML = `
      <div class="film__rating">${film.vote_average}</div>
      <div class="film__poster">
        <img
          src='${img} '
          alt="poster"
          loading="lazy"
         />
        <div class="film__properties">
        <span class="film__genres"></span>
        </div>
      </div>
      <div class="film__info"></div>
       <div class="film__title">${
         isLang === "en" ? film.original_title : film.title
       }</div>
   
    `;

    parent.appendChild(el);
  });
}
