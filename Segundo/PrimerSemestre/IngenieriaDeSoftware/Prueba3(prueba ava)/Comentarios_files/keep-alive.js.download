"use strict";
eesy.define(['jquery-private', 'sessionInfo'], function ($, sessionInfo) {
    /*
      private functions:
    */
    function keepAliveTimer() {
        $.ajax({
            url: sessionInfo.dashboardUrl() + "/rest/public/session/keep-alive?sessionkey=" + sessionInfo.sessionKey(),
            type: 'PUT',
            success: function (data) { }
        });
        setTimeout(keepAliveTimer, 600000);
    }
    /*
    public functions:
    */
    function start() {
        setTimeout(keepAliveTimer, 600000);
    }
    return {
        start: start
    };
});
//# sourceMappingURL=keep-alive.js.map