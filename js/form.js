"use strict";

(function () {
  const MIN_TITLE_LENGTH = 2;
  const MAX_TITLE_LENGTH = 25;
  const guestNumbers = document.querySelector(`#capacity`);
  const roomNumbers = document.querySelector(`#room_number`);
  const titleInput = document.querySelector(`#title`);
  const select = document.querySelectorAll(`select`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  titleInput.addEventListener('input', function () {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });

  const checkRoomsGuests = function (selected) {
    const selectedGuestNumberS = guestNumbers.selectedOptions;
    const selectedRoomNumberS = roomNumbers.selectedOptions;
    const selectedGuestNumberSNumber = Number(selectedGuestNumberS[0].value);
    const selectedRoomNumberSNumber = Number(selectedRoomNumberS[0].value);

    if (selectedRoomNumberSNumber === 100 && selectedGuestNumberSNumber !== 0) {
      selected.setCustomValidity(`слишком много комнат`);
    } else if (selectedGuestNumberS[0].value > selectedRoomNumberS[0].value) {
      selected.setCustomValidity(`добавьте больше комнат`);
    } else {
      selected.setCustomValidity(``);
    }
    selected.reportValidity();
  };

  guestNumbers.addEventListener(`change`, function () {

    checkRoomsGuests(guestNumbers);
  });

  roomNumbers.addEventListener(`change`, function () {

    checkRoomsGuests(roomNumbers);
  });


  const fieldset = document.querySelectorAll(`fieldset`);

  fieldset.forEach(function (field) {

    field.setAttribute('disabled', `disabled`);
  });

  select.forEach(function (item) {

    item.setAttribute('disabled', `disabled`);
  });


  const initialAddress = function () {
    const leftX = document.querySelector(`.map__pin--main`).style.left;
    const topY = document.querySelector(`.map__pin--main`).style.top; // получить координату  y верхнего угла орандевой метки
    const x = Math.floor(parseInt(leftX, 10) + (mapPinMain.offsetWidth / 2));// получить координату центра точки половина ширины контейнера (width)
    const y = Math.floor(parseInt(topY, 10) + (mapPinMain.offsetHeight / 2)); // получить координату центра точки  половина высоты контейнера (height) parseInt
    const address = document.querySelector(`#address`); // input с адресом
    address.value = `${x}, ${y}`;
  };

  initialAddress();
})();
