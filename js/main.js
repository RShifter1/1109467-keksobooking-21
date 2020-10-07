"use strict";
const CHECKOUTINS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TITLES = [`JR Kyushu Hotel Blossom Shinjuku`, `Mitsui Garden Hotel Jingugaien Tokyo Premier`, `Shinagawa Prince Hotel 3`, `THE BLOSSOM HIBIYA`, `Sotetsu Fresa Inn Ginza Sanchome`, `The Peninsula Tokyo`, `Tokyo Marriott Hotel`, `Hilton Tokyo Bay`, `THE KNOT TOKYO Shinjuku`, `karaksa hotel premier Tokyo Ginza`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const DESCRIPTIONS = [`description1`, `description2`, `description3`, `description4`, `description5`, `description6`, `description7`, `description8`, `description9`, `description10`];
const STREETS = [`Улица Омотесандо`, `Улица Гейш`, `Улица Амейоко`, `Улица Такешита Дори`, `Улица Нака-мисэ-дори`];
const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 25;
const mapPinMain = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const fieldset = document.querySelectorAll(`fieldset`);
// const mapFilter = document.querySelector(`.map__filters`);
const select = document.querySelectorAll(`select`);
// const address = document.querySelector(`#address`);
const titleInput = document.querySelector(`#title`);
const guestNumbers = form.querySelector(`#capacity`);
const roomNumbers = form.querySelector(`#room_number`);
var pins = generateObjects(8);


titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const checkRoomsGuests = function(select) {
  const selectedGuestNumberS = guestNumbers.selectedOptions;
  const selectedRoomNumberS = roomNumbers.selectedOptions;
  const selectedGuestNumberSNumber = Number(selectedGuestNumberS[0].value);
  const selectedRoomNumberSNumber = Number(selectedRoomNumberS[0].value);

  if (selectedRoomNumberSNumber === 100 && selectedGuestNumberSNumber !== 0) {
    select.setCustomValidity(`слишком много комнат`);
}
  else if (selectedGuestNumberS[0].value > selectedRoomNumberS[0].value) {
    select.setCustomValidity(`добавьте больше комнат`);
   } else {
    select.setCustomValidity(``);
  }
  select.reportValidity();
}



guestNumbers.addEventListener(`change`, function() {


checkRoomsGuests(guestNumbers);
});

roomNumbers.addEventListener(`change`, function() {

checkRoomsGuests(roomNumbers);
});



fieldset.forEach(function (field){
  field.setAttribute('disabled', `disabled`);
});

select.forEach(function (item){
  item.setAttribute('disabled', `disabled`);
});




const initialAddress = function(pin) {
  const leftX = document.querySelector(`.map__pin--main`).style.left;
  const topY = document.querySelector(`.map__pin--main`).style.top; // получить координату  y верхнего угла орандевой метки
  const x = Math.floor(parseInt(leftX) + (mapPinMain.offsetWidth / 2));// получить координату центра точки половина ширины контейнера (width)
  const y = Math.floor(parseInt(topY) + (mapPinMain.offsetHeight / 2)); // получить координату центра точки  половина высоты контейнера (height) parseInt
  const address = form.querySelector(`#address`) // input с адресом


  address.value = `${x}, ${y}`;
  console.log(y)
  // address.innerText = x;
  // debugger;

}


const activatePage = function() {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);

  fieldset.forEach(function (field){
      field.removeAttribute('disabled');

    })

    select.forEach(function (item){
      item.removeAttribute('disabled');
  });

  const leftX = document.querySelector(`.map__pin--main`).style.left;
  const topY = document.querySelector(`.map__pin--main`).style.top; // получить координату  y верхнего угла орандевой метки
  const x = Math.floor(parseInt(leftX) + (mapPinMain.offsetWidth / 2)); // получить координату центра точки половина ширины контейнера (width)
  const y = Math.floor(parseInt(topY) + (mapPinMain.offsetHeight * 1.5)); // получить координату центра точки  половина высоты контейнера (height) parseInt
  const address = form.querySelector(`#address`) // input с адресом
  console.log(mapPinMain.children[1])

  address.value = `${x} ${y}`;
console.log(mapPinMain.children[1].offsetHeight)
};


mapPinMain.addEventListener(`click`, function () {
 activatePage();
 // getActivateAddress();

});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
});









function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateObject(index) {
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


const renderPins = function () {

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

renderPins();


function arrayRandElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getAvatar(index) {
  return `img/avatars/user0${index + 1}.png`;
}

function getTitle() {
  return arrayRandElement(TITLES);
}

// function getAddress(x, y) {
//   return x + `, ` + y;
// }

function getAddress(x, y) {
  return `${arrayRandElement(STREETS)} ${randomInteger(1, 100)} (${x}, ${y})`;
}

function getPrice() {
  return randomInteger(1000, 10000);
}

function getType() {
  return arrayRandElement(TYPES);
}

function getRoom() {
  return randomInteger(1, 2);
}

function getGuest() {
  return randomInteger(1, 5);
}

function getCheckout() {
  return arrayRandElement(CHECKOUTINS);
}

function getCheckin() {
  return arrayRandElement(CHECKOUTINS);
}

function getFeature() {
  const features = [];
  const randFeature = randomInteger(1, FEATURES.length);
  for (var i = 0; i < randFeature; i++) {
    features.push(arrayRandElement(FEATURES));
  }
  return features;
}

function getDescription() {
  return arrayRandElement(DESCRIPTIONS);
}

function getPhotos() {
  const photos = [];
  const randPhoto = randomInteger(1, PHOTOS.length);
  for (var i = 0; i < randPhoto; i++) {
    photos.push(arrayRandElement(PHOTOS));
  }
  return photos;
}

function getLocationY() {
  return randomInteger(130, 630);
}

function getLocationX() {
  return randomInteger(130, 630);
}


function generateObjects(count) {
  const resultObjects = [];
  for (var i = 0; i < count; i++) {
    resultObjects.push(generateObject(i));
  }
  return resultObjects;
}

initialAddress();
