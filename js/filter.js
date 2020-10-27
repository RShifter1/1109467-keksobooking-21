"use strict";

(function () {
  function applyFilters() {
    let filteredHotels = window.hotels;

    const housingType = document.querySelector(`#housing-type`).value;
    if (housingType !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.type === housingType);
    }
    const moneyType = document.querySelector(`#housing-price`).value;
    if (moneyType !== `any`) {
      if (moneyType === `middle`) {
        filteredHotels = filteredHotels.filter((hotel) => (hotel.offer.price >= 10000 && hotel.offer.price <= 50000));
      }
      if (moneyType === `low`) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.offer.price < 10000);
      }
      if (moneyType === `high`) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.offer.price > 50000);
      }
    }
    const housingRooms = document.querySelector(`#housing-rooms`).value;
    if (housingRooms !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.rooms === housingRooms);
    }
    const housingGuests = document.querySelector(`#housing-guests`).value;
    if (housingGuests !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.guests === housingGuests);
    }
    const housingWifi = document.querySelector(`#filter-wifi`);
    if (housingWifi.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[0] === `wifi`);
    }
    const housingDishwasher = document.querySelector(`#filter-dishwasher`);
    if (housingDishwasher.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[1] === `dishwasher`);
    }
    const housingParking = document.querySelector(`#filter-parking`);
    if (housingParking.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[2] === `parking`);
    }
    const housingWasher = document.querySelector(`#filter-washer`);
    if (housingWasher.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[3] === `washer`);
    }
    const housingElevator = document.querySelector(`#filter-elevator`);
    if (housingElevator.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[4] === `elevator`);
    }
    const housingConditioner = document.querySelector(`#filter-conditioner`);
    if (housingConditioner.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features[5] === `conditioner`);
    }

    window.renderPins(filteredHotels);
  }

  window.applyFilters = applyFilters;

  addEventListener(`change`, applyFilters);

})();
