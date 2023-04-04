/*!
 * jQuery Dynamic Width Plugin v1.1
 * https://github.com/samliew/dynamic-width
 *
 * Copyright https://github.com/samliew
 * Released under the MIT license
 */
 
(function($) {

    const params = {
         minWidth: 0,
         additionalPadding: 3
    };

    /**
     * @summary Dynamically resize element to width of text content
     * @returns {jQuery} jQuery object (chainable)
     * @link https://github.com/samliew/dynamic-width
     * @example
     *   $('input').dynamicWidth();
     */
    $.fn.dynamicWidth = function (opts) {
        $.extend(params, opts);

        const plugin = $.fn.dynamicWidth;

        // Reusable private hidden element to measure text width
        if (!plugin.fakeEl) {
            plugin.fakeEl = $('<span style="position:absolute; display:none;"></span>').appendTo(document.body);
        }

        const sizeToContent = el => {
            const $el = $(el);
            const cs = getComputedStyle(el);
            plugin.fakeEl.text(el.value || el.innerText || el.placeholder)
                .css('font-family', $el.css('font-family'))
                .css('font-size', $el.css('font-size'))
                .css('font-weight', $el.css('font-weight'))
                .css('font-style', $el.css('font-style'))
                .css('line-height', $el.css('line-height'));
            const elemPadding = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
            const newWidth = plugin.fakeEl.width() + elemPadding + params.additionalPadding;
            $el.css('width', newWidth > params.minWidth ? newWidth : params.minWidth);
        };

        return this.each(function (i, el) {
            sizeToContent(el);
            $(el).off('change keypress keyup blur')
              .on('change keypress keyup blur', evt => sizeToContent(evt.target));
        });
    };

})(jQuery);
