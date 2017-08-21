'use strict';

(function() {

  var container = document.querySelector('.hotels-list');

  hotels.forEach(function(hotel) {
     var element = getElementFromTemplate(hotel);
     container.appendChild(element);
  });

  function getElementFromTemplate(data) {
    var template = document.querySelector('#hotel-template');

    if ('content' in template) {
      var element = template.content.children[0].cloneNode(true);
    } else {
      var element = template.children[0].cloneNode(true);
    }

    element.querySelector('.hotel-name').textContent = data.name;
    element.querySelector('.hotel-rating').textContent = data.rating;
    element.querySelector('.hotel-price-value').textContent = data.price;

    var backgroundImage = new Image();

    backgroundImage.onload = function() {
     clearTimeout(imageLoadTimeout);
     element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
    };

    backgroundImage.onerror = function() {
      element.classList.add('hotel-nophoto');
    };

    var IMAGE_TIMEOUT = 10000;
    var imageLoadTimeout = setTimeout(function() {
      backgroundImage.src = '';
      element.classList.add('hotel-nophoto');},
      IMAGE_TIMEOUT);

    backgroundImage.src = data.preview;

    return element;
  }

})();
