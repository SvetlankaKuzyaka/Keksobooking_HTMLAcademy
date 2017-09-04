(function() {

   function _onCloseClick(evt) {
      this.hide();
   };

   var Gallery = function() {
      this.element = document.querySelector('.gallery-overlay');
      this._closeButton = this.element.querySelector('.gallery-overlay-close');
      this._onCloseClick = this._onCloseClick.bind(this);
   }

   Gallery.prototype.show = function () {
      this.element.classList.remove('hidden');
      this._closeButton.addEventListener('click', this._onCloseClick);
   };

   Gallery.prototype.hide = function () {
      this.element.classList.add('hidden');
      this._closeButton.removeEventListener('click', this._onCloseClick);
   };

   window.Gallery = Gallery;

})();
