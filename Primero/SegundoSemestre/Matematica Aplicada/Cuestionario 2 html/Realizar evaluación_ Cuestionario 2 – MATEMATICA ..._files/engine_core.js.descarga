"use strict";
eesy.define(['jquery-private', 'context-probe', 'context-handling', 'monitor-handling',
    'events-urlchange', 'events-domchange', 'events-iframe', 'engine-state', 'keep-alive', 'presentation',
    'found-items-handler', 'mouse', 'context-tree-matcher', 'eesy-timers', 'hints', 'helpitem-handling', 'support-tab',
    'utils', 'sessionInfo', 'session-events', 'iframe_communicator_server'], function ($, ctxProbe, ctxHandling, monitorHandling, eventsUrlChange, eventsDOMChange, eventsIframe, engineState, keepAlive, presentation, foundItemsHandler, mouse, contextTreeMatcher, eesyTimers, hints, helpitemHandling, supportTab, utils, sessionInfo, sessionEvents, iframe_communicator_server) {
    var mouseOverElement = undefined;
    var lookupTimer = null;
    window.addEventListener('eesy_launchSupportTab', function () {
        supportTab.launchSupportCenter();
    }, true);
    window.addEventListener("eesy_launchSupportCenterBySessionStorage", function () {
        supportTab.launchSupportCenterBySessionStorage();
    }, true);
    $(document).on('helpitemArticleHandle', function (e, opts) {
        eesyRequire(['supportCenter'], function (supportCenter) {
            supportCenter.showHelpItemInNode(e.originalEvent.detail.helpitemGuid);
        });
    });
    return {
        start: start
    };
    function inBuildMode() {
        return window.sessionStorage.build_mode && window.sessionStorage.build_mode == "true";
    }
    function hideExpertToolChromePlugin() {
        var elementsToHide = ["#expert-build-mode", "#buildModeBar", "#pageShortcut"];
        if (window.parent.$) {
            elementsToHide.forEach(function (elementId) {
                var element = window.parent.$(elementId);
                if (element.length === 1)
                    element.hide();
            });
        }
    }
    function showExpertToolChromePlugin() {
        var $expertTool = window.parent.$("#expert-build-mode");
        if ($expertTool.length === 1 && !inBuildMode())
            $expertTool.show();
        var $buildModeBar = window.parent.$("#buildModeBar");
        if ($buildModeBar.length === 1 && inBuildMode()) {
            $buildModeBar.show();
        }
    }
    function getIframeByEventSource(source) {
        return $('iframe').filter(function (index, iframe) { return $(iframe).get(0).contentWindow === source; });
    }
    function start() {
        engineState.foundNodes.set(foundItemsHandler.create());
        if (var_show_tab) {
            supportTab.show(function () {
                sessionStorage.setItem("lmsMode", "originalCourseExperience");
                supportTab.launchSupportCenter();
                utils.focusElement("#supportCenterMainHeading", 500);
            });
        }
        if (var_uefModeOriginal)
            hideExpertToolChromePlugin();
        if (var_isExpert && var_loadExpertTool) { // load expert tool
            eesyRequire(['expert-tools'], function (expertTools) {
                expertTools.show(function () {
                    // handle expert tool chrome plugin
                    if (var_isExpertToolChromePlugin) {
                        iframe_communicator_server.bind("setUefRoute", function (request) {
                            sessionStorage.setItem("eesyState.route", request.route);
                            window.GlobalEesy = request.GlobalEesy;
                            if (request.route.indexOf("peek.course.classic") !== -1) { // is original course
                                hideExpertToolChromePlugin();
                            }
                            else {
                                showExpertToolChromePlugin();
                            }
                        });
                        for (var i = 0; i < window.parent.frames.length; i++) {
                            window.parent.frames[i].postMessage({ "type": "setUefRoute" }, "*");
                        }
                    }
                });
            });
        }
        monitorHandling.handleUnhandledMonitors();
        // Do not handle monitors when in build mode, uef expert tool or uef support center
        if ((!inBuildMode() && !var_uefMode)
            || (var_uefMode && (window.location !== window.parent.location && !sessionStorage.getItem("eesy_uef_support_center_loaded")))) {
            handleContentChanges();
        }
        if (window['Impact'] && window['Impact'].init) {
            var match = contextTreeMatcher.scanForContext(ctxProbe.getDocumentLocation(document), document);
            var contextRulesIds = [];
            for (var ruleId in match) {
                contextRulesIds.push(ruleId);
            }
            var contextNodePaths = engineState.foundNodes
                .get()
                .getFoundItemsString()
                .split(',');
            window['Impact'].init({
                sessionKey: var_key,
                dashboardUrl: var_dashboard_url,
                languageId: var_language
            }, {
                contextNodePaths: contextNodePaths,
                contextRulesIds: contextRulesIds
            });
        }
        if (window['eesyLaunchConfig'] && window['eesyLaunchConfig'].onLoad) {
            window['eesyLaunchConfig'].onLoad();
        }
        //
        // Allow iframes/lti tools to load the engine directly()
        //
        window.addEventListener("message", function (e) {
            if (e.data.messageName === "lti.ready") {
                if (e.source !== null) {
                    var $ltiIframe = $(getIframeByEventSource(e.source));
                    if ($ltiIframe && $ltiIframe.data("eesyEngineLoaded"))
                        return;
                    var dashboardUrl = sessionInfo.dashboardUrl().indexOf("//") > -1
                        ? sessionInfo.dashboardUrl().split("//")[1]
                        : sessionInfo.dashboardUrl();
                    var showSupportTab = (e.data.supportTab == "inherited")
                        ? (var_show_tab ? "true" : "false")
                        : e.data.supportTab;
                    e.source.postMessage({ eesysoftloader: "//" + dashboardUrl
                            + "/loader.jsp?stmp=" + new Date().getTime()
                            + "&listento=top.nav&embedded=true&showquicklink=" + showSupportTab + "&k=" + sessionInfo.sessionKey() }, "*");
                    $ltiIframe && $ltiIframe.attr("data-eesy-engine-loaded", true);
                }
            }
        }, false);
        if (!var_uefMode || var_uefModeOriginal) {
            registerGuardedHandler(document, "mousemove", handleMouseMove);
            registerGuardedHandler(document, "iframe.mousemove", function (e, orgEvent) { return handleMouseMove(orgEvent); });
            registerGuardedHandler(document, "mouseup", function (e) { return probeForMonitors($(e.target)); });
            registerGuardedHandler(document, "iframe.mouseup", function (e, orgEvent) { return probeForMonitors($(orgEvent.target)); });
            registerGuardedHandler(document, "iframes.changed presentation.hide.item", handleContentChanges);
            registerGuardedHandler(window, "domchanged", handleContentChanges);
            registerGuardedHandler(document, "iframe.focus iframe.added", function (e, iframe) { return probeForMonitors($(iframe).find('body')); });
            registerGuardedHandler(window, "urlchanged", handleContentChanges);
            eventsIframe.start();
            eventsUrlChange.start();
            eventsDOMChange.start();
        }
        //link tracking
        $(document).on("click", "[data-helpitemid] a", function () {
            var helpItemId = $(this).closest("[data-helpitemid]").data("helpitemid");
            sessionEvents.addHelpitemLinkClickedEvent(getLinkClickEventData(helpItemId, this));
        });
        // UEF Events
        if (var_uefMode && (window.location !== window.parent.location) && !inBuildMode() && !var_uefModeOriginal && !var_isExpertToolChromePlugin) {
            window.addEventListener('uefIntegration.routeChange', handleUEFIntegrationRouteChange, true);
            window.addEventListener('uefIntegration.click', handleUEFIntegrationClick, true);
            window.addEventListener('uefIntegration.hover', handleUEFIntegrationHover, true);
            window.addEventListener('uefIntegration.helpRequest', handleUEFIntegrationHelpRequest, true);
            window.addEventListener('uefIntegration.dontshowagain', handleUEFIntegrationDontShowAgain, true);
        }
        keepAlive.start();
        if (var_uefMode && window.location.pathname === "/rest/bbultra/iframe-panel") {
            window.dispatchEvent(new CustomEvent('eesy_launchSupportCenterBySessionStorage'));
        }
    } //main end
    function getLinkClickEventData(_helpItemId, link) {
        var onClick = $(link).attr("onClick");
        var linkType = onClick !== undefined && onClick.indexOf("handleHelpItemByGuid") > -1 ? "helpitem" : "href";
        var target = linkType === "helpitem"
            ? onClick.trim().match(/handleHelpItemByGuid\(["'](.*)["']\)/)[1]
            : $(link).attr("href");
        return {
            linkType: linkType,
            target: target,
            text: $(link).attr("href"),
            helpItemId: _helpItemId
        };
    }
    function handleUEFIntegrationDontShowAgain() {
        var hid = sessionStorage.getItem("dontshowagain");
        $.ajax({
            url: sessionInfo.dashboardUrl() + "/rest/public/helpitems/" + hid + "/hidden?sessionkey=" + sessionInfo.sessionKey(),
            type: 'PUT',
            success: function (data) { }
        });
        sessionStorage.removeItem("dontshowagain");
    }
    function handleUEFIntegrationHelpRequest() {
        sessionStorage.setItem("eesy_foundHelpItems", helpitemHandling.getFoundItemsString());
        sessionStorage.setItem("eesy_foundNodes", engineState.foundNodes.get().getFoundItemsString());
    }
    function handleUEFIntegrationRouteChange() {
        handleContentChanges();
    }
    function handleUEFIntegrationClick(e) {
        probeForMonitors($('body'));
    }
    function handleUEFIntegrationHover(e) {
        helpitemHandling.hideHints();
        probeForHelp($('body'));
    }
    function handleMouseMove(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        if (e.target != mouse.lastelement) {
            mouse.lastelement = e.target;
            var $hintContainer = $("#hintcontainer");
            if (lookupTimer && $hintContainer.length === 0) {
                clearTimeout(lookupTimer);
                lookupTimer = null;
            }
            if (!lookupTimer) {
                lookupTimer = setTimeout(timedLookup, $hintContainer.length > 0 ? 1000 : 10);
            }
        }
    }
    function registerGuardedHandler(target, eventName, handler) {
        $(target).on(eventName, function (e, data) {
            if (inBuildMode())
                return true;
            handler(e, data);
            return true;
        });
    }
    function probeForContexts(element) {
        ctxProbe.probeForElementContexts(ctxHandling.handlePresentContext, element);
        ctxProbe.probeForPresentContexts(element.get(0).ownerDocument, ctxHandling.handlePresentContext);
    }
    function handleContentChanges() {
        if (!eventsDOMChange.isEesyElement(mouse.lastelement)) {
            ctxHandling.clearQueuedContextLinks();
            ctxHandling.clearQueuedMonitors();
            engineState.foundNodes.get().clearFoundItems();
            probeForContexts($('body'));
            eventsIframe.getIFrames().forEach(function (iframe) {
                probeForContexts($(iframe.iframe.documentElement).find('body'));
            });
            ctxHandling.handleQueuedContextLinks();
            ctxHandling.handleQueuedMonitors();
        }
    }
    function timedLookup() {
        if (mouseOverElement !== mouse.lastelement && !eventsDOMChange.isEesyElement(mouse.lastelement)) {
            mouseOverElement = mouse.lastelement;
            helpitemHandling.hideHints();
            probeForHelp(mouseOverElement);
        }
        lookupTimer = null;
    }
    function probeForMonitors(element) {
        ctxProbe.traversePathForMatchingContexts(element, function (contextRule) {
            ctxHandling.handleMonitors(contextRule);
        });
        ctxHandling.handleQueuedMonitors();
    }
    function probeForHelp(element) {
        ctxProbe.traversePathForMatchingContexts(element, function (contextRule) {
            ctxHandling.handleContextLinks(contextRule, element, 0);
        });
        ctxHandling.handleQueuedContextLinks();
    }
});
//# sourceMappingURL=engine_core.js.map