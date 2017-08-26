'use strict';

(function() {

  var container = document.querySelector('.hotels-list');
  var activeFilter = 'filter-all';
  var hotels = [];

  var filters = document.querySelectorAll('.hotel-filter');
  for (i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var clickedElementID = evt.target.id;
      setActiveFilter(clickedElementID);
    };
  }

  getHotels();

  function setActiveFilter(id) {
     if (activeFilter === id) {
       return; }
     filters.querySelector['#' + activeFilter].classList.remove('hotel-filter-selected');
     filters.querySelector['#' + id].classList.add('hotel-filter-selected');
     var filteredHotels = hotels.slice(0);
     switch (id) {
       case 'filter-expensive':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return b.price - a.price;
         });
         break;
       case 'filter-cheap':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return a.price - b.price;
         });
         break;
       case 'filter-2stars':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return a.price - b.price;
         }).filter(function(item) {return (item.stars > 2); });
         break;
       case 'filter-6rating':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return a.price - b.price;
         }).filter(function(item) {return (item.rating >= 6);  });
         break;
       default: break;
     }
     renderHotels(filteredHotels);
     activeFilter = id;
  }

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
      hotels = loadedHotels;
      renderHotels(loadedHotels);
   };
   xhr.send();
 }

  function renderHotels(hotelsToRender) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    hotelsToRender.forEach(function(hotel) {
      var element = getElementFromTemplate(hotel);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
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
