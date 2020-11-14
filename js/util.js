"use strict";

(function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.activatePage();
    }
  });
})();
