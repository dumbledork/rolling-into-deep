/*! Dead-Simple-OffCanvas Implementation
 * Created by Pongstr Ordillo [http://github.com/pongstr]
 * Requires jQuery v1.9+ or ZeptoJS v1+
 */
+function ($) { 'use strict';

  var OffCanvas = function (element, options) {
    this.element   = (element) ? element : '[data-toggle=off-canvas]';
    this.options   = (options) ? options : this.defaults;
    this.offCanvas = '[data-off-canvas]';
    
    this.drawers   = '[data-toggle=offcanvas-drawer]';
    this.backBttn  = '[data-toggle=submenuback]';
    this.slideMenu = '[data-offcanvas=menu]';
    this.target    = '[data-offcanvas=target]';

    return this;
  };

  // Helper Functions
  OffCanvas.defaults = {
    activate: function (opt, callback) {
      $.each(opt, function (key, value) {
        $(value).toggleClass('active');
        console.log(value + '.active')

        callback && callback();
      });
    }
  };

  // OffCanvas Plugin
  OffCanvas.prototype.engage = function () {
    var app  = this,
        hlpr = OffCanvas.defaults;

    $(app.element).on('click', function (e) {
      var components = {
        panel: app.slideMenu,
        canvas: app.offCanvas,
        togglr: this,
        target: $(this).data('target')
      };

      hlpr.activate(components)

      e.preventDefault();
    });
  };

  // OffCanvas SubMenu
  OffCanvas.prototype.panel = function () {};

  // Plugin Definition
  // =================
  
   $.fn.offcanvas = function (option) {
    var options  = $.extend({}, OffCanvas.defaults, option);

    return this.each(function () {
      var offcanvas = new OffCanvas;
          offcanvas.engage($(this)[0], options);
    });
  };
  
   $.fn.offcanvas.defaults = OffCanvas.defaults;

  // DATA-API Definition
  // ===================

  window.offcanvas = new OffCanvas;

  $(document)
    .on('load', offcanvas.engage())
    .on('load', offcanvas.panel());

}(window.jQuery);