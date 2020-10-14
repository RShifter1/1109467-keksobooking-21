'use strict';


(function () {
  var pins = generateObjects(8);
  window.renderPins = function () {

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
