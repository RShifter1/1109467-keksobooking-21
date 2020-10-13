`use strict`;

(function () {

  const CHECKOUTINS = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const TITLES = [`JR Kyushu Hotel Blossom Shinjuku`, `Mitsui Garden Hotel Jingugaien Tokyo Premier`, `Shinagawa Prince Hotel 3`, `THE BLOSSOM HIBIYA`, `Sotetsu Fresa Inn Ginza Sanchome`, `The Peninsula Tokyo`, `Tokyo Marriott Hotel`, `Hilton Tokyo Bay`, `THE KNOT TOKYO Shinjuku`, `karaksa hotel premier Tokyo Ginza`];
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const DESCRIPTIONS = [`description1`, `description2`, `description3`, `description4`, `description5`, `description6`, `description7`, `description8`, `description9`, `description10`];
  const STREETS = [`Улица Омотесандо`, `Улица Гейш`, `Улица Амейоко`, `Улица Такешита Дори`, `Улица Нака-мисэ-дори`];

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
