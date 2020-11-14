'use strict';
(function () {
  const mapPinMain = document.querySelector(`.map__pin--main`);
  let {x, width} = document.querySelector(`.map`).getBoundingClientRect();
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (startCoords.x > x && startCoords.x < x + width) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if (startCoords.y > 130 && startCoords.y < 630) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
    };
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
