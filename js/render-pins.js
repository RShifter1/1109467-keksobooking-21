'use strict';


(function () {
  window.renderPins = function (pins) {
    const MAXPINS = 5;
    pins = pins.slice(0, MAXPINS);
    const oldPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    oldPins.forEach((pin) => pin.remove());
    const pinsContainer = document.querySelector(`.map__pins`);
    const template = document.querySelector(`#pin`).content.querySelector(`button`);

    for (var i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const pinElement = template.cloneNode(true);
      pinElement.data = pin;
      pinElement.children[0].alt = pin.offer.title;
      pinElement.children[0].src = pin.author.avatar;
      pinElement.style.left = pin.location.x + `px`;
      pinElement.style.top = pin.location.y + `px`;
      pinsContainer.appendChild(pinElement);
    }
  };

})();
