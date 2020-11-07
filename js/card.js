"use strict";

(function () {
  window.renderCards = function (hotels) {
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
      };

      cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.guests + ` гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + ` выезд до ` + card.offer.checkout;

      // cardElement.querySelector(`.popup__features`).textContent = card.offer.features;
      if (card.offer.features.includes(`wifi`)) {
        cardElement.querySelector(`.popup__feature--wifi`).style.backgroundColor = `orange`;
      };
      if (card.offer.features.includes(`dishwasher`)) {
        cardElement.querySelector(`.popup__feature--dishwasher`).style.backgroundColor = `orange`;
      };
      if (card.offer.features.includes(`parking`)) {
        cardElement.querySelector(`.popup__feature--parking`).style.backgroundColor = `orange`;
      };
      if (card.offer.features.includes(`washer`)) {
        cardElement.querySelector(`.popup__feature--washer`).style.backgroundColor = `orange`;
      };
      if (card.offer.features.includes(`elevator`)) {
        cardElement.querySelector(`.popup__feature--elevator`).style.backgroundColor = `orange`;
      };
      if (card.offer.features.includes(`conditioner`)) {
        cardElement.querySelector(`.popup__feature--conditioner`).style.backgroundColor = `orange`;
      };

      cardElement.querySelector(`.popup__description`).textContent = card.offer.description;

      const photo = cardElement.querySelector(`.popup__photos`);
      photo.removeChild(cardElement.querySelector(`.popup__photo`));
      for (let i = 0; i < card.offer.photos.length; i++) {
        let newPhoto = document.createElement('img');
        newPhoto.style.width = 45 + `px`;
        newPhoto.style.height = 40 + `px`;
        newPhoto.src = card.offer.photos[i];
        photo.appendChild(newPhoto);
      };

      const avatar = cardElement.querySelector(`.popup__avatar`);
      avatar.src = card.author.avatar;

      cardElement.style.display = `none`;
      cardElement.dataset.id = `${card.location.x}:${card.location.y}`;

      const cross = cardElement.querySelector(`.popup__close`);

      cross.addEventListener(`click`, function () {
        // const cards = document.querySelectorAll(`.map__card`);
        // cards.forEach(card => {card.style.display = `none`});
        closeCard();
      });



      cardContainer.appendChild(cardElement);

    };
document.addEventListener('keydown', onPopupEscPress);
  };
  // document.addEventListener(`keydown`, function (evt) {
  //   if (evt.key === 'Escape') {
  //     evt.preventDefault();
  //    const cards = document.querySelectorAll(`.map__card`);
        // cards.forEach(card => {card.style.display = `none`});
  //   }
  // });

  window.closeCard = function () {
    const cards = document.querySelectorAll(`.map__card`);
    cards.forEach(card => {card.style.display = `none`});

  }

//   var onPopupEscPress = function (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     closeCard();
//   }
// };
document.removeEventListener('keydown', window.onPopupEscPress);
})();
