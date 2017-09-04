(function() {

   var Hotel = function(data) {
      this._data = data;
   }

   Hotel.prototype.render = function () {
        var template = document.querySelector('#hotel-template');

        if ('content' in template) {
          this.element = template.content.children[0].cloneNode(true);
        } else {
          this.element = template.children[0].cloneNode(true);
        }

        this.element.querySelector('.hotel-name').textContent = _data.name;
        this.element.querySelector('.hotel-rating').textContent = _data.rating;
        this.element.querySelector('.hotel-price-value').textContent = _data.price;

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
          this.element.classList.add('hotel-nophoto');},
          IMAGE_TIMEOUT);

        backgroundImage.src = this._data.preview;
   };

   window.Hotel = Hotel;

})();
