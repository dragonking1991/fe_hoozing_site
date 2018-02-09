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
      let dom = new DOM();
      this.content = dom.createDOM('div', 'row popup');
      this.content.id = `content${this.id}`;
      this.popupIcon = dom.createDOM('div', 'popup__icon');
      this.image = dom.createDOM('img', 'popup__image');
      this.popupIcon.innerHTML="hello";
      this.popupWrapper = dom.createDOM('div', 'popup-wrapper');
      this.popupClose = dom.createDOM('span', 'popup__close');
      this.popupTitle = dom.createDOM('div', 'popup__title');
      this.popupText = dom.createDOM('div', 'popup__text');
      this.popupContent = dom.createDOM('div', 'popup__content');
      this.gift = dom.createDOM('div', 'popup__gift');
      this.link = dom.createDOM('link', 'link');
      this.link.href = '#';
      // this.image.src = 'assets/images/icons/icon-milo.png';
      this.image.src = iconMilo;
      this.image.alt = 'logo';
      if (this.isActive()) {
        this.link.style.display = 'none';
      } else {
        this.image.style.opacity = 0.6;
        this.link.innerHTML = 'Check opening calendar >';
      }
      dom.appendMultiDOM(this.popupWrapper, [this.popupClose, this.popupTitle, this.popupText]);
      dom.appendMultiDOM(this.popupText, [this.popupContent, this.gift, this.link]);
      dom.appendMultiDOM(this.content, [this.popupIcon, this.popupWrapper]);
      document.body.appendChild(this.content);
    }

    Popup.prototype.setContent = function (address, timeOpen, gift) {
      if (this.isActive()) {
        this.popupContent.innerHTML = `Open now (${timeOpen})`;
        this.gift.innerHTML = `Gift Available: <b>${gift}</b>`;
      } else {
        this.popupContent.innerHTML = `Close now`;
      }
      this.popupTitle.innerHTML = address;
    }
    Popup.prototype.isOpen = function () {
      return this.content.classList.contains('show') ? true : false;
    }
    Popup.prototype.isActive = function () {
      return this.storeEl.isOpen ? true : false;
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
      this.popupIcon.classList.remove('show-popup');
      this.popupWrapper.classList.remove('show-popup');
    };
    Popup.prototype.open = function () {
      this.content.classList.add('show');
      this.popupIcon.classList.add('show-popup');
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
