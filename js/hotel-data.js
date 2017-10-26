(function() {

   var HotelData = function(data) {
      this.params = data;
   };

   HotelData.prototype.getPictures = function() {
      return this.params.pictures;
   };

   HotelData.prototype.getPrice = function() {
      return this.params.price;
   };

   HotelData.prototype.setPrice = function(price) {
      this.params.price = price;
   };

   window.HotelData = HotelData;

})();
