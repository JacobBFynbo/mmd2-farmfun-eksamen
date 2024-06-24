document.addEventListener("DOMContentLoaded", function () {
  const allePrikker = document.querySelectorAll(".prik");
  const popUpBoks = document.getElementById("popUpBoks");
  const oversigtskortIMG = document.getElementById("oversigtskortIMG");

  function updatePrikkerPositioner() {
    const kortWidth = oversigtskortIMG.offsetWidth;
    const kortHeight = oversigtskortIMG.offsetHeight;
    allePrikker.forEach((prik) => {
      const xPercent = prik.getAttribute("data-x");
      const yPercent = prik.getAttribute("data-y");
      prik.style.left = `${(kortWidth * xPercent) / 100}px`;
      prik.style.top = `${(kortHeight * yPercent) / 100}px`;
    });
  }

  window.addEventListener("resize", updatePrikkerPositioner);
  updatePrikkerPositioner();

  function showPopup(prik) {
    const info = prik.getAttribute("dataInfo");
    const dyreNavn = prik.querySelector("span").innerText;
    const imgUrl = prik.getAttribute("dataImgUrl");
    const linkUrl = prik.getAttribute("dataLinkUrl");
    popUpBoks.innerHTML = createPopupContent(info, imgUrl, linkUrl, dyreNavn);
    const boks = prik.getBoundingClientRect();
    popUpBoks.style.left = `${boks.right + window.scrollX - 245}px`;
    popUpBoks.style.top = `${boks.top + window.scrollY -330 }px`;
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
