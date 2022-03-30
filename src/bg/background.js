function safe_add(e, t) {
  var n = (65535 & e) + (65535 & t);
  return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}
function bit_rol(e, t) {
  return e << t | e >>> 32 - t
}
function md5_cmn(e, t, n, r, d, o) {
  return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(r, o)), d), n)
}
function md5_ff(e, t, n, r, d, o, i) {
  return md5_cmn(t & n | ~t & r, e, t, d, o, i)
}
function md5_gg(e, t, n, r, d, o, i) {
  return md5_cmn(t & r | n & ~r, e, t, d, o, i)
}
function md5_hh(e, t, n, r, d, o, i) {
  return md5_cmn(t ^ n ^ r, e, t, d, o, i)
}
function md5_ii(e, t, n, r, d, o, i) {
  return md5_cmn(n ^ (t | ~r), e, t, d, o, i)
}
function binl_md5(e, t) {
  e[t >> 5] |= 128 << t % 32,
  e[14 + (t + 64 >>> 9 << 4)] = t;
  var n, r, d, o, i, s = 1732584193, a = -271733879, m = -1732584194, f = 271733878;
  for (n = 0; n < e.length; n += 16)
      r = s,
      d = a,
      o = m,
      i = f,
      s = md5_ff(s, a, m, f, e[n], 7, -680876936),
      f = md5_ff(f, s, a, m, e[n + 1], 12, -389564586),
      m = md5_ff(m, f, s, a, e[n + 2], 17, 606105819),
      a = md5_ff(a, m, f, s, e[n + 3], 22, -1044525330),
      s = md5_ff(s, a, m, f, e[n + 4], 7, -176418897),
      f = md5_ff(f, s, a, m, e[n + 5], 12, 1200080426),
      m = md5_ff(m, f, s, a, e[n + 6], 17, -1473231341),
      a = md5_ff(a, m, f, s, e[n + 7], 22, -45705983),
      s = md5_ff(s, a, m, f, e[n + 8], 7, 1770035416),
      f = md5_ff(f, s, a, m, e[n + 9], 12, -1958414417),
      m = md5_ff(m, f, s, a, e[n + 10], 17, -42063),
      a = md5_ff(a, m, f, s, e[n + 11], 22, -1990404162),
      s = md5_ff(s, a, m, f, e[n + 12], 7, 1804603682),
      f = md5_ff(f, s, a, m, e[n + 13], 12, -40341101),
      m = md5_ff(m, f, s, a, e[n + 14], 17, -1502002290),
      a = md5_ff(a, m, f, s, e[n + 15], 22, 1236535329),
      s = md5_gg(s, a, m, f, e[n + 1], 5, -165796510),
      f = md5_gg(f, s, a, m, e[n + 6], 9, -1069501632),
      m = md5_gg(m, f, s, a, e[n + 11], 14, 643717713),
      a = md5_gg(a, m, f, s, e[n], 20, -373897302),
      s = md5_gg(s, a, m, f, e[n + 5], 5, -701558691),
      f = md5_gg(f, s, a, m, e[n + 10], 9, 38016083),
      m = md5_gg(m, f, s, a, e[n + 15], 14, -660478335),
      a = md5_gg(a, m, f, s, e[n + 4], 20, -405537848),
      s = md5_gg(s, a, m, f, e[n + 9], 5, 568446438),
      f = md5_gg(f, s, a, m, e[n + 14], 9, -1019803690),
      m = md5_gg(m, f, s, a, e[n + 3], 14, -187363961),
      a = md5_gg(a, m, f, s, e[n + 8], 20, 1163531501),
      s = md5_gg(s, a, m, f, e[n + 13], 5, -1444681467),
      f = md5_gg(f, s, a, m, e[n + 2], 9, -51403784),
      m = md5_gg(m, f, s, a, e[n + 7], 14, 1735328473),
      a = md5_gg(a, m, f, s, e[n + 12], 20, -1926607734),
      s = md5_hh(s, a, m, f, e[n + 5], 4, -378558),
      f = md5_hh(f, s, a, m, e[n + 8], 11, -2022574463),
      m = md5_hh(m, f, s, a, e[n + 11], 16, 1839030562),
      a = md5_hh(a, m, f, s, e[n + 14], 23, -35309556),
      s = md5_hh(s, a, m, f, e[n + 1], 4, -1530992060),
      f = md5_hh(f, s, a, m, e[n + 4], 11, 1272893353),
      m = md5_hh(m, f, s, a, e[n + 7], 16, -155497632),
      a = md5_hh(a, m, f, s, e[n + 10], 23, -1094730640),
      s = md5_hh(s, a, m, f, e[n + 13], 4, 681279174),
      f = md5_hh(f, s, a, m, e[n], 11, -358537222),
      m = md5_hh(m, f, s, a, e[n + 3], 16, -722521979),
      a = md5_hh(a, m, f, s, e[n + 6], 23, 76029189),
      s = md5_hh(s, a, m, f, e[n + 9], 4, -640364487),
      f = md5_hh(f, s, a, m, e[n + 12], 11, -421815835),
      m = md5_hh(m, f, s, a, e[n + 15], 16, 530742520),
      a = md5_hh(a, m, f, s, e[n + 2], 23, -995338651),
      s = md5_ii(s, a, m, f, e[n], 6, -198630844),
      f = md5_ii(f, s, a, m, e[n + 7], 10, 1126891415),
      m = md5_ii(m, f, s, a, e[n + 14], 15, -1416354905),
      a = md5_ii(a, m, f, s, e[n + 5], 21, -57434055),
      s = md5_ii(s, a, m, f, e[n + 12], 6, 1700485571),
      f = md5_ii(f, s, a, m, e[n + 3], 10, -1894986606),
      m = md5_ii(m, f, s, a, e[n + 10], 15, -1051523),
      a = md5_ii(a, m, f, s, e[n + 1], 21, -2054922799),
      s = md5_ii(s, a, m, f, e[n + 8], 6, 1873313359),
      f = md5_ii(f, s, a, m, e[n + 15], 10, -30611744),
      m = md5_ii(m, f, s, a, e[n + 6], 15, -1560198380),
      a = md5_ii(a, m, f, s, e[n + 13], 21, 1309151649),
      s = md5_ii(s, a, m, f, e[n + 4], 6, -145523070),
      f = md5_ii(f, s, a, m, e[n + 11], 10, -1120210379),
      m = md5_ii(m, f, s, a, e[n + 2], 15, 718787259),
      a = md5_ii(a, m, f, s, e[n + 9], 21, -343485551),
      s = safe_add(s, r),
      a = safe_add(a, d),
      m = safe_add(m, o),
      f = safe_add(f, i);
  return [s, a, m, f]
}
function binl2rstr(e) {
  var t, n = "";
  for (t = 0; t < 32 * e.length; t += 8)
      n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
  return n
}
function rstr2binl(e) {
  var t, n = [];
  for (n[(e.length >> 2) - 1] = void 0,
  t = 0; t < n.length; t += 1)
      n[t] = 0;
  for (t = 0; t < 8 * e.length; t += 8)
      n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
  return n
}
function rstr_md5(e) {
  return binl2rstr(binl_md5(rstr2binl(e), 8 * e.length))
}
function rstr_hmac_md5(e, t) {
  var n, r, d = rstr2binl(e), o = [], i = [];
  for (o[15] = i[15] = void 0,
  d.length > 16 && (d = binl_md5(d, 8 * e.length)),
  n = 0; n < 16; n += 1)
      o[n] = 909522486 ^ d[n],
      i[n] = 1549556828 ^ d[n];
  return r = binl_md5(o.concat(rstr2binl(t)), 512 + 8 * t.length),
  binl2rstr(binl_md5(i.concat(r), 640))
}
function rstr2hex(e) {
  var t, n, r = "0123456789abcdef", d = "";
  for (n = 0; n < e.length; n += 1)
      t = e.charCodeAt(n),
      d += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
  return d
}
function str2rstr_utf8(e) {
  return unescape(encodeURIComponent(e))
}
function raw_md5(e) {
  return rstr_md5(str2rstr_utf8(e))
}
function hex_md5(e) {
  return rstr2hex(raw_md5(e))
}
function raw_hmac_md5(e, t) {
  return rstr_hmac_md5(str2rstr_utf8(e), str2rstr_utf8(t))
}
function hex_hmac_md5(e, t) {
  return rstr2hex(raw_hmac_md5(e, t))
}
function md5_(e, t, n) {
  return t ? n ? raw_hmac_md5(t, e) : hex_hmac_md5(t, e) : n ? raw_md5(e) : hex_md5(e)
}
var MD5 = function(e) {
  return M(V(Y(X(e), 8 * e.length))).toLowerCase()
};
function M(e) {
  for (var t, n = "0123456789ABCDEF", r = "", d = 0; d < e.length; d++)
      t = e.charCodeAt(d),
      r += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
  return r
}
function X(e) {
  for (var t = Array(e.length >> 2), n = 0; n < t.length; n++)
      t[n] = 0;
  for (n = 0; n < 8 * e.length; n += 8)
      t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
  return t
}
function V(e) {
  for (var t = "", n = 0; n < 32 * e.length; n += 8)
      t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
  return t
}
function Y(e, t) {
  e[t >> 5] |= 128 << t % 32,
  e[14 + (t + 64 >>> 9 << 4)] = t;
  for (var n = 1732584193, r = -271733879, d = -1732584194, o = 271733878, i = 0; i < e.length; i += 16) {
      var s = n
        , a = r
        , m = d
        , f = o;
      r = md5_ii(r = md5_ii(r = md5_ii(r = md5_ii(r = md5_hh(r = md5_hh(r = md5_hh(r = md5_hh(r = md5_gg(r = md5_gg(r = md5_gg(r = md5_gg(r = md5_ff(r = md5_ff(r = md5_ff(r = md5_ff(r, d = md5_ff(d, o = md5_ff(o, n = md5_ff(n, r, d, o, e[i + 0], 7, -680876936), r, d, e[i + 1], 12, -389564586), n, r, e[i + 2], 17, 606105819), o, n, e[i + 3], 22, -1044525330), d = md5_ff(d, o = md5_ff(o, n = md5_ff(n, r, d, o, e[i + 4], 7, -176418897), r, d, e[i + 5], 12, 1200080426), n, r, e[i + 6], 17, -1473231341), o, n, e[i + 7], 22, -45705983), d = md5_ff(d, o = md5_ff(o, n = md5_ff(n, r, d, o, e[i + 8], 7, 1770035416), r, d, e[i + 9], 12, -1958414417), n, r, e[i + 10], 17, -42063), o, n, e[i + 11], 22, -1990404162), d = md5_ff(d, o = md5_ff(o, n = md5_ff(n, r, d, o, e[i + 12], 7, 1804603682), r, d, e[i + 13], 12, -40341101), n, r, e[i + 14], 17, -1502002290), o, n, e[i + 15], 22, 1236535329), d = md5_gg(d, o = md5_gg(o, n = md5_gg(n, r, d, o, e[i + 1], 5, -165796510), r, d, e[i + 6], 9, -1069501632), n, r, e[i + 11], 14, 643717713), o, n, e[i + 0], 20, -373897302), d = md5_gg(d, o = md5_gg(o, n = md5_gg(n, r, d, o, e[i + 5], 5, -701558691), r, d, e[i + 10], 9, 38016083), n, r, e[i + 15], 14, -660478335), o, n, e[i + 4], 20, -405537848), d = md5_gg(d, o = md5_gg(o, n = md5_gg(n, r, d, o, e[i + 9], 5, 568446438), r, d, e[i + 14], 9, -1019803690), n, r, e[i + 3], 14, -187363961), o, n, e[i + 8], 20, 1163531501), d = md5_gg(d, o = md5_gg(o, n = md5_gg(n, r, d, o, e[i + 13], 5, -1444681467), r, d, e[i + 2], 9, -51403784), n, r, e[i + 7], 14, 1735328473), o, n, e[i + 12], 20, -1926607734), d = md5_hh(d, o = md5_hh(o, n = md5_hh(n, r, d, o, e[i + 5], 4, -378558), r, d, e[i + 8], 11, -2022574463), n, r, e[i + 11], 16, 1839030562), o, n, e[i + 14], 23, -35309556), d = md5_hh(d, o = md5_hh(o, n = md5_hh(n, r, d, o, e[i + 1], 4, -1530992060), r, d, e[i + 4], 11, 1272893353), n, r, e[i + 7], 16, -155497632), o, n, e[i + 10], 23, -1094730640), d = md5_hh(d, o = md5_hh(o, n = md5_hh(n, r, d, o, e[i + 13], 4, 681279174), r, d, e[i + 0], 11, -358537222), n, r, e[i + 3], 16, -722521979), o, n, e[i + 6], 23, 76029189), d = md5_hh(d, o = md5_hh(o, n = md5_hh(n, r, d, o, e[i + 9], 4, -640364487), r, d, e[i + 12], 11, -421815835), n, r, e[i + 15], 16, 530742520), o, n, e[i + 2], 23, -995338651), d = md5_ii(d, o = md5_ii(o, n = md5_ii(n, r, d, o, e[i + 0], 6, -198630844), r, d, e[i + 7], 10, 1126891415), n, r, e[i + 14], 15, -1416354905), o, n, e[i + 5], 21, -57434055), d = md5_ii(d, o = md5_ii(o, n = md5_ii(n, r, d, o, e[i + 12], 6, 1700485571), r, d, e[i + 3], 10, -1894986606), n, r, e[i + 10], 15, -1051523), o, n, e[i + 1], 21, -2054922799), d = md5_ii(d, o = md5_ii(o, n = md5_ii(n, r, d, o, e[i + 8], 6, 1873313359), r, d, e[i + 15], 10, -30611744), n, r, e[i + 6], 15, -1560198380), o, n, e[i + 13], 21, 1309151649), d = md5_ii(d, o = md5_ii(o, n = md5_ii(n, r, d, o, e[i + 4], 6, -145523070), r, d, e[i + 11], 10, -1120210379), n, r, e[i + 2], 15, 718787259), o, n, e[i + 9], 21, -343485551),
      n = safe_add(n, s),
      r = safe_add(r, a),
      d = safe_add(d, m),
      o = safe_add(o, f)
  }
  return Array(n, r, d, o)
}
function md5_cmn(e, t, n, r, d, o) {
  return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(r, o)), d), n)
}
function md5_ff(e, t, n, r, d, o, i) {
  return md5_cmn(t & n | ~t & r, e, t, d, o, i)
}
function md5_gg(e, t, n, r, d, o, i) {
  return md5_cmn(t & r | n & ~r, e, t, d, o, i)
}
function md5_hh(e, t, n, r, d, o, i) {
  return md5_cmn(t ^ n ^ r, e, t, d, o, i)
}
function md5_ii(e, t, n, r, d, o, i) {
  return md5_cmn(n ^ (t | ~r), e, t, d, o, i)
}
function safe_add(e, t) {
  var n = (65535 & e) + (65535 & t);
  return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}
