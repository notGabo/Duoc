"use strict";
eesy.define([
    'jquery-private', 'utils', 'mustachejs', 'presentation-helper', 'helpitem-visibility', 'eesy-timers'
], function ($, utils, Mustache, presentationHelper, helpitemVisibility, eesyTimers) {
    return { show: show };
    function show(helpItem, connectTo) {
        $("body").after(Mustache.to_html(eesyTemplates.hintfixed, presentationHelper.helpItemModel(helpItem), eesyTemplates));
        __showHintProactive(helpItem, connectTo);
    }
    function __showHintProactive(helpItem, connectTo) {
        var _a;
        if (!helpitemVisibility.isVisible(helpItem.id)) {
            hideHint(helpItem.id, connectTo);
            return;
        }
        if (window.sessionStorage["build_mode"] === "true") {
            $(connectTo).removeClass('eesy-highlighted');
        }
        else {
            var surveyHeight = $('#systraycontainer_' + helpItem.id + ' .quick-survey-section').outerHeight();
            surveyHeight = surveyHeight ? surveyHeight : 54.7; // set default for proactive v4
            var surveyOffset = (var_proactive_version == 4) ? surveyHeight : 0;
            var metrics = calcMetrics(connectTo, parseInt(helpItem.width), parseInt(helpItem.height), surveyOffset);
            var hintXPos = 0;
            var hintYPos = 0;
            var arrowPos = undefined;
            var allowedDirections = ["BOTTOM", "TOP", "RIGHT", "LEFT", "BOTTOMRIGHT", "BOTTOMLEFT", "TOPRIGHT", "TOPLEFT"];
            var orientationCandidates = allowedDirections.indexOf(helpItem.orientation) === -1 ? allowedDirections : [helpItem.orientation];
            var orientation_1 = getOrientation(metrics, orientationCandidates);
            var $systrayContainer = $('#systraycontainer_' + helpItem.id);
            if (orientation_1 !== undefined) {
                $(connectTo).addClass('eesy-highlighted');
                var c = metrics.hintMetricsCentered;
                var t = metrics.target;
                var h = metrics.hintMetrics;
                _a = {
                    "BOTTOM": ["up", c.left, t.top + t.height + 14],
                    "TOP": ["down", c.left, t.top - h.height - surveyOffset - 15],
                    "RIGHT": ["right", t.left + t.width + 15, c.top],
                    "LEFT": ["left", t.left - h.width - 15, c.top],
                    "BOTTOMRIGHT": ["up rightcorner", t.left + t.width - 20, t.top + t.height + 14],
                    "BOTTOMLEFT": ["up leftcorner", t.left - h.width + 20, t.top + t.height + 14],
                    "TOPRIGHT": ["down rightcorner", t.left + t.width - 20, t.top - h.height - surveyOffset - 15],
                    "TOPLEFT": ["down leftcorner", t.left - h.width + 20, t.top - h.height - surveyOffset - 15]
                }[orientation_1], arrowPos = _a[0], hintXPos = _a[1], hintYPos = _a[2];
                $systrayContainer.css({
                    'position': 'absolute',
                    'height': helpItem.height + 'px',
                    'width': helpItem.width + 'px',
                    'top': hintYPos,
                    'left': hintXPos
                });
                $('#arrowInner_' + helpItem.id)
                    .removeClass('eesyarrow up down left right leftcorner rightcorner')
                    .addClass('eesyarrow ' + arrowPos);
                if ((arrowPos == "down" || arrowPos == "down rightcorner" || arrowPos == "down leftcorner") && var_proactive_version == 4) {
                    $('#arrow_' + helpItem.id + ' .eesyarrow').css({
                        'top': 'calc(100% + ' + surveyOffset + 'px - 1.5px )'
                    });
                }
                else {
                    $('#arrow_' + helpItem.id + ' .eesyarrow').css("top", "");
                }
                if (utils.isTargetVisible(metrics.target, connectTo)) {
                    $('#arrow_' + helpItem.id).fadeIn('slow');
                    $systrayContainer.fadeIn('slow');
                }
                else {
                    $('#arrow_' + helpItem.id).fadeOut('slow');
                    $systrayContainer.fadeOut('slow');
                }
            }
            else if (!utils.isTargetVisible(metrics.target, connectTo)) {
                $('#arrow_' + helpItem.id).fadeOut('slow');
                $systrayContainer.fadeOut('slow');
            }
        }
        eesyTimers.set("helpitem" + helpItem.id, 100, function () {
            __showHintProactive(helpItem, connectTo);
        });
    }
    function hideHint(id, connectTo) {
        $('#systraycontainer_' + id).fadeOut('fast').remove();
        $(connectTo).removeClass('eesy-highlighted');
        $('#arrow_' + id).remove();
        $(document).trigger("helpitemHandle.hide", [id]);
    }
    function getOrientation(metrics, orientationCandidates) {
        return orientationCandidates.find(function (c) { return canPositionAt(metrics, c); });
    }
    function canPositionAt(metrics, orientationCandidate) {
        var orientationChecks = {
            "BOTTOM": function () { return metrics.canCenter.x && metrics.space.below; },
            "TOP": function () { return metrics.canCenter.x && metrics.space.above; },
            "RIGHT": function () { return metrics.canCenter.y && metrics.space.right; },
            "LEFT": function () { return metrics.canCenter.y && metrics.space.left; },
            "BOTTOMRIGHT": function () { return metrics.space.below && metrics.space.right; },
            "BOTTOMLEFT": function () { return metrics.space.below && metrics.space.left; },
            "TOPRIGHT": function () { return metrics.space.above && metrics.space.right; },
            "TOPLEFT": function () { return metrics.space.above && metrics.space.left; }
        };
        return orientationChecks[orientationCandidate]();
    }
    function calcMetrics(connectTo, hintWidth, hintHeight, surveyOffset) {
        var hintOffset = 10;
        var target = {
            left: $(connectTo).offset().left,
            top: $(connectTo).offset().top,
            width: Math.max($(connectTo).outerWidth(), $(connectTo).width()),
            height: Math.max($(connectTo).outerHeight(), $(connectTo).height())
        };
        var hintMetrics = {
            width: hintWidth,
            height: hintHeight
        };
        var hintMetricsCentered = {
            left: target.left + (target.width - hintMetrics.width) / 2,
            top: target.top + (target.height - hintMetrics.height) / 2
        };
        var space = {
            below: (target.top + target.height + hintMetrics.height + surveyOffset + hintOffset) < $(window).scrollTop() + $(window).height(),
            above: (target.top - hintMetrics.height - surveyOffset - hintOffset) > $(window).scrollTop(),
            right: (target.left + target.width + hintMetrics.width + hintOffset) < $(window).scrollLeft() + $(window).width(),
            left: (target.left - hintMetrics.width - hintOffset) > $(window).scrollLeft()
        };
        var canCenter = {
            x: (hintMetricsCentered.left >= 0)
                && (hintMetricsCentered.left + hintMetrics.width) < $("body").width()
                && (space.below || space.above),
            y: (hintMetricsCentered.top >= 0)
                && (hintMetricsCentered.top + hintMetrics.height + surveyOffset + hintOffset) < $(window).height() + $(window).scrollTop()
                && (space.left || space.right)
        };
        return {
            target: target,
            hintMetrics: hintMetrics,
            hintMetricsCentered: hintMetricsCentered,
            space: space,
            canCenter: canCenter
        };
    }
});
//# sourceMappingURL=proactive-hints.js.map