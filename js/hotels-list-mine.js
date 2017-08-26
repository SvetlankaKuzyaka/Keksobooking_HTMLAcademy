'use strict';

(function() {

  var container = document.querySelector('.hotels-list');

  getHotels();

 // hotels.forEach(function(hotel) {
   //  var element = getElementFromTemplate(hotel);
   //  container.appendChild(element);
  //});

  function getHotels() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/hotels.json');
    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      var loadedHotels = JSON.parse(rawData);
      renderHotels(loadedHotels);
   };
   xhr.send();
 }

  function renderHotels(hotels) {
    hotels.forEach(function(hotel) {
      var element = getElementFromTemplate(hotel);
      container.appendChild(element);
    });
 }

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
