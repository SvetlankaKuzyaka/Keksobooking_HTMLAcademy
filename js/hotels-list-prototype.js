/* global Hotel: true, Gallery: true */

'use strict';

requirejs.config({
   baseUrl: 'js'
});

define([
   'hotel',
   'gallery',
   'hotel-data',
   'form-validation-mine'
], function(Hotel, Gallery, HotelData) {

  var container = document.querySelector('.hotels-list');
  var activeFilter = localStorage.getItem('activeFilter') || 'all';
  var hotels = [];
  var filteredHotels = [];
  var renderedElements = [];
  var currentPage = 0;
  var PAGE_SIZE = 9;
  var gallery = new Gallery();

  var filters = document.querySelector('.hotels-filters');

  filters.addEventListener('click', function(evt) {
     var clickedElement = evt.target;
     if (clickedElement.classList.contains('hotel-filter')) {
        setActiveFilter(clickedElement.id);
     }
 });

  var scrollTimeout;

  window.addEventListener('scroll', function(evt) {
     clearTimeout(scrollTimeout);
     var scrollTimeout = setTimeout(function() {
        var footerCoordinates = document.querySelector('footer').getBoundingClientRect();
        var viewportSize = window.innerHeight;
        if (footerCoordinates.bottom - viewportSize <= footerCoordinates.height) {
           if (currentPage < Math.ceil(filteredHotels.length / PAGE_SIZE)) {
             renderHotels(filteredHotels, ++currentPage, false);
           }
         }
     }, 100)
  });

  getHotels();

  function setActiveFilter(id, force) {
     if (activeFilter === id && !force) {
       return; }
     document.querySelector('#' + activeFilter).classList.remove('hotel-filter-active');
     document.querySelector('#' + id).classList.add('hotel-filter-active');
     filteredHotels = hotels.slice(0);
     switch (id) {
       case 'expensive-first':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return b.getPrice() - a.getPrice();
         });
         break;
       case 'stars':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return a.getPrice() - b.getPrice();
         }).filter(function(item) {return (item.getStars() > 2); });
         break;
       case 'min-rating':
         filteredHotels = filteredHotels.sort(function(a, b) {
           return a.getPrice() - b.getPrice();
         }).filter(function(item) {return (item.getRating() >= 6);  });
         break;
       case 'distance':
          filteredHotels = filteredHotels.sort(function(a, b) {
            return a.getPrice() - b.getPrice();
         }).filter(function(item) {return (item.getDistance() <= 4);  });
          break;       
       default: break;
     }
     currentPage = 0;
     renderHotels(filteredHotels, currentPage, true);
     activeFilter = id;
     localStorage.setItem('activeFilter', id);
  }

  function getHotels() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/hotels.json');
    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      var loadedHotels = JSON.parse(rawData);
      loadedHotels = loadedHotels.map(function(hotel) {
         return new HotelData(hotel);
      });
      updateLoadedHotels(loadedHotels);

   };
   xhr.send();
 }

 function updateLoadedHotels(loadedHotels) {
   hotels = loadedHotels;
   document.querySelector('.hotels-title-count-number').innerText = hotels.length;
   setActiveFilter(activeFilter, true);
 }

  function renderHotels(hotelsToRender, pageNumber, replace) {
    if (replace) {
      var el;
      while ((el = renderedElements.shift())) {
         container.removeChild(el.element);
         el.onClick = null;
         el.remove();
      }
    }
    var fragment = document.createDocumentFragment();
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageHotels = hotelsToRender.slice(from, to);
    renderedElements = renderedElements.concat(pageHotels.map(function(hotel) {
      var hotelElement = new Hotel();
      hotelElement.setData(hotel);
      hotelElement.render();
      fragment.appendChild(hotelElement.element);
      hotelElement.onClick = function() {
         gallery.setData(hotelElement.getData());
         gallery.render();
      };
      return hotelElement;
   }));
   container.appendChild(fragment);
 }
});
