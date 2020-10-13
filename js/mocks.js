`use strict`;

(function () {

  window.randomInteger = function (min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  window.arrayRandElement = function (arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  // mocks

  window.generateObject = function (index) {
    const x = getLocationX();
    const y = getLocationY();
    return {
      author: {
        avatar: getAvatar(index)
      },
      offer: {
        title: getTitle(),
        address: getAddress(x, y),
        price: getPrice(),
        type: getType(),
        room: getRoom(),
        guest: getGuest(),
        checkin: getCheckin(),
        checkout: getCheckout(),
        features: getFeature(),
        description: getDescription(),
        photos: getPhotos()
      },
      location: {
        x: x,
        y: y
      }

    };
  }


  window.getAvatar = function (index) {
    return `img/avatars/user0${index + 1}.png`;
  }

  window.getTitle = function () {
    return arrayRandElement(TITLES);
  }

  window.getAddress = function (x, y) {
    return `(${x}, ${y})`;
  }

  window.getPrice = function () {
    return randomInteger(1000, 10000);
  }

  window.getType = function () {
    return arrayRandElement(TYPES);
  }

  window.getRoom = function () {
    return randomInteger(1, 2);
  }

  window.getGuest = function () {
    return randomInteger(1, 5);
  }

  window.getCheckout = function () {
    return arrayRandElement(CHECKOUTINS);
  }

  window.getCheckin = function () {
    return arrayRandElement(CHECKOUTINS);
  }

  window.getFeature = function () {
    const features = [];
    const randFeature = randomInteger(1, FEATURES.length);
    for (var i = 0; i < randFeature; i++) {
      features.push(arrayRandElement(FEATURES));
    }
    return features;
  }

  window.getDescription = function () {
    return arrayRandElement(DESCRIPTIONS);
  }

  window.getPhotos = function () {
    const photos = [];
    const randPhoto = randomInteger(1, PHOTOS.length);
    for (var i = 0; i < randPhoto; i++) {
      photos.push(arrayRandElement(PHOTOS));
    }
    return photos;
  }

  window.getLocationY = function () {
    return randomInteger(130, 630);
  }

  window.getLocationX = function () {
    return randomInteger(130, 630);
  }


window.generateObjects = function (count) {
    const resultObjects = [];
    for (var i = 0; i < count; i++) {
      resultObjects.push(generateObject(i));
    }
    return resultObjects;
  };

})();
