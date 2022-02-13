import translate from "./translate.js";
// import films from "./films.js";

let isTheme = false;
let isLang = "en";
const themeBtn = document.querySelector(".js-theme");
const form = document.querySelector("form");
let parent = document.querySelector(".films__card");
// let genre = document.querySelector("#genre");
let langGroup = document.querySelectorAll("label");

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
  isLang = input;
  getFilmsAll();
  document.querySelectorAll("[data-lang]").forEach((elem) => {
    elem.textContent = translate[input][elem.dataset.input];
  });
}
themeBtn.addEventListener("click", () => changeTheme((isTheme = !isTheme)));

langGroup.forEach((input) => {
  input.classList.remove("lang-active");
  input.addEventListener("change", function () {
    this.classList.add("lang-active");
    changeLang(input);
  });
});

//  жанры фильмов https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=ru-RU (en-EN)

// ============================ Films ===============================//
const API_KEY = "997f97c9c2ecf6e5b4eb38c47b4c3274";
let html = "";

let store = {};

//Get all films
const getFilmsAll = async () => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${isLang}-${isLang.toUpperCase()}`;
    let res = await fetch(url);
    let data = await res.json();
    let films = await data.results;
    console.log(films);
    renderFilms(films);
  } catch (error) {
    console.log(error);
  }
};

getFilmsAll();

console.log(store);
// word search films
async function searchFilms(value) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    let searchFilms = await data.results;
    renderFilms(searchFilms);
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector("input");

  searchFilms(input.value);
  input.value = "";
});

// Get genre films
// async function getGenreFilms() {
//   try {
//     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${lang}-${lang.toUpperCase()}`;
//     let res = await fetch(url);
//     let data = await res.json();
//     let genres = await data.genres;
//     renderFilms(genres);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getGenreFilms();

function renderFilms(films) {
  parent.innerHTML = "";
  films.forEach((film) => {
    let img = `https://image.tmdb.org/t/p/w1280/${film.poster_path}`;
    const el = document.createElement("div");
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
         />
        <div class="film__properties"></div>
      </div>
      <div class="film__info"></div>
       <div class="film__title">${
         isLang === "en" ? film.original_title : film.title
       }</div>
   
    `;
    parent.appendChild(el);
  });
}
