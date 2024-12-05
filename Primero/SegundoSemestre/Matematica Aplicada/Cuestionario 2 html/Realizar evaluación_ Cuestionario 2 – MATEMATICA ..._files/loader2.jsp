

var eesy_k = "";
var eesy_userInfo={};
var eesy_base = "https://duocava.eesysoft.com";
var eesy_blockurl = "/webapps/ee-Eesypluginv2-BB5fe4a347ea17e/";
var eesy_showtab = false;
var eesy_stmp = 20211008205918023;





//loaderoverride

// fix for when the engine is loaded in the wrong iframe
if (window.name && window.name === "orientationFrame"
    && parent.name && parent.name === "classic-learn-iframe"
    && window.location.hostname === parent.location.hostname) {

    launchLoader2(parent);

} else {
    eesyStartTimer();
}

function launchLoader2(selector) {
    selector.GlobalEesy = window.GlobalEesy;

    var urlSubstring = window.location.href.substr(window.location.href.indexOf("course_id=_") + "course_id=_".length);
    var eesy_course_id = urlSubstring.substr(0, urlSubstring.indexOf("_"));
    selector.eesy_course_id = isNaN(eesy_course_id) || !eesy_course_id.trim().length ? undefined : eesy_course_id
    selector.var_eesy_inactive_roles = [];

    var eesyScriptTag = selector.document.getElementById('eesyloader2');
    if (!eesyScriptTag) {
        var s = selector.document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = window.eesy_blockurl + "loader2.jsp";
        s.id = 'eesyloader2';
        var x = selector.document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
}

function AddJsLoc(doc, iurl) {
  if (doc != null) {
    if (doc.getElementById("eesyengine") == null) {
      var fileref = doc.createElement("script");
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", iurl);
      fileref.setAttribute("id", "eesyengine");
      doc.getElementsByTagName("head")[0].appendChild(fileref);
    }
  }
}

function checkTimer() {
  try {
    if (document.readyState === "complete") {
      var canAccessTop = true;

      if (document.getElementsByTagName('body')[0].className.indexOf('isUltra') !== -1) {
          canAccessTop = false;
      }

      try {
        var tst = top.content;

        if (typeof(tst) == "undefined") {
          canAccessTop = false;
        };
      } catch(err) {
        canAccessTop = false;
      }

      if (!canAccessTop) {
        var loadUrl = eesy_base+"/loader.jsp?stmp=" + eesy_stmp + "&listento=top.nav&showquicklink="
          + eesy_showtab + "&k=" + eesy_k;

        AddJsLoc(document, loadUrl);
      } else {
        var con = top.content;

        if (typeof(con.nodeName) != "undefined") {
          if (con.nodeName.toUpperCase() == "DIV") {
            con = canAccessTop ? top : window;
          }
        } else {
          if (typeof(con.WFS_Files) != "undefined") {
            con = con.WFS_Files;
          } else {
            con = top;
          }
        }

        if (con.document.readyState === "complete") {
          var loadUrl = eesy_base + "/loader.jsp?stmp=" + eesy_stmp
            + "&listento=top.nav&showquicklink=" + eesy_showtab + "&k=" + eesy_k;

          if (con.document.location.href.indexOf("frameset.jsp") == -1) {
            AddJsLoc(con.document, loadUrl);
          } else {
            con = top.content;

            if (con.document.readyState === "complete") {
              AddJsLoc(con.document, loadUrl);
            }
          }
        }
      }

    }
  } catch(err) {
    // ignore
  }

  setTimeout(checkTimer, 1000);
}

var eesy_logingin = false;


function eesy_init() {

  /*
   * - Grab bb info needed to issue a user login on eesy server.
   * - Run login to obtain key.
   * - Start checkTimer.
   */

  if(!eesy_logingin) {
    eesy_logingin = true;
    $j_eesy.post(eesy_base + "/UserLogin.jsp?", eesy_userInfo, function(loginKey) {
      eesy_k = loginKey.trim();

      if (eesy_k != "") {
        $j_eesy.get(eesy_blockurl + "setSessionKey.jsp?key=" + loginKey);
        setTimeout(checkTimer, 200);
      }
    });
  }
}

function eesyStartTimer() {
  if (eesy_k == "" && (eesy_userInfo.key || eesy_userInfo.signature)) {

    // Need to fetch key. Not logged in.
    // Load jquery/set off a chain of event making sure we get it.
    if (typeof $j_eesy === "undefined") {
      var fileref = document.createElement("script");
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", eesy_base + "/Scripts/jquery-1.8.0.v2.min.js");
      document.getElementsByTagName("head")[0].appendChild(fileref);
    } else {
      eesy_init();
    }
  } else {
    setTimeout(checkTimer, 200);
  }
}
