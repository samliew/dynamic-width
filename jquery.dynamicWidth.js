/*!
 * jQuery Dynamic Width Plugin v1.0
 * https://github.com/samliew/dynamic-width
 *
 * Copyright https://github.com/samliew
 * Released under the MIT license
 */
 
(function($) {

    $.fn.dynamicWidth = function () {
        var plugin = $.fn.dynamicWidth;
        if (!plugin.fakeEl) plugin.fakeEl = $('<span>').hide().appendTo(document.body);

        function sizeToContent (el) {
            var $el = $(el);
            var cs = getComputedStyle(el);
            plugin.fakeEl.text(el.value || el.innerText || el.placeholder).css('font', $el.css('font'));
            $el.css('width', plugin.fakeEl.width() + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight));
        }

        return this.each(function (i, el) {
            sizeToContent(el);
            $(el).on('change keypress keyup blur', evt => sizeToContent(evt.target));
        });
    };

})(jQuery);
