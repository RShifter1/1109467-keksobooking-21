"use strict";

(function () {
  function renderCards(hotels) {
    const cardContainer = document.querySelector(`.map`);
    const cardTemplate = document.querySelector(`#card`).content.children[0];

    for (var i = 0; i < hotels.length; i++) {
      const card = hotels[i];
      const cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
      cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
      cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
      cardElement.querySelector(`.popup__type`).textContent = card.offer.type;
      if (cardElement.querySelector(`.popup__type`).textContent === `bungalow`) {
        cardElement.querySelector(`.popup__type`).textContent = `Бунгало`;
      } else if (cardElement.querySelector(`.popup__type`).textContent === `flat`) {
        cardElement.querySelector(`.popup__type`).textContent = `Квартира`;
      } else if (cardElement.querySelector(`.popup__type`).textContent === `palace`) {
        cardElement.querySelector(`.popup__type`).textContent = `Дворец`;
      } else if (cardElement.querySelector(`.popup__type`).textContent === `house`) {
        cardElement.querySelector(`.popup__type`).textContent = `Дом`;
      }
      cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.guests + ` гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + ` выезд до ` + card.offer.checkout;
      if (card.offer.features.includes(`wifi`)) {
        cardElement.querySelector(`.popup__feature--wifi`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.includes(`dishwasher`)) {
        cardElement.querySelector(`.popup__feature--dishwasher`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.includes(`parking`)) {
        cardElement.querySelector(`.popup__feature--parking`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.includes(`washer`)) {
        cardElement.querySelector(`.popup__feature--washer`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.includes(`elevator`)) {
        cardElement.querySelector(`.popup__feature--elevator`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.includes(`conditioner`)) {
        cardElement.querySelector(`.popup__feature--conditioner`).style.backgroundColor = `orange`;
      }
      if (card.offer.features.length === 0) {
        cardElement.querySelector(`.popup__features`).remove();
      }
      cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
      const photo = cardElement.querySelector(`.popup__photos`);
      photo.removeChild(cardElement.querySelector(`.popup__photo`));
      for (let j = 0; j < card.offer.photos.length; j++) {
        let newPhoto = document.createElement('img');
        newPhoto.style.width = 45 + `px`;
        newPhoto.style.height = 40 + `px`;
        newPhoto.src = card.offer.photos[j];
        photo.appendChild(newPhoto);
      }
      if (card.offer.photos.length === 0) {
        cardElement.querySelector(`.popup__photos`).remove();
      }
      const avatar = cardElement.querySelector(`.popup__avatar`);
      avatar.src = card.author.avatar;
      cardElement.style.display = `none`;
      cardElement.dataset.id = `${card.location.x}:${card.location.y}`;
      const cross = cardElement.querySelector(`.popup__close`);
      cross.addEventListener(`click`, function () {
        closeCard();
      });
      cardContainer.appendChild(cardElement);
    }
  }
  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  }
  function closeCard() {
    const cards = document.querySelectorAll(`.map__card`);
    cards.forEach((card) => {
      card.style.display = `none`;
      Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`)).forEach((pin) => pin.classList.remove(`map__pin--active`));
    });
    document.removeEventListener('keydown', onPopupEscPress);
  }
  function openCard(hotel, pinElement) {
    document.querySelectorAll(`.map__card`).forEach((card) => {
      card.style.display = `none`;
    });
    document.querySelector(`.map__card[data-id="${hotel.location.x}:${hotel.location.y}"]`).style.display = `block`;
    Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`)).forEach((pin) => pin.classList.remove(`map__pin--active`));
    pinElement.classList.add(`map__pin--active`);
    document.addEventListener('keydown', onPopupEscPress);
  }
  window.closeCard = closeCard;
  window.openCard = openCard;
  window.renderCards = renderCards;
})();
