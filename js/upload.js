"use strict";
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const form = document.querySelector(`.ad-form`);
  window.upload = function (onSuccess, onError) {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.open(`POST`, URL);
    xhr.send(formData);
  };
})();
