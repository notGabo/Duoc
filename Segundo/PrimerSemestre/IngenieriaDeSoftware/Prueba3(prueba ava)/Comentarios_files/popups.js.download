"use strict";
eesy.define([
    'jquery-private',
    'json!settings-supportcenter', 'mustachejs',
    'presentation-helper'
], function ($, settings, Mustache, presentationHelper) {
    function preview(helpItem) {
        $('.eesy_dark').remove();
        window.scrollTo(0, 0);
        $("body").append(Mustache.to_html(eesyTemplates.standard, presentationHelper.helpItemModel(helpItem), eesyTemplates));
        $('#eesy-dark-screen').addClass("preview");
        $('#eesy-dark-screen').height($(document).height());
        $('#eesy-dark-screen').show();
        $prepareContainer(helpItem).show();
    }
    function hide() {
        $('#eesy-standardcontainer').remove();
    }
    function show(helpItem) {
        $('.eesy_dark').remove();
        $("body").append(Mustache.to_html(eesyTemplates.standard, presentationHelper.helpItemModel(helpItem), eesyTemplates));
        $('#eesy-dark-screen').fadeIn('fast');
        $prepareContainer(helpItem).fadeIn('fast');
    }
    function $prepareContainer(helpItem) {
        var $container = $('#eesy-standardcontainer[data-helpitemid="' + helpItem.id + '"]');
        if (helpItem.width !== "0" || helpItem.height !== "0") {
            $container.css({
                'width': helpItem.width + 'px',
                'height': helpItem.height + 'px'
            });
        }
        return $container;
    }
    return {
        preview: preview,
        show: show,
        hide: hide,
    };
});
//# sourceMappingURL=popups.js.map