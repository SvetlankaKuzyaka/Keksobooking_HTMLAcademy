(function() {

   var Hotel = function(data) {
      this._data = data;
      this._onClick = this._onClick.bind(this);
   }

   Hotel.prototype.render = function () {
        var template = document.querySelector('#hotel-template');

        if ('content' in template) {
          this.element = template.content.children[0].cloneNode(true);
        } else {
          this.element = template.children[0].cloneNode(true);
        }

        this.element.querySelector('.hotel-name').textContent = this._data.name;
        this.element.querySelector('.hotel-rating').textContent = this._data.rating;
        this.element.querySelector('.hotel-price-value').textContent = this._data.price;

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

        backgroundImage.src = this._data.preview;

        this.element.addEventListener('click', this._onClick);
   };

   Hotel.prototype.remove = function() {
      this.element.removeEventListener('click', this._onClick);
   };

   Hotel.prototype._onClick = function(evt) {
      if (evt.element.classList.contains('hotel') && !this.element.classList.contains('hotel-nophoto')) {
        if (typeof this.onClick === 'function') {
           this.onClick();
        }
      }
   };

   Hotel.prototype.onClick = null;

   window.Hotel = Hotel;

})();
