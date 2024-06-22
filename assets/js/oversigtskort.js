document.addEventListener("DOMContentLoaded", function () {
  const allePrikker = document.querySelectorAll(".prik");
  const popUpBoks = document.getElementById("popUpBoks");

  function visPopUpBoks(prik) {
    const info = prik.getAttribute("dataInfo");
    const dyreNavn = prik.querySelector("span").innerText;
    const imgUrl = prik.getAttribute("data-img-url");
    popUpBoks.innerHTML = `
            <h2>${info}</h2>
            <img src="${imgUrl}" alt="${dyreNavn}" style="width: 100%; height: auto;">
        `;
    const rect = prik.getBoundingClientRect();
    popUpBoks.style.left = rect.left + window.scrollX + 20 + "px";
    popUpBoks.style.top = rect.top + window.scrollY - 10 + "px";
    popUpBoks.style.display = "block";
  }

  allePrikker.forEach(function (prik) {
    prik.addEventListener("click", function () {
      visPopUpBoks(prik);
    });
    prik.querySelector("span").addEventListener("click", function (e) {
      e.stopPropagation();
      visPopUpBoks(prik);
    });
  });

  const alleBokse = document.querySelectorAll(".oversigtskortCards div");
  alleBokse.forEach(function (boks) {
    boks.addEventListener("click", function () {
      const target = boks.getAttribute("dataTarget");
      const prik = document.querySelector("." + target);
      if (prik) {
        visPopUpBoks(prik);
        window.scrollTo(
          0,
          prik.getBoundingClientRect().top + window.scrollY - 300
        );
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.classList.contains("prik") &&
      !event.target.closest(".oversigtskortCards div")
    ) {
      popUpBoks.style.display = "none";
    }
  });
});
