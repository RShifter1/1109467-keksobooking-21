"use strict";

(function () {
  
  const mapPinMain = document.querySelector(`.map__pin--main`);
  window.grabAddress = function (centered) {
    const leftX = mapPinMain.style.left;
    const topY = mapPinMain.style.top;
    const x = Math.floor(parseInt(leftX, 10) + (mapPinMain.offsetWidth / 2));
    const y = Math.floor(parseInt(topY, 10) + (mapPinMain.offsetHeight / (centered ? 2 : 1)));
    const address = document.querySelector(`#address`);
    address.value = `${x}, ${y}`;
  };
})();
