"use strict";
eesy.define([
    'jquery-private',
    'sessionInfo',
    'engine-state',
    'utils',
    'helpitem-loader',
    'context-links',
    'mouse',
    'json!settings-supportcenter',
    'mustachejs',
    'json!language',
    'proactive-hints',
    'presentation-helper',
    'helpitem-visibility',
    'systrays',
    'quick-survey',
    'hints',
    'popups',
    'helpitem-handling',
    'walkthroughs',
], function (
/**
 * Some of these imports are not used, but still required in order to work.
 * DO NOT REMOVE without proper testing.
 */
$, sessionInfo, engineState, utils, helpitemLoader, contextlinks, mouse, settings, Mustache, language, proactiveHints, presentationHelper, helpitemVisibility, systrays, quickSurvey, hints, popups, helpitemHandling, walkthroughs) {
    window.addEventListener('previewhelp', function (ev) {
        var helpItem = ev.detail.helpItem;
        if (helpItem.itemtype === 'Hint') {
            hints.preview(helpItem);
        }
        else if (helpItem.itemtype === 'Systray') {
            systrays.preview(helpItem);
        }
        else if (['Message', 'HtmlCode', 'File'].indexOf(helpItem.itemtype) > -1) {
            popups.preview(helpItem);
        }
    }, true);
    window.addEventListener('previewhelphide', function () {
        $('#hintcontainer[data-helpitemid="preview"]').remove();
        $('#systraycontainer').remove();
        $('.eesy_dark').remove();
        $('#eesy-dark-screen').remove();
        $('#eesy-standardcontainer').remove();
    }, true);
    function showHintProactive(helpItem, connectTo) {
        proactiveHints.show(helpItem, connectTo);
    }
    function showHint(helpItem) {
        hints.show(helpItem);
    }
    function hideHint() {
        hints.hide();
    }
    function showPopup(helpItem) {
        popups.show(helpItem);
    }
    function showSystray(helpItem) {
        systrays.show(helpItem);
    }
    function showWalkthrough(helpItem, triggerBy) {
        walkthroughs.start(helpItem, triggerBy);
    }
    function showSupportTab() {
        supportTab.show(function () {
            supportTab.launchSupportCenter();
            utils.focusElement("#supportCenterMainHeading", 500);
        });
    }
    function fadeAndRemoveWithDark(target, onFaded) {
        target.fadeOut('fast', function () {
            $(this).remove();
            if ($('.eesy_dark').length) {
                $('.eesy_dark').fadeOut('fast', function () {
                    $(this).remove();
                    onFaded();
                });
            }
            else {
                onFaded();
            }
        });
    }
    function closeHelpitem(target) {
        var container = $(target).closest(".eesy_container");
        var helpItemId = container.data("helpitemid");
        var helpItemType = container.data("helpitem-type");
        if (helpItemType.toLowerCase() === 'walkthrough') {
            walkthroughs.close(helpItemId);
            return;
        }
        if (var_proactive_version > 2 && container.find('.eesy_hide_switch input').is(':checked')) {
            helpitemVisibility.dontShowAgain(helpItemId);
        }
        else {
            helpitemVisibility.closeItem(helpItemId);
        }
        fadeAndRemoveWithDark(container, function () {
            $('body').removeClass('eesy_modal_open');
            $(document).trigger("presentation.hide.item");
        });
    }
    utils.onClickOrSelectKey('.eesy_hint_close', function (e, target) { return closeHelpitem(target); });
    utils.onClickOrSelectKey('.eesy_close', function (e, target) { return closeHelpitem(target); });
    utils.onClickOrSelectKey('.eesy_systray_close', function (e, target) { return closeHelpitem(target); });
    // v2 & v1
    function hideAndFade(selector, element, onFaded) {
        helpitemVisibility.dontShowAgain($(selector).data("helpitemid"));
        fadeAndRemoveWithDark($(element).parents(".eesy_container"), onFaded);
    }
    utils.onClickOrSelectKey('#hintcontainer .eesy_hint_hide', function (e, element) {
        hideAndFade('#hintcontainer', element, function () { });
    });
    utils.onClickOrSelectKey('.eesy_systray_hide', function (e, element) {
        hideAndFade('#systraycontainer', element, function () { });
    });
    utils.onClickOrSelectKey('.eesy_standard_hide', function (e, element) {
        hideAndFade('#eesy-standardcontainer', element, function () {
            $(document).trigger("presentation.hide.item");
        });
    });
    utils.onClickOrSelectKey('.eesy_hintfixed_dontshowanymore', function (e, target) {
        var helpItemId = $(target).parents(".eesy_container").data("helpitemid");
        helpitemVisibility.dontShowAgain(helpItemId);
    });
    return {
        hideHint: hideHint,
        showHint: showHint,
        showHintProactive: showHintProactive,
        showPopup: showPopup,
        showSupportTab: showSupportTab,
        showSystray: showSystray,
        showWalkthrough: showWalkthrough,
    };
});
//# sourceMappingURL=presentation.js.map