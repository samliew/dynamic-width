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
         additionalPadding: 5
    };

    $.fn.dynamicWidth = function (opts) {
        $.extend(params, opts);

        const plugin = $.fn.dynamicWidth;
        if (!plugin.fakeEl) plugin.fakeEl = $('<span style="position:absolute;"></span>').hide().appendTo(document.body);

        function sizeToContent (el) {
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
        }

        return this.each(function (i, el) {
            sizeToContent(el);
            $(el).on('change keypress keyup blur', evt => sizeToContent(evt.target));
        });
    };

})(jQuery);
