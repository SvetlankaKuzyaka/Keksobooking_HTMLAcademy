define(function() {

   var HotelBase = function() {};

   HotelBase.prototype._data = null;

   HotelBase.prototype.render = function() {};

   HotelBase.prototype.remove = function() {};

   HotelBase.prototype.setData = function(data) {
      this._data = data;
   };

   HotelBase.prototype.getData = function() {
      return this._data;
   }; 
  
  return HotelBase;

});
