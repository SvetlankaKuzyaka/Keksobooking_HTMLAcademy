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
   HotelData.prototype.getName = function() {
      return this.params.name;
   };
   HotelData.prototype.getRating = function() {
      return this.params.rating;
   };
   HotelData.prototype.getStars = function() {
      return this.params.stars;
   };
   HotelData.prototype.getDistance = function() {
      return this.params.distance;
   };
   HotelData.prototype.getAmenities = function() {
      return this.params.amenities;
   };
   HotelData.prototype.getPreview = function() {
      return this.params.preview;
   };

   window.HotelData = HotelData;

})();
