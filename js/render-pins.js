'use strict';


(function () {
  window.renderPins = function (hotels) {
    const MAXPINS = 5;
    hotels = hotels.slice(0, MAXPINS);
    const oldPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    oldPins.forEach((pin) => pin.remove());
    const pinsContainer = document.querySelector(`.map__pins`);
    const template = document.querySelector(`#pin`).content.querySelector(`button`);
    const active = document.querySelector(`.map__pin--active`);

    for (var i = 0; i < hotels.length; i++) {
      const hotel = hotels[i];
      const pinElement = template.cloneNode(true);

      pinElement.addEventListener(`click`, function (evt) {
        document.querySelectorAll(`.map__card`).forEach(card => {card.style.display = `none`});
        document.querySelector(`.map__card[data-id="${hotel.location.x}:${hotel.location.y}"]`).style.display = `block`;

        Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`)).forEach(pin => pin.classList.remove(`map__pin--active`));
        pinElement.classList.add(`map__pin--active`);


      });
      pinElement.addEventListener(`keydown`, function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        document.querySelectorAll(`.map__card`).forEach(card => {card.style.display = `none`});
        document.querySelector(`.map__card[data-id="${hotel.location.x}:${hotel.location.y}"]`).style.display = `block`;
      };
      });
      pinElement.children[0].alt = hotel.offer.title;
      pinElement.children[0].src = hotel.author.avatar;
      pinElement.style.left = hotel.location.x + `px`;
      pinElement.style.top = hotel.location.y + `px`;
      pinsContainer.appendChild(pinElement);
    }
  };
})();
