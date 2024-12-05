"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
eesy.define([
    'jquery-private',
    'mustachejs',
    'sessionInfo',
    'helpitem-visibility',
    'systrays',
    'proactive-hints',
    'popups',
    'context-probe',
    'condition-matcher',
    'eesy-timers',
], function ($, Mustache, sessionInfo, helpitemVisibility, systrays, proactiveHints, popups, ctxProbe, conditionMatcher, eesyTimers) {
    var userId = (var_user_map || {}).id || 'anony_mouse';
    var activeWalks = [];
    var BRK_DELIMITER = '#BRK#';
    var EXIT_CONFIRM_SELECTOR = '.eesy-step-exit-confirmation';
    var POPUP_TYPE_NONE = '4';
    var STORAGE_KEY = "eesysoft_walkthroughs_" + userId;
    var TIMER_ID = 'active_walks:contexts_probing';
    var TRANS_TYPE_BTN = 'step_button';
    var TRANS_TYPE_EXIT = 'exit_walkthrough';
    var TRANSITIONS_SELECTOR = '.eesy-step-transitions';
    var RENDERABLE_TRANSITIONS_TYPES = [TRANS_TYPE_EXIT, TRANS_TYPE_BTN];
    $(document).on('click', TRANSITIONS_SELECTOR + " button", onTransitionsBtnClick);
    $(document).on('click', EXIT_CONFIRM_SELECTOR + " button.cancel-btn", removeExitConfirmation);
    $(document).on('click', EXIT_CONFIRM_SELECTOR + " button.confirm-btn", onWalkExitConfirmBtnClick);
    loadActiveWalks();
    return { start: start, close: close };
    function close(walkId) {
        var templateArgs = { walkId: walkId };
        $('body').append(Mustache.to_html(eesyTemplates.step_exit_confirmation, templateArgs));
    }
    function start(walk) {
        var found = getWalkById(walk.id);
        if (found) {
            // Passed `walkthrough` is already active.
            return;
        }
        var stepsData = JSON.parse(walk.embed);
        activeWalks.push({
            entity: walk,
            entryPointId: stepsData.entryPointId,
            steps: stepsData.steps,
        });
        setActiveWalks(activeWalks);
        restartActiveWalks();
    }
    function loadActiveWalks() {
        try {
            var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (Array.isArray(parsed)) {
                activeWalks = parsed;
            }
        }
        catch (err) {
            console.error(err);
        }
        if (activeWalks.length) {
            sessionInfo.onInited(function () {
                deactivateWalksWhenAllStepsPlayed();
                restartActiveWalks();
            });
        }
    }
    function setActiveWalks(newValue) {
        activeWalks = newValue;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activeWalks));
    }
    function restartActiveWalks() {
        eesyTimers.stop(TIMER_ID);
        var contextIds = getActiveWalksContextsIds();
        var url = getContextRulesConditionsUrl(contextIds);
        if (!contextIds.length) {
            return;
        }
        $.getJSON(url, function (response) {
            var rulesMap = {};
            response.forEach(function (i) {
                try {
                    var conditions = JSON.parse(i.recognition).conditions;
                    if (Array.isArray(conditions) && conditions.length) {
                        rulesMap[i.id] = { id: i.id, conditions: conditions };
                    }
                }
                catch (err) {
                    console.error(err);
                }
            });
            if (Object.keys(rulesMap).length) {
                extendActiveWalksStepsWithContextsRules(rulesMap);
                probeForContexts();
            }
        });
    }
    function extendActiveWalksStepsWithContextsRules(map) {
        activeWalks.forEach(function (activeWalk) {
            Object.keys(activeWalk.steps).forEach(function (stepId) {
                var step = activeWalk.steps[stepId];
                step.rules = step.context_ids.map(function (id) { return map[id]; });
            });
        });
        setActiveWalks(activeWalks); // To persist 'step' changes.
    }
    function probeForContexts() {
        eesyTimers.set(TIMER_ID, 1e3, probeForContexts);
        if ($('.eesy_container').length) {
            return;
        }
        for (var _i = 0, activeWalks_1 = activeWalks; _i < activeWalks_1.length; _i++) {
            var walk = activeWalks_1[_i];
            for (var stepId in walk.steps) {
                var _a = walk.steps[stepId], rules = _a.rules, isPlayed = _a.isPlayed;
                if (isPlayed) {
                    continue;
                }
                for (var _b = 0, rules_1 = rules; _b < rules_1.length; _b++) {
                    var rule = rules_1[_b];
                    var candidates = getCandidatesForRule(rule);
                    if (candidates.length) {
                        showStep(walk.entity.id, stepId, candidates[0]);
                        return;
                    }
                }
            }
        }
    }
    function getContextRulesConditionsUrl(contextIds) {
        var idsParam = encodeURI(JSON.stringify(contextIds));
        return sessionInfo.dashboardUrl() + "/rest/public/context-rules-conditions?ids=" + idsParam;
    }
    function getActiveWalksContextsIds() {
        var ids = [];
        activeWalks.forEach(function (activeWalk) {
            Object.keys(activeWalk.steps).forEach(function (stepId) {
                var step = activeWalk.steps[stepId];
                ids.push.apply(ids, step.context_ids);
            });
        });
        return ids.filter(function (el, index) { return ids.indexOf(el) === index; });
    }
    function markHelpItemAsClosed(walkId) {
        if (var_proactive_version > 2 && $('.eesy_hide_switch input').is(':checked')) {
            helpitemVisibility.dontShowAgain(walkId);
        }
        else {
            helpitemVisibility.closeItem(walkId);
        }
    }
    function onTransitionsBtnClick(ev) {
        var container = $(ev.currentTarget).closest('.eesy_container');
        var walkId = container.data('helpitemid');
        var type = $(ev.currentTarget).data('transition-type');
        if (type === TRANS_TYPE_EXIT) {
            close(walkId);
            return;
        }
        var destinationId = $(ev.currentTarget).data('transition-destination');
        var walk = getWalkById(walkId);
        if (!walk) {
            throw new Error("Walk ID \"" + walkId + "\" cannot be found.");
        }
        if (!destinationId || !(destinationId in walk.steps)) {
            throw new Error("Destination ID \"" + destinationId + "\" cannot be found in steps.");
        }
        closeMessages(walkId);
        var step = walk.steps[destinationId];
        for (var _i = 0, _a = step.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            var candidates = getCandidatesForRule(rule);
            if (candidates.length) {
                showStep(walk.entity.id, destinationId, candidates[0]);
                return;
            }
        }
        alert('ERROR: Requested element cannot be found on current page!');
    }
    function getCandidatesForRule(rule) {
        var currUrl = ctxProbe.getDocumentLocation(document);
        var candidates = $('body *:visible');
        for (var _i = 0, _a = rule.conditions; _i < _a.length; _i++) {
            var cond = _a[_i];
            candidates = conditionMatcher.reduceCandidates(currUrl, document, candidates, cond);
        }
        return candidates;
    }
    function removeExitConfirmation() {
        $(EXIT_CONFIRM_SELECTOR).remove();
    }
    function onWalkExitConfirmBtnClick() {
        var walkId = $(EXIT_CONFIRM_SELECTOR).data('walk-id');
        if (!isNaN(walkId)) {
            setActiveWalks(activeWalks.filter(function (i) { return i.entity.id !== walkId; }));
        }
        removeExitConfirmation();
        closeMessages(walkId);
        markHelpItemAsClosed(walkId);
        restartActiveWalks();
    }
    function closeMessages(walkId) {
        hideProactiveHint(walkId);
        popups.hide();
        systrays.hide(walkId);
        $('.eesy_dark').remove();
        $('#eesy-dark-screen').remove();
    }
    function hideProactiveHint(walkId) {
        eesyTimers.stop("helpitem" + walkId);
        $("#systraycontainer_" + walkId).remove();
        $("#arrow_" + walkId).remove();
        $('.eesy-highlighted').removeClass('eesy-highlighted');
    }
    function showStep(walkId, stepId, anchorElement) {
        var walk = getWalkById(walkId);
        if (!walk) {
            throw new Error("Walk ID \"" + walkId + "\" not found.");
        }
        var step = walk.steps[stepId];
        if (!step) {
            throw new Error("Step ID \"" + stepId + "\" not found.");
        }
        var parsed = parseBRK(step.content);
        var showArg = __assign(__assign(__assign(__assign(__assign({}, walk.entity), step), { transitions: getRenderableTransition(step) }), parsed), { embed: parsed.html });
        switch (step.type) {
            case 'hint':
                proactiveHints.show(showArg, anchorElement);
                break;
            case 'popup':
                popups.show(showArg);
                break;
            case 'systray':
                systrays.show(showArg);
                break;
            default:
                throw new Error("Unsupported step type: \"" + step.type + "\".");
        }
        step.isPlayed = true;
        setActiveWalks(activeWalks); // To persist this 'isPlayed' new value.
    }
    function getWalkById(id) {
        return activeWalks.filter(function (i) { return i.entity.id === id; })[0];
    }
    function deactivateWalksWhenAllStepsPlayed() {
        var toDeactivate = [];
        activeWalks.forEach(function (walk) {
            var allStepsAmount = Object.keys(walk.steps).length;
            var playedStepsAmount = Object.keys(walk.steps)
                .map(function (stepId) { return walk.steps[stepId].isPlayed; })
                .filter(Boolean).length;
            if (allStepsAmount === playedStepsAmount) {
                toDeactivate.push(walk.entity.id);
            }
        });
        setActiveWalks(activeWalks.filter(function (i) { return toDeactivate.indexOf(i.entity.id) < 0; }));
    }
    /**
     * There are two types of #BRK# patterns:
     * for 'hint' OR 'systray'   --> <mode>#BRK#<width>#BRK#<height>#BRK#<content>
     * for 'popup' AKA 'message' --> <width>#BRK#<height>#BRK#<msgType>:<content>
     *
     * Server side logic: https://github.com/Eesy/eesy-server/blob/4b8af832e410daa32f28ca67f00574c3fc517777/src/main/java/services/HelpItemStruct.java#L58
     */
    function parseBRK(text) {
        var defaults = {
            height: null,
            html: text,
            popupType: POPUP_TYPE_NONE,
            width: null,
        };
        if (typeof text !== 'string') {
            return defaults;
        }
        if (text.split(BRK_DELIMITER).length !== 3) {
            var _a = text.split(BRK_DELIMITER), width_1 = _a[1], height_1 = _a[2], html = _a[3];
            return {
                html: (html || '').trim(),
                width: parseDimension(width_1),
                height: parseDimension(height_1),
                popupType: POPUP_TYPE_NONE,
            };
        }
        var separatorIndex = text.indexOf(':');
        if (separatorIndex === -1) {
            return defaults;
        }
        var brkPart = text.substring(0, separatorIndex);
        var contentPart = text.substring(separatorIndex + 1);
        var _b = brkPart.split(BRK_DELIMITER), width = _b[0], height = _b[1], popupType = _b[2];
        return {
            html: contentPart.trim(),
            width: parseDimension(width),
            height: parseDimension(height),
            popupType: popupType,
        };
    }
    function parseDimension(value) {
        return value === '0' ? null : value;
    }
    function getRenderableTransition(step) {
        if (!step || !Array.isArray(step.transitions)) {
            return [];
        }
        return step.transitions.filter(isRenderableTransition);
    }
    function isRenderableTransition(transition) {
        if (RENDERABLE_TRANSITIONS_TYPES.indexOf(transition.type) === -1) {
            return false;
        }
        var normalizedCaption = (transition.caption || '').trim();
        return Boolean(normalizedCaption);
    }
});
//# sourceMappingURL=walkthroughs.js.map