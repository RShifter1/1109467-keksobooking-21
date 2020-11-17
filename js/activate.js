"use strict";
(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const select = document.querySelectorAll(`select`);
  const fieldset = document.querySelectorAll(`fieldset`);

  window.isPageActivated = false;

  function activatePage() {
    window.isPageActivated = true;
    window.load(function (hotels) {
      window.hotels = hotels;
      map.classList.remove(`map--faded`);
      form.classList.remove(`ad-form--disabled`);
      fieldset.forEach(function (field) {
        field.removeAttribute(`disabled`);
      });
      select.forEach(function (item) {
        item.removeAttribute(`disabled`);
      });
      window.grabAddress();
      window.renderPins(window.hotels);
      window.renderCards(window.hotels);
    }, function (errorMessage) {
      let node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    });
  }

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      window.activatePage();
    }
  });
  window.activatePage = activatePage;
})();
