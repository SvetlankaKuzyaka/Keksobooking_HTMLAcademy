(function() {

   var Hotel = function() {
      this._onClick = this._onClick.bind(this);
   }

   Hotel.prototype = new HotelBase();

   Hotel.prototype.render = function () {
        var template = document.querySelector('#hotel-template');

        if ('content' in template) {
          this.element = template.content.children[0].cloneNode(true);
        } else {
          this.element = template.children[0].cloneNode(true);
        }

        this.element.querySelector('.hotel-name').textContent = this._data.getName();
        this.element.querySelector('.hotel-rating').textContent = this._data.getRating();
        this.element.querySelector('.hotel-stars').textContent = this._data.getStars();
        this.element.querySelector('.hotel-distance-kilometers').textContent = this._data.getDistance();
        this.element.querySelector('.hotel-price-value').textContent = this._data.getPrice();
        var amenities = '';
        this._data.getAmenities().forEach(function(el) {
           amenities += amenities + '<li>' + el + '</li>';
        }, this);
        this.element.querySelector('.hotel-amenities').innerHtml += amenities;
        var backgroundImage = new Image();

        backgroundImage.onload = function() {
         clearTimeout(imageLoadTimeout);
         this.element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
      }.bind(this);

        backgroundImage.onerror = function() {
          this.element.classList.add('hotel-nophoto');
        }.bind(this);

        var IMAGE_TIMEOUT = 10000;
        var imageLoadTimeout = setTimeout(function() {
          backgroundImage.src = '';
          this.element.classList.add('hotel-nophoto');}.bind(this),
          IMAGE_TIMEOUT);

        backgroundImage.src = this._data.getPreview();

        this.element.addEventListener('click', this._onClick);
   };

   Hotel.prototype.remove = function() {
      this.element.removeEventListener('click', this._onClick);
   };

   Hotel.prototype._onClick = function(evt) {
      if (evt.target.classList.contains('hotel') && !this.element.classList.contains('hotel-nophoto')) {
        if (typeof this.onClick === 'function') {
           this.onClick();
        }
      }
   };

   Hotel.prototype.onClick = null;

   window.Hotel = Hotel;

})();
