'use strict';

(function() {
  var guests = document.querySelector('#searchform-guests-number');
  var rooms = document.querySelector('#searchform-guests-rooms');
  var formElement = document.forms['searchform'];
  var MAX_GUESTS = 6;
  var MAX_GUESTS_PER_ROOM = 3;

  guests.max = MAX_GUESTS;

  function setMinAndMaxRooms(roomsElement, guestsNumber){
    roomsElement.min = Math.ceil(guestsNumber / MAX_GUESTS_PER_ROOM);
    roomsElement.max = guestsNumber;
  }

  guests.value = docCookies.getItem('guests');
  setMinAndMaxRooms(rooms, guests.value);
  rooms.value = rooms.min;

  guests.onchange = function() {
    setMinAndMaxRooms(rooms, guests.value);
    rooms.value = rooms.min;
  }

  formElement.onsubmit = function(evt) {
    evt.preventDefault();
    var dateToExpire = +Date.now() + 3*24*60*60*1000;
    var formattedDateToExpire = new Date(dateToExpire).toUTCString();
    document.cookie = 'guests=' + guests.value + ';expires=' + formattedDateToExpire;
    document.cookie = 'rooms=' + rooms.value + ';expires=' + formattedDateToExpire;
    formElement.submit();
  }
})();
