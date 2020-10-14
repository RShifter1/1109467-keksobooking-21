"use strict";
(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const select = document.querySelectorAll(`select`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const fieldset = document.querySelectorAll(`fieldset`);
  window.activatePage = function () {
    window.load(function (pins) {
      map.classList.remove(`map--faded`);
      form.classList.remove(`ad-form--disabled`);

      fieldset.forEach(function (field) {
        field.removeAttribute('disabled');

      });

      select.forEach(function (item) {
        item.removeAttribute('disabled');
      });

      const leftX = document.querySelector(`.map__pin--main`).style.left;
      const topY = document.querySelector(`.map__pin--main`).style.top; // получить координату  y верхнего угла орандевой метки
      const x = Math.floor(parseInt(leftX, 10) + (mapPinMain.offsetWidth / 2)); // получить координату центра точки половина ширины контейнера (width)
      const y = Math.floor(parseInt(topY, 10) - (0.5 * mapPinMain.offsetHeight)); // получить координату центра точки  половина высоты контейнера (height) parseInt
      const address = form.querySelector(`#address`); // input с адресом

      address.value = `${x}, ${y}`;

      window.renderPins(pins);
      address.setAttribute(`disabled`, `disabled`);
    });

  };

  mapPinMain.addEventListener(`click`, function () {
    window.activatePage();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.activatePage();
    }
  });
})();
