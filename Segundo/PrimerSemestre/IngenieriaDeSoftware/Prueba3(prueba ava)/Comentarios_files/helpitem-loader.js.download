"use strict";
eesy.define(['jquery-private', 'sessionInfo', 'mustachejs', 'json!user-context-variables'], function ($, sessionInfo, Mustache, userContextVariables) {
    var helpitems = {};
    function loadHelpItem(hid, success) {
        var hi = helpitems[hid];
        if (hi !== undefined) {
            if (!hi.loading) {
                success(hi);
            }
        }
        else {
            helpitems[hid] = { loading: true };
            $.get(getLoadUrl(hid), function (json) {
                helpitems[hid] = {
                    id: hid,
                    title: Mustache.to_html(json.title, userContextVariables),
                    embed: Mustache.to_html(json.embed, userContextVariables),
                    itemtype: json.itemtype,
                    orientation: json.orientation,
                    width: json.width,
                    height: json.height,
                    voting: parseVoting(json),
                    loading: false,
                };
                success(helpitems[hid]);
            });
        }
    }
    return { loadHelpItem: loadHelpItem };
    function parseVoting(json) {
        return {
            enabled: json.voting.enabled == 'true',
            votedUp: json.voting.votedUp == 'true',
            votedDown: json.voting.votedDown == 'true',
        };
    }
    function getLoadUrl(hid) {
        /**
         * BIGEASY_LOCALE is present ONLY in Canvas
         */
        var locale = (window.ENV || {}).BIGEASY_LOCALE || document.documentElement.lang || '';
        return [
            sessionInfo.dashboardUrl(),
            '/rest/public/helpitems/',
            hid,
            '?sessionkey=',
            sessionInfo.sessionKey(),
            '&locale=',
            locale,
            '&languageId=',
            var_language === undefined ? '-1' : var_language,
            '&__dbc=',
            var_eesy_dbUpdateCount,
        ].join('');
    }
});
//# sourceMappingURL=helpitem-loader.js.map