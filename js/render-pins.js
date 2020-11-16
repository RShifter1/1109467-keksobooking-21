"use strict";
(function () {
  const MAX_PINS = 5;
  function renderPins(hotels) {
    hotels = hotels.slice(0, MAX_PINS);
    const oldPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    oldPins.forEach((pin) => pin.remove());
    const pinsContainer = document.querySelector(`.map__pins`);
    const template = document.querySelector(`#pin`).content.querySelector(`button`);
    for (let i = 0; i < hotels.length; i++) {
      const hotel = hotels[i];
      const pinElement = template.cloneNode(true);
      pinElement.addEventListener(`click`, function () {
        window.openCard(hotel, pinElement);
      });
      pinElement.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          window.openCard(hotel, pinElement);
        }
      });
      pinElement.children[0].alt = hotel.offer.title;
      pinElement.children[0].src = hotel.author.avatar;
      pinElement.style.left = hotel.location.x + `px`;
      pinElement.style.top = hotel.location.y + `px`;
      pinsContainer.appendChild(pinElement);
    }
  }
  window.renderPins = renderPins;
})();
