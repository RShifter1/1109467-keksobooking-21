"use strict";
(function () {
  const container = document.querySelector(`.map__pins`);
  const element = document.querySelector(`.map__pin--main`);
  let x = 0;
  let y = 0;
  let mousedown = false;
  const onMouseUp = function () {
    mousedown = false;
    document.removeEventListener(`mouseup`, onMouseUp);
  };
  element.addEventListener(`mousedown`, function (e) {
    mousedown = true;
    if (!window.isPageActivated) {
      window.activatePage();
    }
    x = element.offsetLeft - e.clientX;
    y = element.offsetTop - e.clientY;
    document.addEventListener(`mouseup`, onMouseUp, true);
  }, true);

  container.addEventListener(`mousemove`, function (e) {
    e.preventDefault();
    if (mousedown) {
      let ax = (e.clientX + x) + element.offsetWidth / 2;
      let ay = (e.clientY + y) + element.offsetHeight;
      let limitXfrom = container.offsetLeft;
      let limitXto = container.offsetLeft + container.offsetWidth;
      if (ay >= 130 && ay <= 630 && ax >= limitXfrom && ax <= limitXto) {
        element.style.left = e.clientX + x + `px`;
        element.style.top = e.clientY + y + `px`;
      }
      window.grabAddress();
    }
  }, true);
})();
