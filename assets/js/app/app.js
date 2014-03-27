
/*! Dead-Simple-OffCanvas Implementation
 * Created by Pongstr Ordillo [http://github.com/pongstr]
 * Requires jQuery v1.9+ or ZeptoJS v1+
 */
+function ($) { 'use strict';

		var OffCanvas = function (element, options) {
			this.element   = (element) ? element : '[data-toggle=off-canvas]';
			this.options   = (options) ? options : this.defaults;

			this.drawers   = '[data-toggle=offcanvas-drawer]';
			this.backBttn  = '[data-toggle=submenuback]';
			this.slideMenu = '[data-offcanvas=menu]';
			this.offCanvas = '[data-offcanvas=true]';
			this.target    = '[data-offcanvas=target]';

			return this;
		};

  OffCanvas.prototype.helper = {
    classTogglr: function (opt, callback) {
      $.each(opt, function (key, value) {
        $(value).toggleClass('active');
      });

			callback && callback();
    }
  };

  OffCanvas.prototype.engage = function () {
    var scope = {
				app: this,
				helper: OffCanvas.prototype.helper
			},
			target = $(scope.app.element).data('target');

    $(target).attr('data-offcanvas', 'target');
    $(scope.app.element) .on('click', function (e) {
      var elements = {
        element: this,
        offCanvas: scope.app.offCanvas,
        slideMenu: scope.app.slideMenu,
        canvasTarget: $(this).data('target')
      };

      $(elements.slideMenu + '> *')
        .removeClass('active');

			scope.helper.classTogglr(elements);
      $(scope.app.slideMenu).removeClass('offset');
      $(target).removeClass('active-submenu');

      e.preventDefault();
    });
  };

  OffCanvas.prototype.submenu = function () {
    var scope = {
      app: this,
      helper: OffCanvas.prototype.helper
    };

    // Level 1: Open Sub menu
    $(scope.app.drawers).each(function () {
      $(this).on('click', function (e) {
        var target = $(this).attr('href');

        // Offset SlideMenu
        $(scope.app.target).addClass('active-submenu');
        $(scope.app.slideMenu).addClass('offset');
        $(target).toggleClass('active');

        $(scope.app.element).toggleClass('active-submenu');

				e.preventDefault();
      });
    });

    // Level 2: Go Back to Main menu
    $(scope.app.backBttn).each(function () {
      $(this).on('click', function (e) {

        $(scope.app.target).removeClass('active-submenu');
        $(scope.app.element).removeClass('active-submenu');
        $(scope.app.slideMenu).removeClass('offset');
        $(this).parent('div.drawer').removeClass('active');

        e.preventDefault();
      });
    });
  };

  window.offcanvas = new OffCanvas();

  $(document)
    .on('load', offcanvas.engage())
    .on('load', offcanvas.submenu());

}(this.jQuery);


/*! Drag and Drop content blocks
 * Created by Pongstr Ordillo [http://github.com/pongstr]
 * Requires jQuery v1.9+ or ZeptoJS v1+ and jQueryUI v1.10.14
 */

+function ($) { 'use strict';
  var app = {
    drawer:'.drawer'
    , target: '[data-offcanvas=target]'
    , toggle: '[data-toggle=off-canvas]'
    , backBttn: '[data-toggle=submenuback]'
    , slideMenu: '[data-offcanvas=menu]'
    , offCanvas: '[data-offcanvas=true]'
  };

  $('.draggable').draggable({
    connectToSortable: '#canvas',
    snap: true,
    helper: 'clone',
    revert: 'invalid',
    cursorAt: { top: 45, left: 50 },
    stop: function (event, ui) {
      // setTimeout(function () {

      $.each(app, function (key, value) {
				var offset = $(value).hasClass('offset'),
					active = $(value).hasClass('active-submenu');

				$(value).removeClass('active');

				offset && $(value).removeClass('offset');
				active && $(value).removeClass('active-submenu');

			});

      // }, 500)
    }
  });

  // $('.draggable').each(function () {
  //   if ($(this).data('content') !== undefined) {

  //   }
  // });


  $('[data-section=canvas]')
    .disableSelection()
    .sortable({
      revert: false,
      cursor: 'move',
      cursorAt: { top: 50, left: 50 },
      placeholder: 'highlight',
      connectWith: '#trashbin',
      zIndex: 2000,
      scroll: false,
      update: function (event, ui) {
        var uiProps = {
          content: $(ui.item).data('content'),
          width:   this.clientWidth,
          height:  this.clientHeight
        };

        $(ui.item)
          .empty()
          .load(uiProps.content, function () {
            $(this).append(uiProps.remove);
            $('.rmBlock').each(function () {
              $(this).on('click', function (e) {
                $(ui.item).remove();
              });
            });
          }).removeClass('draggable');
      }
    });

    $('#trashbin').sortable({
      over: function (event, ui) {
        $(this).addClass('active')
      },
      update: function (event, ui) {
        $(ui.item).remove();
        $(this).removeClass('active');
      }
    });


}(window.jQuery);