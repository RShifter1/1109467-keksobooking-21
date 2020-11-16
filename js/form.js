"use strict";

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MIN_FLAT_PRICE = 1000;
  const INITIAL_X = 570;
  const INITIAL_Y = 375;
  const guestNumbers = document.querySelector(`#capacity`);
  const roomNumbers = document.querySelector(`#room_number`);
  const titleInput = document.querySelector(`#title`);
  const select = document.querySelectorAll(`select`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const priceInput = document.querySelector(`#price`);
  const typeNumber = document.querySelector(`#type`);
  const checkIn = document.querySelector(`#timein`);
  const checkOut = document.querySelector(`#timeout`);
  const fieldset = document.querySelectorAll(`fieldset`);
  titleInput.addEventListener(`input`, function () {
    const valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  });
  priceInput.addEventListener(`input`, function () {
    if (Number(document.querySelector(`#price`).value) > 1000000) {
      priceInput.setCustomValidity(`Максимальное значение — 1000000`);
    } else {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  });

  function checkRoomsGuests() {
    const selectedRoomNumbers = Number(roomNumbers.value);
    const selectedGuestNumbers = Number(guestNumbers.value);

    if (selectedRoomNumbers === 100 && selectedGuestNumbers !== 0) {
      roomNumbers.setCustomValidity(`слишком много комнат`);
      guestNumbers.setCustomValidity(``);
    } else if (selectedGuestNumbers > selectedRoomNumbers) {
      roomNumbers.setCustomValidity(`добавьте больше комнат`);
      guestNumbers.setCustomValidity(``);
    } else if (selectedGuestNumbers === 0 && selectedRoomNumbers !== 100) {
      roomNumbers.setCustomValidity(``);
      guestNumbers.setCustomValidity(`измените число гостей`);
    } else {
      roomNumbers.setCustomValidity(``);
      guestNumbers.setCustomValidity(``);
    }
    roomNumbers.reportValidity();
    guestNumbers.reportValidity();
  }

  roomNumbers.addEventListener(`change`, checkRoomsGuests);
  guestNumbers.addEventListener(`change`, checkRoomsGuests);

  function checkTypePrice() {
    const selectedHousingType = document.querySelector(`#type`).selectedOptions[0].value;
    const price = Number(priceInput.value);
    if (selectedHousingType === `bungalow`) {
      priceInput.placeholder = `0`;
      if (!price >= 0) {
        priceInput.setCustomValidity(`минимальное значение 0`);
      } else {
        priceInput.setCustomValidity(``);
      }
    } else if (selectedHousingType === `flat`) {
      priceInput.placeholder = `1000`;
      if (price < MIN_FLAT_PRICE) {
        priceInput.setCustomValidity(`минимальное значение 1000`);
      } else {
        priceInput.setCustomValidity(``);
      }
    } else if (selectedHousingType === `house`) {
      priceInput.placeholder = `5000`;
      if (price < 5000) {
        priceInput.setCustomValidity(`минимальное значение 5000`);
      } else {
        priceInput.setCustomValidity(``);
      }
    } else if (selectedHousingType === `palace`) {
      priceInput.placeholder = `10000`;
      if (price < 10000) {
        priceInput.setCustomValidity(`минимальное значение 10000`);
      } else {
        priceInput.setCustomValidity(``);
      }
    }
    priceInput.reportValidity();
  }
  typeNumber.addEventListener(`change`, function () {
    checkTypePrice(typeNumber);
  });
  priceInput.addEventListener(`input`, function () {
    checkTypePrice(priceInput);
  });
  checkIn.addEventListener(`change`, function () {
    const selectedCheckIn = checkIn.value;
    if (selectedCheckIn === `12:00`) {
      checkOut.value = `12:00`;
    } else if (selectedCheckIn === `13:00`) {
      checkOut.value = `13:00`;
    } else if (selectedCheckIn === `14:00`) {
      checkOut.value = `14:00`;
    }
  });
  checkOut.addEventListener(`change`, function () {
    const selectedCheckOut = checkOut.value;
    if (selectedCheckOut === `12:00`) {
      checkIn.value = `12:00`;
    } else if (selectedCheckOut === `13:00`) {
      checkIn.value = `13:00`;
    } else if (selectedCheckOut === `14:00`) {
      checkIn.value = `14:00`;
    }
  });
  const successTemplate = document.querySelector(`#success`).content.querySelector(`div`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`div`);
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const main = document.querySelector(`main`);
  const errorButton = document.querySelector(`#error`).content.querySelector(`button`);
  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    const data = {
      author: {},
      offer: {}
    };
    data.author.avatar = document.querySelector(`#avatar`).value;
    data.offer.title = document.querySelector(`#title`).value;
    data.offer.address = document.querySelector(`#address`).value;
    data.offer.price = document.querySelector(`#price`).value;
    data.offer.type = document.querySelector(`#type`).value;
    data.offer.rooms = document.querySelector(`#room_number`).value;
    data.offer.guests = document.querySelector(`#capacity`).value;
    data.offer.checkin = document.querySelector(`#timein`).value;
    data.offer.checkout = document.querySelector(`#timeout`).value;
    const features = document.querySelectorAll(`.feature__checkbox`);
    data.offer.features = Array.from(features).filter((feature) => feature.checked).map((feature) => feature.value);
    data.offer.photos = document.querySelector(`#images`).value;

    function onSuccess() {
      const success = successTemplate.cloneNode(true);
      disactivatePage();
      main.appendChild(success);
      document.addEventListener(`click`, function () {
        success.remove();
      });
      document.addEventListener(`keydown`, function (e) {
        if (e.key === `Escape`) {
          evt.preventDefault();
          success.remove();
        }
      });
    }
    function onError() {
      let error = errorTemplate.cloneNode(true);
      main.appendChild(error);
      errorButton.addEventListener(`click`, function () {
        error.remove();

      });
      document.addEventListener(`keydown`, function (e) {
        if (e.key === `Escape`) {
          evt.preventDefault();
          error.remove();
        }
      });
      main.addEventListener(`click`, function () {
        error.remove();
      });
    }
    window.upload(onSuccess, onError);
  });

  const disactivatePage = function () {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    fieldset.forEach(function (field) {
      field.setAttribute(`disabled`, `disabled`);
    });
    select.forEach(function (item) {
      item.setAttribute(`disabled`, `disabled`);
    });
    document.querySelector(`.map__filters`).reset();
    document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((pin) => pin.remove());
    document.querySelector(`.ad-form`).reset();
    mapPinMain.style.left = INITIAL_X + `px`;
    mapPinMain.style.top = INITIAL_Y + `px`;
    document.querySelectorAll(`.map__card`).forEach((card) => card.remove());
    window.grabAddress();
    window.isPageActivated = false;
  };
  const reset = document.querySelector(`.ad-form__reset`);
  reset.addEventListener(`click`, function () {
    disactivatePage();
  });
  window.grabAddress(true);
})();
