"use strict";
// const CHECKOUTINS = [`12:00`, `13:00`, `14:00`];
// const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
// const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
// const TITLES = [`JR Kyushu Hotel Blossom Shinjuku`, `Mitsui Garden Hotel Jingugaien Tokyo Premier`, `Shinagawa Prince Hotel 3`, `THE BLOSSOM HIBIYA`, `Sotetsu Fresa Inn Ginza Sanchome`, `The Peninsula Tokyo`, `Tokyo Marriott Hotel`, `Hilton Tokyo Bay`, `THE KNOT TOKYO Shinjuku`, `karaksa hotel premier Tokyo Ginza`];
// const TYPES = [`palace`, `flat`, `house`, `bungalow`];
// const DESCRIPTIONS = [`description1`, `description2`, `description3`, `description4`, `description5`, `description6`, `description7`, `description8`, `description9`, `description10`];
// const STREETS = [`Улица Омотесандо`, `Улица Гейш`, `Улица Амейоко`, `Улица Такешита Дори`, `Улица Нака-мисэ-дори`];
// const MIN_TITLE_LENGTH = 2;
// const MAX_TITLE_LENGTH = 25;
// const mapPinMain = document.querySelector(`.map__pin--main`);
// const map = document.querySelector(`.map`);
// const form = document.querySelector(`.ad-form`);
// const select = document.querySelectorAll(`select`);
// const address = document.querySelector(`#address`);
// const titleInput = document.querySelector(`#title`);
// const guestNumbers = form.querySelector(`#capacity`);
// const roomNumbers = form.querySelector(`#room_number`);
// var pins = generateObjects(8);


// // util.js
// function randomInteger(min, max) {
//   const rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// }
//
// function arrayRandElement(arr) {
//   const rand = Math.floor(Math.random() * arr.length);
//   return arr[rand];
// }
//
// // mocks
//
// function generateObject(index) {
//   const x = getLocationX();
//   const y = getLocationY();
//   return {
//     author: {
//       avatar: getAvatar(index)
//     },
//     offer: {
//       title: getTitle(),
//       address: getAddress(x, y),
//       price: getPrice(),
//       type: getType(),
//       room: getRoom(),
//       guest: getGuest(),
//       checkin: getCheckin(),
//       checkout: getCheckout(),
//       features: getFeature(),
//       description: getDescription(),
//       photos: getPhotos()
//     },
//     location: {
//       x: x,
//       y: y
//     }
//
//   };
// }
//
//
// function getAvatar(index) {
//   return `img/avatars/user0${index + 1}.png`;
// }
//
// function getTitle() {
//   return arrayRandElement(TITLES);
// }
//
// // function getAddress(x, y) {
// //   return x + `, ` + y;
// // }
//
// function getAddress(x, y) {
//   return `(${x}, ${y})`;
// }
//
// function getPrice() {
//   return randomInteger(1000, 10000);
// }
//
// function getType() {
//   return arrayRandElement(TYPES);
// }
//
// function getRoom() {
//   return randomInteger(1, 2);
// }
//
// function getGuest() {
//   return randomInteger(1, 5);
// }
//
// function getCheckout() {
//   return arrayRandElement(CHECKOUTINS);
// }
//
// function getCheckin() {
//   return arrayRandElement(CHECKOUTINS);
// }
//
// function getFeature() {
//   const features = [];
//   const randFeature = randomInteger(1, FEATURES.length);
//   for (var i = 0; i < randFeature; i++) {
//     features.push(arrayRandElement(FEATURES));
//   }
//   return features;
// }
//
// function getDescription() {
//   return arrayRandElement(DESCRIPTIONS);
// }
//
// function getPhotos() {
//   const photos = [];
//   const randPhoto = randomInteger(1, PHOTOS.length);
//   for (var i = 0; i < randPhoto; i++) {
//     photos.push(arrayRandElement(PHOTOS));
//   }
//   return photos;
// }
//
// function getLocationY() {
//   return randomInteger(130, 630);
// }
//
// function getLocationX() {
//   return randomInteger(130, 630);
// }
//
//
// function generateObjects(count) {
//   const resultObjects = [];
//   for (var i = 0; i < count; i++) {
//     resultObjects.push(generateObject(i));
//   }
//   return resultObjects;
// };

// window.initialAddress();
