"use strict";

(function () {
  function applyFilters() {
    let filteredHotels = window.hotels;

    const housingType = document.querySelector(`#housing-type`).value;
    window.closeCard();
    if (housingType !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.type === housingType);
    }
    const moneyType = document.querySelector(`#housing-price`).value;
    if (moneyType !== `any`) {
      if (moneyType === `middle`) {
        filteredHotels = filteredHotels.filter((hotel) => (hotel.offer.price >= 10000 && hotel.offer.price <= 50000));
      } else if (moneyType === `low`) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.offer.price < 10000);
      } else if (moneyType === `high`) {
        filteredHotels = filteredHotels.filter((hotel) => hotel.offer.price > 50000);
      }
    }
    const housingRooms = document.querySelector(`#housing-rooms`).value;
    if (housingRooms !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.rooms === Number(housingRooms));
    }
    const housingGuests = document.querySelector(`#housing-guests`).value;
    if (housingGuests !== `any`) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.guests === Number(housingGuests));
    }
    const housingWifi = document.querySelector(`#filter-wifi`);
    if (housingWifi.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`wifi`));
    }
    const housingDishwasher = document.querySelector(`#filter-dishwasher`);
    if (housingDishwasher.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`dishwasher`));
    }
    const housingParking = document.querySelector(`#filter-parking`);
    if (housingParking.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`parking`));
    }
    const housingWasher = document.querySelector(`#filter-washer`);
    if (housingWasher.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`washer`));
    }
    const housingElevator = document.querySelector(`#filter-elevator`);
    if (housingElevator.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`elevator`));
    }
    const housingConditioner = document.querySelector(`#filter-conditioner`);
    if (housingConditioner.checked) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.offer.features.includes(`conditioner`));
    }

    window.renderPins(filteredHotels);
  }

  window.applyFilters = applyFilters;

  addEventListener(`change`, applyFilters);

})();
