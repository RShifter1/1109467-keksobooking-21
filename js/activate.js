"use strict";
(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const select = document.querySelectorAll(`select`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const fieldset = document.querySelectorAll(`fieldset`);

  window.activatePage = function () {
    window.load(function (hotels) {
      window.hotels = hotels;
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

      window.renderPins(hotels);
      window.renderCards(window.hotels);
    }, function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);


    });

  };


  mapPinMain.addEventListener(`click`, function () {
    window.activatePage();
  });

  // mapPinMain.addEventListener(`click`, window.activatePage());


})();
