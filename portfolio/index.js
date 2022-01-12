const langBtn = document.querySelectorAll(".lang__item");

langBtn.forEach((item) => {
  item.addEventListener("change", (e) => {
    langBtn.forEach((el) => {
      el.classList.remove("active");
    });

    item.classList.add("active");
  });
});
