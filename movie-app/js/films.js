// class Films {
//   score = [];
//   constructor() {
//     this.parent = document.querySelector(".films__card");
//     this.html;
//     this.API_KEY = "997f97c9c2ecf6e5b4eb38c47b4c3274";
//   }
//   async getFilmsAll() {
//     try {
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}`;
//       let res = await fetch(url);
//       let data = await res.json();
//       this.score = await data.results;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async searchFilms() {
//     let value = document.querySelector("input").value;

//     try {
//       const url = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${this.API_KEY}`;
//       let res = await fetch(url);
//       let data = await res.json();
//       let searchFilms = await data.results;
//       renderFilms(searchFilms);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   renderFilms() {
//     console.log(this.score);
//     this.films.forEach((film) => {
//       this.html = `
//       <div class="film" data-id="${film.id}">
//         <div class="film__rating">${film.vote_average}</div>
//         <div class="film__poster">
//           <img
//             src='https://image.tmdb.org/t/p/w1280/${film.poster_path}'
//             alt="poster"
//            />
//           <div class="film__properties"></div>
//         </div>
//         <div class="film__info"></div>
//          <div class="film__title">${film.original_title}</div>
//       </div>
//       `;
//       this.parent.insertAdjacentHTML("beforeend", this.html);
//     });
//   }
// }

// const film = new Films();

// film.getFilmsAll();
// film.renderFilms();

// export default film;
