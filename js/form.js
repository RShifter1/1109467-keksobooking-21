"use strict";

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const MIN_FLAT_PRICE = 1000;
  const guestNumbers = document.querySelector(`#capacity`);
  const roomNumbers = document.querySelector(`#room_number`);
  const titleInput = document.querySelector(`#title`);
  const select = document.querySelectorAll(`select`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const priceInput = document.querySelector(`#price`);
  const typeNumber = document.querySelector (`#type`);
  const checkIn = document.querySelector(`#timein`);
  const checkOut = document.querySelector(`#timeout`);
  const fieldset = document.querySelectorAll(`fieldset`);


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

  priceInput.addEventListener(`input`, function () {
    const value = Number(document.querySelector(`#price`).value);

    if (Number(document.querySelector(`#price`).value) > 1000000) {
      priceInput.setCustomValidity(`Максимальное значение — 1 000 000`);
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
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


  const checkTypePrice = function (selected) {
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
        priceInput.setCustomValidity(`минимальное значение 10000`)
      } else {
        priceInput.setCustomValidity(``);
      }
    }
    priceInput.reportValidity();
  };

  typeNumber.addEventListener(`change`, function () {
    checkTypePrice(typeNumber);
  });

  priceInput.addEventListener(`input`, function () {
    checkTypePrice(priceInput);
  });

  checkIn.addEventListener(`change`, function () {
    const selectedCheckIn = checkIn.value;
    const selectedCheckOut = checkOut.value;

    if (selectedCheckIn === "12:00") {
      checkOut.value = "12:00";
    } else if (selectedCheckIn === "13:00") {
      checkOut.value = "13:00";
    } else if (selectedCheckIn === "14:00") {
      checkOut.value = "14:00";
    }
});

  checkOut.addEventListener(`change`, function () {
    const selectedCheckIn = checkIn.value;
    const selectedCheckOut = checkOut.value;

    if (selectedCheckOut === "12:00") {
      checkIn.value = "12:00";
    } else if (selectedCheckOut === "13:00") {
      checkIn.value = "13:00";
    } else if (selectedCheckOut === "14:00") {
      checkIn.value = "14:00";
    }
});


  const formButton = document.querySelector(`.ad-form__submit`);
  const successTemplate = document.querySelector(`#success`).content.querySelector('div');
  const errorTemplate = document.querySelector(`#error`).content.querySelector('div');
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const main = document.querySelector(`main`);
  const errorButton = document.querySelector(`#error`).content.querySelector('button');

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    const data = {
      author: {},
      offer: {}
    };

    if (!form.checkValidity()) {
      return form.reportValidity();
    }

    data.author.avatar = document.querySelector(`#avatar`).value;
    data.offer.title = document.querySelector(`#title`).value;
    data.offer.address = document.querySelector(`#address`).value;
    data.offer.price = document.querySelector(`#price`).value;
    data.offer.type = document.querySelector(`#type`).value;
    debugger;
    data.offer.rooms = document.querySelector(`#room_number`).value;
    data.offer.guests = document.querySelector(`#capacity`).value;
    data.offer.checkin = document.querySelector(`#timein`).value;
    data.offer.checkout = document.querySelector(`#timeout`).value;
    const features = document.querySelectorAll(`.feature__checkbox`);
    data.offer.features = Array.from(features).filter((feature) => feature.checked).map((feature) => feature.value);
    data.offer.photos = document.querySelector(`#images`).value;

    window.upload(function (response) {
      const success = successTemplate.cloneNode(true);
        // map.classList.add(`map--faded`);
        // form.classList.add(`ad-form--disabled`);
        // fieldset.forEach(function (field) {
        //   field.setAttribute('disabled', `disabled`);
        // });
        // select.forEach(function (item) {
        //   item.setAttribute('disabled', `disabled`);
        // });
        disactivatePage();
        main.appendChild(success);
        document.addEventListener(`click`, function () {
          main.removeChild(success);

        });
        document.addEventListener(`keydown`, function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            main.removeChild(success);
          }
        });
      }, function (response) {
        let error = errorTemplate.cloneNode(true);
        main.appendChild(error);
        errorButton.addEventListener(`click`, function () {
          let divError = document.querySelector(`.error`);
          main.removeChild(error);
        });
        document.addEventListener(`keydown`, function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            main.removeChild(error);
          }
        });
        main.addEventListener(`click`, function () {
          main.removeChild(error);
        });
      });
    // } else {
    //      form.reportValidity();
    //   };


  });
  const disactivatePage = function () {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    fieldset.forEach(function (field) {
      field.setAttribute('disabled', `disabled`);
    });
    select.forEach(function (item) {
      item.setAttribute('disabled', `disabled`);
    });
    document.querySelector(`.map__filters`).reset();
    document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((pin) => pin.remove());
  }

const reset = document.querySelector(`.ad-form__reset`);
reset.addEventListener(`click`, function () {
  disactivatePage();
});

  const initialAddress = function () {
    const leftX = document.querySelector(`.map__pin--main`).style.left;
    const topY = document.querySelector(`.map__pin--main`).style.top; // получить координату  y верхнего угла орандевой метки
    const x = Math.floor(parseInt(leftX, 10) + (mapPinMain.offsetWidth / 2));// получить координату центра точки половина ширины контейнера (width)
    const y = Math.floor(parseInt(topY, 10) + (mapPinMain.offsetHeight / 2)); // получить координату центра точки  половина высоты контейнера (height) parseInt
    const address = document.querySelector(`#address`); // input с адресом
    address.value = `${x}, ${y}`;
  };


//   form.addEventListener('submit', function (evt) {
//     window.upload(new FormData(form), function (response) {
//         const success = successTemplate.cloneNode(true);
//         main.appendChild(success);
//     });
// });
  initialAddress();
})();
