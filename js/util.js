"use strict";

(function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.activatePage();
    }
  });

  window.onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.closeCard();
    }
  };

})();
