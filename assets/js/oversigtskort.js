document.addEventListener("DOMContentLoaded", function () {
  const allePrikker = document.querySelectorAll(".prik");
  const popUpBoks = document.getElementById("popUpBoks");

  function showPopup(prik) {
    const info = prik.getAttribute("dataInfo");
    const dyreNavn = prik.querySelector("span").innerText;
    const imgUrl = prik.getAttribute("data-img-url");
    const linkUrl = prik.getAttribute("data-link-url");
    popUpBoks.innerHTML = createPopupContent(info, imgUrl, linkUrl, dyreNavn);
    const rect = prik.getBoundingClientRect();
    popUpBoks.style.left = `${rect.right + window.scrollX + 10}px`;
    popUpBoks.style.top = `${rect.top + window.scrollY}px`;
    popUpBoks.style.display = "block";
  }

  function createPopupContent(info, imgUrl, linkUrl, dyreNavn) {
    return `
      <h2>${info}</h2>
      <img src="${imgUrl}" alt="${dyreNavn}" style="width: 70%; height: auto;">
      <p>Læs mere om <a href="${linkUrl}" target="_blank">${info}</a></p>
    `;
  }

  function addPrikEventListeners(prik) {
    prik.addEventListener("click", function () {
      showPopup(prik);
    });
    prik.querySelector("span").addEventListener("click", function (e) {
      e.stopPropagation();
      showPopup(prik);
    });
  }

  function addBoksEventListeners(boks) {
    boks.addEventListener("click", function () {
      const target = boks.getAttribute("dataTarget");
      const prik = document.querySelector("." + target);
      if (prik) {
        showPopup(prik);
        window.scrollTo(
          0,
          prik.getBoundingClientRect().top + window.scrollY - 300
        );
      }
    });
  }

  allePrikker.forEach(addPrikEventListeners);

  const alleBokse = document.querySelectorAll(".oversigtskortCards div");
  alleBokse.forEach(addBoksEventListeners);

  document.addEventListener("click", function (event) {
    if (
      !event.target.classList.contains("prik") &&
      !event.target.closest(".oversigtskortCards div")
    ) {
      popUpBoks.style.display = "none";
    }
  });
});