function bit_rol(e, t) {
  return e << t | e >>> 32 - t
}
const version = chrome.runtime.getManifest().version;
let vid = "";
function make_me_happy(e) {
  if ("number" == typeof e && (e = e.toString()),
  "string" != typeof e)
      return e;
  var t = MD5(e)
    , n = t.substr(0, 3)
    , r = function(e) {
      if (/^\d*$/.test(e)) {
          for (var t = e.length, n = [], r = 0; r < t; r += 9) {
              var d = e.slice(r, Math.min(r + 9, t));
              n.push(parseInt(d).toString(16))
          }
          return ["3", n]
      }
      for (var o = "", i = 0; i < e.length; i++)
          o += e.charCodeAt(i).toString(16);
      return ["4", [o]]
  }(e);
  n += r[0],
  n += 2 + t.substr(t.length - 2, 2);
  for (var d = r[1], o = 0; o < d.length; o++) {
      var i = d[o].length.toString(16);
      1 === i.length && (i = "0" + i),
      n += i,
      n += d[o],
      o < d.length - 1 && (n += "g")
  }
  return n.length < 20 && (n += t.substr(0, 20 - n.length)),
  n + MD5(n).substr(0, 3)
}
function isDevMode() {
  return !("update_url"in chrome.runtime.getManifest())
}
chrome.storage.local.get(["userInfo"], (function(e) {
  vid = e.userInfo && e.userInfo.vid || ""
}
));
var onHeadersReceived = function(e) {
  for (var t = 0; t < e.responseHeaders.length; t++)
      "content-security-policy" === e.responseHeaders[t].name.toLowerCase() && (e.responseHeaders[t].value = "");
  return {
      responseHeaders: e.responseHeaders
  }
}
, init = function() {
  chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
      urls: ["*://weread.qq.com/*"],
      types: ["main_frame", "sub_frame"]
  }, ["blocking", "responseHeaders"])
};
function getCurrentTabId(e) {
  chrome.tabs.query({
      active: !0,
      currentWindow: !0
  }, (function(t) {
      e && e(t.length ? t[0].id : null)
  }
  ))
}
function callbackMsg(e) {
  chrome.tabs.query({
      active: !0,
      currentWindow: !0
  }, (function(t) {
      console.log("**tab**", t),
      chrome.tabs.sendMessage(t[0].id, e, (function(e) {
          console.log(e)
      }
      ))
  }
  ))
}
function sendMsg(e, t) {
  chrome.tabs.sendMessage(t.id, e, (function(e) {
      console.log(e)
  }
  ))
}
function WordBreaker(e, t) {
  function n(e) {
      return o(t.getSentences(e), r)
  }
  function r(e) {
      return o(t.getPhrases(e), d)
  }
  function d(n) {
      for (var r = t.getWords(n), d = Math.min(Math.ceil(r.length / 2), e), o = []; r.length; )
          o.push(r.slice(0, d).join("")),
          r = r.slice(d);
      return o
  }
  function o(n, r) {
      var d = []
        , o = {
          parts: [],
          wordCount: 0
      }
        , i = function() {
          o.parts.length && (d.push(o.parts.join("")),
          o = {
              parts: [],
              wordCount: 0
          })
      };
      return n.forEach((function(n) {
          var s = t.getWords(n).length;
          if (s > e) {
              i();
              for (var a = r(n), m = 0; m < a.length; m++)
                  d.push(a[m])
          } else
              o.wordCount + s > e && i(),
              o.parts.push(n),
              o.wordCount += s
      }
      )),
      i(),
      d
  }
  this.breakText = function(e) {
      return o(t.getParagraphs(e), n)
  }
}
function EastAsianPunctuator() {
  function e(e) {
      for (var t = [], n = 0; n < e.length; n += 2)
          n + 1 < e.length ? t.push(e[n] + e[n + 1]) : e[n] && t.push(e[n]);
      return t
  }
  this.getParagraphs = function(t) {
      return e(t.split(/((?:\r?\n\s*){2,})/))
  }
  ,
  this.getSentences = function(t) {
      return e(t.split(/([.!?]+[\s\u200b]+|[\u3002\uff01]+)/))
  }
  ,
  this.getPhrases = function(t) {
      return e(t.split(/([,;:]\s+|[\u2025\u2026\u3000\u3001\uff0c\uff1b]+)/))
  }
  ,
  this.getWords = function(e) {
      return e.replace(/\s+/g, "").split("")
  }
}
function _nativeSpeakText(e, t, n, r, d) {
  let o = e.shift();
  o && o.length > 0 && chrome.tts.speak(o, {
      lang: t,
      voiceName: n,
      rate: r,
      onEvent: function(o) {
          "end" == o.type && (e.length > 0 ? _nativeSpeakText(e, t, n, r, d) : sendMsg({
              action: "speakEnd",
              data: {}
          }, d))
      }
  })
}
function nativeText(e, t, n, r, d) {
  _nativeSpeakText(new WordBreaker(60,new EastAsianPunctuator).breakText(e), t, n, r, d)
}
function speakText(e, t, n, r, d) {
  let o = e.slice(0, 300);
  o.length > 0 && chrome.tts.speak(o, {
      lang: t,
      voiceName: n,
      rate: r,
      onEvent: function(o) {
          "end" == o.type && (e.slice(300).length > 0 ? speakText(e.slice(300), t, n, r, d) : sendMsg({
              action: "speakEnd",
              data: {}
          }, d))
      }
  })
}
init(),
chrome.webRequest.onBeforeSendHeaders.addListener((function(e) {
  if (console.log("*** webRequest", e.url, e.method),
  e.url.startsWith("https://weread.qq.com/web/book/bookmarklist")) {
      let n = e.url.replace("https://weread.qq.com/web/book/bookmarklist?bookId=", "").replace("&type=1", "");
      for (var t = 0; t < e.requestHeaders.length; ++t)
          "Referer" === e.requestHeaders[t].name && (e.requestHeaders[t].value = "https://weread.qq.com/web/reader/" + make_me_happy(n))
  } else
      e.url.startsWith("https://i.weread.qq.com/");
  return {
      requestHeaders: e.requestHeaders
  }
}
), {
  urls: ["https://weread.qq.com/web/book/bookmarklist*", "https://i.weread.qq.com/*"]
}, ["blocking", "requestHeaders", "extraHeaders"]),
chrome.webRequest.onBeforeRequest.addListener((function(e) {
  return chrome.storage.local.set({
      viduri: e.url
  }),
  {
      redirectUrl: e.url
  }
}
), {
  urls: ["*://weread.qq.com/web/user?userVid=*"],
  types: ["xmlhttprequest"]
}, ["blocking"]),
chrome.extension.onMessage.addListener((function(e, t, n) {
  console.log("**recv**", t);
  const r = e.action;
  let d = "success";
  if (r || (d = "fail",
  r = "null"),
  "speakText" == r)
      chrome.storage.local.get(["rate", "voice"], (function(n) {
          let r = (n.rate || 14) / 10
            , d = "zh-CN"
            , o = "";
          if (n.voice) {
              let e = n.voice.split(",");
              1 == e.length && ["zh-CN", "zh-TW", "zh-HK"].indexOf(e[0]) > -1 && (d = e[0]),
              2 == e.length && ["zh-CN", "zh-TW", "zh-HK"].indexOf(e[0]) > -1 && (d = e[0],
              o = e[1].trim())
          }
          /^Google\s/.test(o) ? nativeText(e.text, d, o, r, t.tab) : speakText(e.text, d, o, r, t.tab)
      }
      ));
  else if ("pauseText" == r)
      chrome.tts.isSpeaking((function(e) {
          e && chrome.tts.pause()
      }
      ));
  else if ("continueText" == r)
      chrome.tts.isSpeaking((function(e) {
          e && chrome.tts.resume()
      }
      ));
  else if ("stopText" == r)
      chrome.tts.isSpeaking((function(e) {
          e && chrome.tts.stop()
      }
      ));
  else if ("exportNotes" == r)
      chrome.tabs.create({
          url: chrome.runtime.getURL("src/notehub/index.html")
      });
  else if ("getBook" == r)
      axios.get(`https://webook.qnmlgb.tech/mp2db?code=${e.code}`, {
          headers: {
              vid: vid,
              version: version
          }
      }).then((function(e) {
          sendMsg({
              action: r,
              data: e.data
          }, t.tab)
      }
      )).catch((function(e) {
          chrome.tabs.query({
              active: !0,
              currentWindow: !0
          }, (function(t) {
              chrome.tabs.sendMessage(t[0].id, {
                  payload: e
              }, (function(e) {}
              ))
          }
          ))
      }
      ));
  else if ("exportNote" == r) {
      let t = $(`<div id="callme" style="position: fixed; left: -9000px;">${e.data}</div>`);
      $("body").prepend(t),
      selection = window.getSelection(),
      range = document.createRange(),
      range.selectNodeContents(t[0]),
      selection.removeAllRanges(),
      selection.addRange(range),
      document.execCommand("copy"),
      window.getSelection().removeAllRanges(),
      $("#callme").remove()
  } else if ("fetch" == r) {
      let n = e.data;
      ["readdetail", "shelf_mp", "shelf_mp_articles", "shelf_mp_articles_more"].indexOf(n.action) > -1 ? fetch(n.url).then((e=>e.json())).then((e=>{
          console.log("*fetch*", e),
          sendMsg({
              action: n.action,
              data: e,
              bookId: n.bookId,
              offset: n.offset
          }, t.tab)
      }
      )) : fetch(n.url, {
          method: "POST",
          body: JSON.stringify(n.payload),
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include"
      }).then((e=>e.json())).then((e=>{
          console.log("*fetch*", e),
          sendMsg({
              action: n.action,
              data: e,
              bookIds: n.payload.bookIds
          }, t.tab)
      }
      ))
  }
  n(`${r} _ ${d}`)
}
));