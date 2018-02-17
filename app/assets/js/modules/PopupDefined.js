import DOM from './DOM';

export default class PopupDefined {
  constructor(param, ggmap) {
    this._popup = this.definePopupClass(param, ggmap);

  }
  /**
   * The library reference: https://developers.google.com/maps/documentation/javascript/examples/overlay-popup
   *
   */
  definePopupClass(param, ggmap) {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    let Popup = function (position, id, storeEl) {
      this.id = id;
      this.storeEl = storeEl;
      this.position = position;
      this.init();
      this.content.classList.add('popup-bubble-content');
      let pixelOffset = document.createElement('div');
      pixelOffset.classList.add('popup-bubble-anchor');
      pixelOffset.appendChild(this.content);
      this.anchor = document.createElement('div');
      this.anchor.classList.add('popup-tip-anchor');
      this.anchor.appendChild(pixelOffset);

      // Optionally stop clicks, etc., from bubbling up to the map.
      if (!isIE) {
        this.stopEventPropagation();
      }
    };

    // NOTE: google.maps.OverlayView is only defined once the Maps API has
    // loaded. That is why Popup is defined inside initMap().
    Popup.prototype = Object.create(param);
    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function () {
      this.getPanes().floatPane.appendChild(this.anchor);
    };
    Popup.prototype.init = function () {
      let ele = new DOM();
      this.content = ele.addEle('div', 'row popup');
      this.content.id = `content${this.id}`;


      this.popupPrice = ele.addEle('div', 'popup__price');
      this.popupWrapper = ele.addEle('div', 'popup-wrapper');

      
      this.popupClose = ele.addEle('span', 'popup__close');
      this.popupGallery = ele.addEle('div', 'thumb-gallery');
      this.popupInfo = ele.addEle('div', 'thumb-info');

      //popupGallery
      this.thumbList = ele.addEle('ul', 'thumb-list slider-wrapper');
      this.imageThumb = ele.addEle('img', 'popup__image');
      this.carouselItem  = ele.addEle('li', 'carousel-item active');
      this.thumbList.appendChild(this.carouselItem);
      this.carouselItem.appendChild(this.imageThumb);

      this.love  = ele.addEle('span', 'love');
      this.iconLove  = ele.addEle('i', 'fa fa-heart-o');
      this.love.appendChild(this.iconLove); 
      this.priceTag  = ele.addEle('span', 'price-tag');

      //popupInfo
      this.houseCode = ele.addEle('h4');
      this.houseLink  = ele.addEle('a', "link");
      this.houseTitle  = ele.addEle('h3');
      this.houseLink.appendChild(this.houseTitle);


      ele.multiEle(this.popupGallery, [this.thumbList, this.love, this.priceTag]);
      ele.multiEle(this.popupInfo, [this.houseCode, this.houseLink, this.popupText]);

      ele.multiEle(this.popupWrapper, [this.popupClose, this.popupGallery, this.popupInfo]);
      ele.multiEle(this.content, [this.popupPrice, this.popupWrapper]);
      document.body.appendChild(this.content);
    }

    Popup.prototype.setContent = function (code,name, price, linkAp, images) {
      let pathUrl = "assets/images/dummy/";
      this.popupPrice.innerHTML= price;
      console.lo
      // this.carouselItem  = ele.addEle('li', 'carousel-item active');
      this.imageThumb.src = pathUrl + images;
      this.imageThumb.alt = 'images';
      this.priceTag.innerHTML  = price;
      this.houseCode.innerHTML  = `house code ${code}`;
      this.houseTitle.innerHTML  = name;
      this.houseLink.href = linkAp;
    }

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function () {
      if (this.anchor.parentElement) {
        this.anchor.parentElement.removeChild(this.anchor);
      }
    };
    /** Called when the popup needs to draw itself. */
    Popup.prototype.draw = function () {
      let divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
      // Hide the popup when it is far out of view.
      let display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';
      if (display === 'block') {
        this.anchor.style.left = divPosition.x + 'px';
        this.anchor.style.top = divPosition.y + 'px';
      }
      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    };
    Popup.prototype.close = function () {
      this.content.classList.remove('show');
      this.popupPrice.classList.remove('hide');
      this.popupWrapper.classList.remove('show-popup');
    };
    Popup.prototype.open = function () {
      this.content.classList.add('show');
      this.popupPrice.classList.add('hide');
      this.popupWrapper.classList.add('show-popup');
    };
    /** Stops clicks/drags from bubbling up to the map. */
    Popup.prototype.stopEventPropagation = function () {
      let anchor = this.anchor;
      anchor.style.cursor = 'pointer';
      ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function (event) {
        anchor.addEventListener(event, function (e) {
          e.stopPropagation();
        }, {
          passive: true
        });
      });
    };

    return Popup;
  }
}
