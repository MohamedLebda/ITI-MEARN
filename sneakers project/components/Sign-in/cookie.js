export var cookieLibrary = {
  getCookie: function (cookieName) {
    var name = cookieName + "=";
    var decodedCookie = document.cookie;
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length);
      }
    }

    return null;
  },

  setCookie: function (cookieName, cookieValue) {
    var date = new Date();
    date.setDate(date.getDate() + 3);
    var cookieString =
      cookieName + "=" + cookieValue + "; expires=" + date + "; path=/;";
    document.cookie = cookieString;
  },

  deleteCookie: function (cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  },

  allCookieList: function () {
    var decodedCookie = document.cookie;
    var cookieArray = decodedCookie.split(";");
    var cookies = {};

    for (var i = 0; i < cookieArray.length; i++) {
      var cookieParts = cookieArray[i].split("=");
      cookies[cookieParts[0].trim()] = cookieParts[1].trim();
    }

    return cookies;
  },

  hasCookie: function (cookieName) {
    return this.getCookie(cookieName) !== null;
  },
};
