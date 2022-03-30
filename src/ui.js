chrome.runtime.onMessage.addListener((function(e, o, t) {
  if (console.log("**func onMessage**", e),
  !e)
      return;
  let n = e.action;
  if ("getBook" == e.action) {
      var i = e.data;
      if (i && i.db) {
          let e = 0 == i.db.rating.num ? "前往豆瓣" : `豆瓣评分 ${i.db.rating.num}`;
          $("#webook_douban").text(e),
          $("#webook_douban").attr("href", i.db.url),
          $("#webook_douban").css("display", "block")
      }
      i && i.jd && ($("#webook_jd").attr("href", i.jd.union_url),
      $("#webook_jd").css("display", "block"))
  } else if ("speakEnd" == e.action)
      chrome.storage.local.get(["playalltime"], (function(e) {
          let o = e.playalltime;
          if (console.log("**end**", o),
          o) {
              let e = $("button.readerFooter_button");
              e.length > 0 && (e[0].click(),
              setTimeout((function() {
                  $("#webook_player").click()
              }
              ), 1500))
          }
      }
      ));
  else if ("shelfMakeBookPublic" === n)
      e.bookIds.forEach((function(e) {
          $(`#bookid-${e} > .wr_bookCover > .wr_bookCover_privateTag`).remove()
      }
      )),
      showToast("👏 操作成功"),
      $(".m_webook_shelf_checkbox > input").prop("checked", !1);
  else if ("shelfMakeBookPrivate" === n)
      e.bookIds.forEach((function(e) {
          0 == $(`#bookid-${e} > .wr_bookCover > .wr_bookCover_privateTag`).length && $(`#bookid-${e} > .wr_bookCover`).prepend($('<span class="wr_bookCover_privateTag"></span>'))
      }
      )),
      showToast("👏 操作成功"),
      $(".m_webook_shelf_checkbox > input").prop("checked", !1);
  else if ("shelfRemoveBook" === n)
      e.bookIds.forEach((function(e) {
          $(`#bookid-${e}`).remove()
      }
      )),
      showToast("👏 移除成功"),
      $(".m_webook_shelf_checkbox > input").prop("checked", !1);
  else if ("readdetail" === n) {
      let o = e.data;
      if (o && o.datas && o.datas.length > 0) {
          console.log("**readdetail", o);
          let e = o.datas[0];
          e.timeMeta && null != e.timeMeta.totalReadTime && chrome.storage.local.set({
              totalReadTime: e.timeMeta.totalReadTime
          })
      }
  } else if ("shelf_mp" === n) {
      let o = e.data;
      if (!o.books)
          return;
      let t = [];
      if (o.books.forEach((e=>{
          e.bookId.startsWith("MP_WXS_") && (console.log("**", e),
          t.push(e),
          shelfdict[make_me_happy(e.bookId)] = e)
      }
      )),
      0 == t.length)
          return;
      _(_.sortBy(t, ["version"])).forEach((function(e) {
          $(".shelf_list").prepend($(`<a href="/web/reader/${make_me_happy(e.bookId)}" class="shelfBook webook_mp" data-id="${e.bookId}"><div class="wr_bookCover cover">${e.secret ? '<span class="wr_bookCover_privateTag"></span>' : ""}\x3c!----\x3e\x3c!----\x3e<img src="${e.cover.replace("http://", "https://")}" alt="书籍封面" class="wr_bookCover_img"><div class="wr_bookCover_border"></div><span class="wr_bookCover_decor wr_bookCover_gradientDecor wr_bookCover_borderDecor"></span></div><div class="title">${e.title}</div>\x3c!----\x3e</a>`))
      }
      )),
      $(".webook_mp").click((function(e) {
          e.preventDefault();
          let o = $(this).data("id");
          console.log("**webook_mp**", o),
          o && chrome.runtime.sendMessage({
              action: "fetch",
              data: {
                  url: `https://i.weread.qq.com/book/articles?bookId=${o}&count=10&offset=0`,
                  action: "shelf_mp_articles",
                  bookId: o
              }
          })
      }
      ))
  } else if ("shelf_mp_articles" === n) {
      let o = e.data;
      if (!o.reviews)
          return;
      let t = "";
      o.reviews.forEach((function(e) {
          if (e.review && e.review.mpInfo) {
              let o = e.review.mpInfo;
              t += `\n          <div style="padding: 8px 5px; display: flex; flex-direction: row; justify-content: space-between;"><div><a href="${o.doc_url}" target="_blank" style="font-weight: bold; font-size: 14px;">${o.title}</a><div style="font-size: 12px; font-weight: normal; color: #9e9e9e; margin-top: 5px;">${timeConverter(o.time)}</div></div><div><img src="${o.pic_url}" style="width: 50px; height: 50px; margin-left: 8px; border-radius: 3px;" /></div></div>\n        `
          }
      }
      )),
      $("#webook_mp_list").html(t),
      $("#webook_mp_load_more").data("bookid", e.bookId),
      $("#webook_mp_load_more").data("offset", 10),
      $("#webook_mp_box").css("display", "block")
  } else if ("shelf_mp_articles_more" === n) {
      let o = e.data;
      if (!o.reviews || 0 == o.reviews.length)
          return;
      let t = "";
      o.reviews.forEach((function(e) {
          if (e.review && e.review.mpInfo) {
              let o = e.review.mpInfo;
              t += `\n          <div style="padding: 8px 5px; display: flex; flex-direction: row; justify-content: space-between;"><div><a href="${o.doc_url}" target="_blank" style="font-weight: bold; font-size: 14px;">${o.title}</a><div style="font-size: 12px; font-weight: normal; color: #9e9e9e; margin-top: 5px;">${timeConverter(o.time)}</div></div><div><img src="${o.pic_url}" style="width: 50px; height: 50px; margin-left: 8px; border-radius: 3px;" /></div></div>\n        `
          }
      }
      )),
      $("#webook_mp_list").append(t),
      $("#webook_mp_load_more").data("bookid", e.bookId),
      $("#webook_mp_load_more").data("offset", Number.parseInt(e.offset) + 10)
  }
}
));
const version = chrome.runtime.getManifest().version
, zeroPad = (e,o)=>String(e).padStart(o, "0");
function getTimestamp() {
  return Math.floor(Date.now() / 1e3)
}
function timeConverter(e) {
  let o = new Date(1e3 * e)
    , t = o.getFullYear()
    , n = zeroPad(o.getMonth() + 1, 2)
    , i = zeroPad(o.getDate(), 2)
    , r = zeroPad(o.getHours(), 2)
    , a = zeroPad(o.getMinutes(), 2);
  return zeroPad(o.getSeconds(), 2),
  `${t}.${n}.${i} ${r}:${a}`
}
function getMondayTimestamp() {
  let e = Date.now()
    , o = new Date(e);
  return e / 1e3 - o.getSeconds() - 60 * o.getMinutes() - 3600 * o.getHours() - 24 * Number.parseInt("6012345"[o.getDay()]) * 3600
}
var MD5 = function(e) {
  return M(V(Y(X(e), 8 * e.length))).toLowerCase()
};
function M(e) {
  for (var o, t = "0123456789ABCDEF", n = "", i = 0; i < e.length; i++)
      o = e.charCodeAt(i),
      n += t.charAt(o >>> 4 & 15) + t.charAt(15 & o);
  return n
}
function X(e) {
  for (var o = Array(e.length >> 2), t = 0; t < o.length; t++)
      o[t] = 0;
  for (t = 0; t < 8 * e.length; t += 8)
      o[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
  return o
}
function V(e) {
  for (var o = "", t = 0; t < 32 * e.length; t += 8)
      o += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
  return o
}
function Y(e, o) {
  e[o >> 5] |= 128 << o % 32,
  e[14 + (o + 64 >>> 9 << 4)] = o;
  for (var t = 1732584193, n = -271733879, i = -1732584194, r = 271733878, a = 0; a < e.length; a += 16) {
      var s = t
        , c = n
        , l = i
        , d = r;
      n = md5_ii(n = md5_ii(n = md5_ii(n = md5_ii(n = md5_hh(n = md5_hh(n = md5_hh(n = md5_hh(n = md5_gg(n = md5_gg(n = md5_gg(n = md5_gg(n = md5_ff(n = md5_ff(n = md5_ff(n = md5_ff(n, i = md5_ff(i, r = md5_ff(r, t = md5_ff(t, n, i, r, e[a + 0], 7, -680876936), n, i, e[a + 1], 12, -389564586), t, n, e[a + 2], 17, 606105819), r, t, e[a + 3], 22, -1044525330), i = md5_ff(i, r = md5_ff(r, t = md5_ff(t, n, i, r, e[a + 4], 7, -176418897), n, i, e[a + 5], 12, 1200080426), t, n, e[a + 6], 17, -1473231341), r, t, e[a + 7], 22, -45705983), i = md5_ff(i, r = md5_ff(r, t = md5_ff(t, n, i, r, e[a + 8], 7, 1770035416), n, i, e[a + 9], 12, -1958414417), t, n, e[a + 10], 17, -42063), r, t, e[a + 11], 22, -1990404162), i = md5_ff(i, r = md5_ff(r, t = md5_ff(t, n, i, r, e[a + 12], 7, 1804603682), n, i, e[a + 13], 12, -40341101), t, n, e[a + 14], 17, -1502002290), r, t, e[a + 15], 22, 1236535329), i = md5_gg(i, r = md5_gg(r, t = md5_gg(t, n, i, r, e[a + 1], 5, -165796510), n, i, e[a + 6], 9, -1069501632), t, n, e[a + 11], 14, 643717713), r, t, e[a + 0], 20, -373897302), i = md5_gg(i, r = md5_gg(r, t = md5_gg(t, n, i, r, e[a + 5], 5, -701558691), n, i, e[a + 10], 9, 38016083), t, n, e[a + 15], 14, -660478335), r, t, e[a + 4], 20, -405537848), i = md5_gg(i, r = md5_gg(r, t = md5_gg(t, n, i, r, e[a + 9], 5, 568446438), n, i, e[a + 14], 9, -1019803690), t, n, e[a + 3], 14, -187363961), r, t, e[a + 8], 20, 1163531501), i = md5_gg(i, r = md5_gg(r, t = md5_gg(t, n, i, r, e[a + 13], 5, -1444681467), n, i, e[a + 2], 9, -51403784), t, n, e[a + 7], 14, 1735328473), r, t, e[a + 12], 20, -1926607734), i = md5_hh(i, r = md5_hh(r, t = md5_hh(t, n, i, r, e[a + 5], 4, -378558), n, i, e[a + 8], 11, -2022574463), t, n, e[a + 11], 16, 1839030562), r, t, e[a + 14], 23, -35309556), i = md5_hh(i, r = md5_hh(r, t = md5_hh(t, n, i, r, e[a + 1], 4, -1530992060), n, i, e[a + 4], 11, 1272893353), t, n, e[a + 7], 16, -155497632), r, t, e[a + 10], 23, -1094730640), i = md5_hh(i, r = md5_hh(r, t = md5_hh(t, n, i, r, e[a + 13], 4, 681279174), n, i, e[a + 0], 11, -358537222), t, n, e[a + 3], 16, -722521979), r, t, e[a + 6], 23, 76029189), i = md5_hh(i, r = md5_hh(r, t = md5_hh(t, n, i, r, e[a + 9], 4, -640364487), n, i, e[a + 12], 11, -421815835), t, n, e[a + 15], 16, 530742520), r, t, e[a + 2], 23, -995338651), i = md5_ii(i, r = md5_ii(r, t = md5_ii(t, n, i, r, e[a + 0], 6, -198630844), n, i, e[a + 7], 10, 1126891415), t, n, e[a + 14], 15, -1416354905), r, t, e[a + 5], 21, -57434055), i = md5_ii(i, r = md5_ii(r, t = md5_ii(t, n, i, r, e[a + 12], 6, 1700485571), n, i, e[a + 3], 10, -1894986606), t, n, e[a + 10], 15, -1051523), r, t, e[a + 1], 21, -2054922799), i = md5_ii(i, r = md5_ii(r, t = md5_ii(t, n, i, r, e[a + 8], 6, 1873313359), n, i, e[a + 15], 10, -30611744), t, n, e[a + 6], 15, -1560198380), r, t, e[a + 13], 21, 1309151649), i = md5_ii(i, r = md5_ii(r, t = md5_ii(t, n, i, r, e[a + 4], 6, -145523070), n, i, e[a + 11], 10, -1120210379), t, n, e[a + 2], 15, 718787259), r, t, e[a + 9], 21, -343485551),
      t = safe_add(t, s),
      n = safe_add(n, c),
      i = safe_add(i, l),
      r = safe_add(r, d)
  }
  return Array(t, n, i, r)
}
function md5_cmn(e, o, t, n, i, r) {
  return safe_add(bit_rol(safe_add(safe_add(o, e), safe_add(n, r)), i), t)
}
function md5_ff(e, o, t, n, i, r, a) {
  return md5_cmn(o & t | ~o & n, e, o, i, r, a)
}
function md5_gg(e, o, t, n, i, r, a) {
  return md5_cmn(o & n | t & ~n, e, o, i, r, a)
}
function md5_hh(e, o, t, n, i, r, a) {
  return md5_cmn(o ^ t ^ n, e, o, i, r, a)
}
function md5_ii(e, o, t, n, i, r, a) {
  return md5_cmn(t ^ (o | ~n), e, o, i, r, a)
}
function safe_add(e, o) {
  var t = (65535 & e) + (65535 & o);
  return (e >> 16) + (o >> 16) + (t >> 16) << 16 | 65535 & t
}
function bit_rol(e, o) {
  return e << o | e >>> 32 - o
}
function make_me_happy(e) {
  if ("number" == typeof e && (e = e.toString()),
  "string" != typeof e)
      return e;
  var o = MD5(e)
    , t = o.substr(0, 3)
    , n = function(e) {
      if (/^\d*$/.test(e)) {
          for (var o = e.length, t = [], n = 0; n < o; n += 9) {
              var i = e.slice(n, Math.min(n + 9, o));
              t.push(parseInt(i).toString(16))
          }
          return ["3", t]
      }
      for (var r = "", a = 0; a < e.length; a++)
          r += e.charCodeAt(a).toString(16);
      return ["4", [r]]
  }(e);
  t += n[0],
  t += 2 + o.substr(o.length - 2, 2);
  for (var i = n[1], r = 0; r < i.length; r++) {
      var a = i[r].length.toString(16);
      1 === a.length && (a = "0" + a),
      t += a,
      t += i[r],
      r < i.length - 1 && (t += "g")
  }
  return t.length < 20 && (t += o.substr(0, 20 - t.length)),
  t + MD5(t).substr(0, 3)
}
function setCookie(e, o, t) {
  var n = "";
  if (0 != t) {
      var i = new Date;
      i.setTime(i.getTime() + 24 * t * 60 * 60 * 1e3),
      n = "; expires=" + i.toUTCString()
  }
  document.cookie = e + "=" + (o || "") + n + "; path=.qnmlgb.tech"
}
function getExpireTime() {
  return ((new Date).getTime() + 94608e6) / 1e3
}
var shelfdict = {};
function shelfInsertCheckbox() {
  $(".shelfBook").each((function() {
      let e = $(this).attr("href");
      if (e.startsWith("/web/reader/")) {
          let o = e.replace("/web/reader/", "");
          shelfdict[o] && ($(this).append($(`\n        <div class="m_webook_shelf_checkbox" style="padding: 5px; display: flex; align-items: center; justify-content: center;">\n          <input type="checkbox" data-id="${shelfdict[o].bookId}" />\n        </div>\n        `)),
          $(this).attr("id", `bookid-${shelfdict[o].bookId}`))
      }
  }
  )),
  $('input[type="checkbox"]').click((function(e) {
      e.stopPropagation()
  }
  ))
}
function shelfRemoveCheckbox() {
  $(".m_webook_shelf_checkbox").remove()
}
function shelfRemoveBook(e) {
  let o = {
      url: "https://i.weread.qq.com/shelf/delete",
      method: "POST",
      payload: {
          bookIds: e,
          private: 1
      },
      action: "shelfRemoveBook"
  };
  chrome.runtime.sendMessage({
      action: "fetch",
      data: o
  })
}
function shelfMakeBookPrivate(e) {
  let o = {
      url: "https://i.weread.qq.com/book/secret",
      method: "POST",
      payload: {
          bookIds: e,
          private: 1
      },
      action: "shelfMakeBookPrivate"
  };
  chrome.runtime.sendMessage({
      action: "fetch",
      data: o
  })
}
function shelfMakeBookPublic(e) {
  let o = {
      url: "https://i.weread.qq.com/book/secret",
      method: "POST",
      payload: {
          bookIds: e,
          private: 0
      },
      action: "shelfMakeBookPublic"
  };
  chrome.runtime.sendMessage({
      action: "fetch",
      data: o
  })
}
function shelfSelectAll() {
  console.log("**shelfSelectAll**");
  let e = !1;
  $(".m_webook_shelf_checkbox > input").each((function() {
      $(this).is(":checked") || (e = !0)
  }
  )),
  e ? $(".m_webook_shelf_checkbox > input").prop("checked", !0) : $(".m_webook_shelf_checkbox > input").prop("checked", !1)
}
function gettext() {
  let e = [];
  $("span.wr_absolute").each((function() {
      let o = $(this);
      o.css("left") && o.css("top") && e.push({
          top: parseInt(o.css("top").replace("px", "")),
          left: parseInt(o.css("left").replace("px", "")),
          text: o.text()
      })
  }
  ));
  var o = "";
  return _(_.sortBy(e, ["top", "left"])).forEach((function(e) {
      o += e.text
  }
  )),
  o
}
function copy(e, o) {
  document.oncopy = function(t) {
      t.clipboardData.setData(o, e),
      t.preventDefault()
  }
  ,
  document.execCommand("copy", !1, null)
}
function getstate() {
  const e = document.createElement("script")
    , o = document.getElementsByTagName("script")[0];
  e.textContent = "\n  _obj = {};\n  if (window.__INITIAL_STATE__) {\n    _obj = window.__INITIAL_STATE__;\n  }\n  _val = JSON.stringify(_obj);\n  document.body.setAttribute('data-inject-state', _val);\n  ",
  o.parentNode.insertBefore(e, o),
  o.parentNode.removeChild(e)
}
function getbbq() {
  const e = document.createElement("script")
    , o = document.getElementsByTagName("script")[0];
  e.textContent = "\n  _bbqstr = '';\n  if (window.bbq) {\n    _bbqstr = window.bbq;\n  }\n  document.body.setAttribute('data-bbq', _bbqstr);\n  ",
  o.parentNode.insertBefore(e, o),
  o.parentNode.removeChild(e)
}
function getInitdata() {
  try {
      getstate();
      let e = document.body.getAttribute("data-inject-state");
      return JSON.parse(e)
  } catch {}
  return {}
}
function showToast(e) {
  let o = `<div id="webook_toast" style="position: fixed; background-color: #f78d8d; color: #fff; border-radius: 6px; padding: 2px 10px; display: block; text-align: center; margin: 0 auto;left:50%;transform: translateX(-50%);z-index:99999; margin-top: 10px;">${e}</div>`;
  $("body").prepend(o),
  setTimeout((function() {
      $("#webook_toast").remove()
  }
  ), 1500)
}
function sleep(e) {
  return new Promise((o=>setTimeout(o, e)))
}
async function fetchNotes(e) {
  let o = [];
  for (let t = 0; t < e.length; t++) {
      let n = await fetch(`https://weread.qq.com/web/book/bookmarklist?bookId=${e[t]}&type=1`)
        , i = await n.json();
      console.log("*note*", i),
      o.push(i),
      await sleep(500)
  }
  return o
}
function _zudui(e) {
  let o = null;
  fetch("https://weread.qq.com/wrpage/huodong/abtest/zudui").then((function(e) {
      return e.text()
  }
  )).then((function(t) {
      let n = $(t)
        , i = 0;
      if (n.find(".members_list > div.wr_avatar").each((function(e) {
          let t = $(this).data("vid");
          t && (i += 1),
          0 == e && t && (o = t)
      }
      )),
      e && 5 != i) {
          if (!o) {
              let e = t.match(/data \+= '&vid=' \+ encodeURIComponent\('(.*)'\)/);
              e ? o = e[1] : (e = t.match(/<script>config\.vid = \+'(.*)'<\/script>/),
              e && (o = e[1]))
          }
          return console.log("*zudui*", e, i, o),
          void (o ? $.ajax({
              method: "POST",
              url: "https://weread.qnmlgb.tech/submit?ref=chrome",
              data: JSON.stringify({
                  url: o.toString()
              }),
              contentType: "application/json"
          }).done((function(e) {
              console.log("**resp**", e),
              showToast("提交成功，耐心等待")
          }
          )) : showToast("💥 请登录"))
      }
      if (0 == i) {
          let e = t.match(/csrfToken:.*'(.*)'/);
          e && (console.log("csrfToken", e[1]),
          fetch("https://weread.qq.com/wrpage/infinite/lottery/create", {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: `csrfToken=${e[1]}`
          }).then((function(e) {
              return e.json()
          }
          )).then((function(e) {
              console.log("*data**", e),
              e && e.result && e.result.humanMessage && showToast("💥 需先在微信读书网站（weread.qq.com）上登录");
              let o = e;
              o && Number.isInteger(o.lackMembers) && (0 == o.lackMembers ? showToast("👏 已组完") : showToast(`🐼 还差 ${o.lackMembers} 个`))
          }
          )).catch((e=>{
              showToast("微信读书服务器故障")
          }
          )))
      } else
          showToast(5 == i ? "👏 已组完" : `🐼 还差 ${5 - i} 个`)
  }
  )).catch((function(e) {
      console.log(e),
      showToast("微信读书服务器故障")
  }
  ))
}
$(document).ready((function() {
  for (var e = 1; e < 99999; e++)
      window.clearInterval(e);
  console.log("**************\n*inject ui start*"),
  console.log("**current url**", window.location.toString()),
  $("body").prepend('<style>\n  @media (max-width: 1120px) {\n    .m_shelf_admin {\n      padding: 0 40px;\n    }\n  }\n\n  @media (max-width: 960px) {\n    .m_shelf_admin {\n      padding: 0 30px;\n    }\n  }\n\n  @media (max-width: 680px) {\n    .m_shelf_admin {\n      padding: 0 30px;\n    }\n  }\n\n  .m_shelf_admin > a:hover {\n    font-weight: bold;\n  }\n\n  .webook_box_btn:hover {\n    font-weight: bold;\n  }\n\n  .webook_round {\n    position: relative;\n  }\n\n  .webook_round label {\n    background-color: #fff;\n    border: 1px solid #ccc;\n    border-radius: 50%;\n    cursor: pointer;\n    height: 14px;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 14px;\n  }\n\n  .webook_round label:after {\n    border: 2px solid #fff;\n    border-top: none;\n    border-right: none;\n    content: "";\n    height: 6px;\n    left: 7px;\n    opacity: 0;\n    position: absolute;\n    top: 8px;\n    transform: rotate(-45deg);\n    width: 12px;\n  }\n\n  .webook_round input[type="checkbox"] {\n    visibility: hidden;\n  }\n\n  .webook_round input[type="checkbox"]:checked + label {\n    background-color: #66bb6a;\n    border-color: #66bb6a;\n  }\n\n  .webook_round input[type="checkbox"]:checked + label:after {\n    opacity: 1;\n  }\n\n  .css_ui_1 {\n    background-color: #e2e2e4;\n  }\n  </style>');
  const o = window.location.toString()
    , t = "/web/reader/"
    , n = window.location.pathname;
  $('<div style="display: flex; flex-direction: row; align-items: center;">\n    <div id="zuidui_click" style="cursor: pointer; color: #259; margin-left: 10px;">提交周六组队</div>\n    <div id="info_click" style="cursor: pointer; color: #259; margin-left: 10px;">组队信息查询</div>\n</div>'),
  $('\n    <div style="position: fixed; right: 5px; top: 5px; background-color: #e4e4e4; width: 24px; height: 24px; z-index: 99999; border-radius: 24px; display: flex; align-items: center; justify-content: center;">\n      <div style="width: 10px; height: 10px; border-radius: 10px; background-color: gray;"></div>\n    </div>\n    ');
  let i = $('<a href="javascript:" class="navBar_link webook_assist">组队助手</a>')
    , r = $('\n    <div id="webook_assist_box" class="wr_dialog" style="display: none;">\n      <div class="wr_dialog_mask"></div>\n      <div class="wr_dialog_container wr_dialog_bg">\n        <a href="javascript:" class="wr_dialog_closeButton webook_dialog_closeButton">close</a>\n        <div style="width: 200px;">\n          <div style="margin-top: 40px; margin-bottom: 40px; display: flex; padding: 5px; font-size: 14px; align-items: center; flex-direction: column;">\n\n            <div class="webook_box_btn" id="webook_assist_sat" style="width: 140px; background-color: #2196F3; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; border-radius: 4px;">\n              提交周六组队\n            </div>\n\n            <div class="webook_box_btn" id="webook_assist_sat_info" style="width: 140px; background-color: #009688; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; border-radius: 4px;">\n              查看组队信息\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  ');
  "https://weread.qq.com/" == o && (0 == $("button.navBar_link.navBar_link_Login").length && ($(".navBar_inner > .navBar_link_ink:first").replaceWith(i),
  $("body").append(r)),
  chrome.storage.local.get(["userInfo"], (function(e) {
      let o = e.userInfo && e.userInfo.vid || "";
      $.get({
          url: `https://webook.qnmlgb.tech/info?v=${version}`,
          headers: {
              vid: o
          }
      })
  }
  ))),
  o.startsWith("https://weread.qq.com/web/shelf") && 0 == $("button.navBar_link.navBar_link_Login").length && ($(".navBar_inner > .navBar_link_ink:first").replaceWith(i),
  $("body").append(r)),
  $("#zuidui_click").click((function() {
      _zudui()
  }
  )),
  $(".webook_assist").click((function() {
      $("#webook_assist_box").css("display", "block")
  }
  )),
  $("#webook_assist_sat").click((function() {
      _zudui("force")
  }
  )),
  $("#webook_assist_sat_info").click((function() {
      _zudui()
  }
  ));
  let a = "#595a5a";
  $(".readerControls_item.white").length > 0 && (a = "white");
  let s = $(`\n  <a id="webook_master" href="javascript:" title="助手" class="readerControls_item">\n    <span class="" style="font-weight: bold; color: ${a} ;">助手</span>\n  </a>\n  `);
  function c(e) {
      e > 0 && ($(".app_content").css("max-width", `${e}px`),
      $(".readerTopBar").css("max-width", `${e}px`),
      $(".readerControls").css("margin-left", e / 2 + 48 + "px"),
      setTimeout((function() {
          window.dispatchEvent(new Event("resize"))
      }
      ), 500))
  }
  $('\n    <div id="webook_box" style="color: gray; display: show;">\n      <div class="wr_mask wr_mask_Show"></div>\n      <div class="" style="width: 560px; position: fixed;background-color: white; width: 520px;left: 50%;height: 300px;bottom: 0;z-index: 90;box-shadow: -20px 0 20px 0 rgba(0,0,0,.1);display: -webkit-box;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;flex-direction: column; margin-left: -280px; padding: 10px;">\n\n        <div style="padding: 5px; border-radius: 20px; background-color: #2196f3; width: 50px; display: flex; align-items: center; justify-content: center; ">\n          <a id="webook_box_close" style="color: #fff; font-size: 13px; cursor: pointer;">关闭</a>\n        </div>\n\n        <div style="margin-top: 20px; font-size: 14px; color: #000;">\n          <div style="display: flex; flex-direction: row;">\n            <a href="" target="_blank">围城</a> <div style="margin: 0 5px;">豆瓣评分</div> <div style="margin: 0 5px; border-radius: 2px; background-color: gray; padding: 0 6px; font-size: 10px; color: white; text-align: center;">7.2</div>\n          </div>\n        <div>\n\n        <div>\n          <div class="webook_audio_player" style="cursor: pointer;">播放</div>\n          <div class="webook_audio_pause" style="cursor: pointer;">暂停</div>\n        </div>\n\n      </div>\n    </div>\n  '),
  console.log("max-width", $(".app_content").css("max-width"));
  let l = 0
    , d = $(".app_content");
  if (d) {
      let e = d.css("max-width");
      if (e) {
          let o = Number.parseInt(e.replace("px", ""));
          o && (l = o)
      }
  }
  let p = $('\n    <div id="webook_box" class="wr_dialog" style="display: none;">\n      <div class="wr_dialog_mask"></div>\n      <div class="wr_dialog_container wr_dialog_bg">\n        <a href="javascript:" class="wr_dialog_closeButton webook_dialog_closeButton">close</a>\n        <div style="width: 200px;">\n          <div style="margin-top: 40px; margin-bottom: 40px; display: flex; padding: 5px; font-size: 14px; align-items: center; flex-direction: column;">\n\n            <div class="webook_box_btn" id="webook_export_note" style="width: 140px; background-color: #2196F3; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; border-radius: 4px;">\n              导出笔记到剪贴板\n            </div>\n\n            <div class="webook_box_btn" id="webook_player" style="width: 140px; background-color: #009688; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; border-radius: 4px;">\n              播放本章节\n            </div>\n\n            <a class="webook_box_btn" id="webook_douban" href="https://book.douban.com/" target="_blank" style="width: 140px; background-color: #673ab7; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; display: none; border-radius: 4px;">\n            豆瓣评分 8.5\n            </a>\n\n            <a class="webook_box_btn" id="webook_jd" href="https://www.jd.com/" target="_blank" style="width: 140px; background-color: #ff5722; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; display: none; border-radius: 4px;">\n            京东购买本书\n            </a>\n\n            <div style="margin-top: 10px; color: #c7c6c6; font-size: 13px;">设置背景</div>\n            <div style="display: flex; flex-direction: row; margin-top: 5px;">\n              <div id="webook_ui_1" style="background-color: #e2e2e4; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#e2e2e4"></div>\n              <div id="webook_ui_2" style="background-color: #e1dac7; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#e1dac7"></div>\n              <div id="webook_ui_3" style="background-color: #b3d6b4; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#b3d6b4"></div>\n              <div id="webook_ui_4" style="background-color: #ffc107; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#ffc107"></div>\n            </div>\n\n            <div style="margin-top: 10px; color: #c7c6c6; font-size: 13px;">播放器</div>\n            <div style="display: flex; flex-direction: row; margin-top: 5px;">\n              <div id="webook_player_pause" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">暂停</div>\n              <div id="webook_player_continue" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">继续</div>\n              <div id="webook_player_stop" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">停止</div>\n            </div>\n\n            <div style="margin-top: 10px; color: #c7c6c6; font-size: 13px;">屏幕</div>\n            <div style="display: flex; flex-direction: row; margin-top: 5px;">\n              <div id="webook_screen_1_0" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">默认</div>\n              <div id="webook_screen_1_2" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.2</div>\n              <div id="webook_screen_1_4" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.4</div>\n              <div id="webook_screen_1_6" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.6</div>\n              <div id="webook_screen_2_0" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">2.0</div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  ');
  n.startsWith(t) && (setTimeout((function() {
      $(".readerControls").prepend(s),
      $("body").append(p),
      $("#webook_master").click((function() {
          $("#webook_box").css("display", "block")
      }
      ));
      let e = n.replace(t, "");
      function o(e) {
          $(".readerControls_item.white").length > 0 && $(".readerControls_item.white")[0].click(),
          $(".readerChapterContent").css("background-color", e),
          $(".app_content").css("background-color", e),
          $(".readerTopBar").css("background-color", e),
          $(".wr_canvasContainer canvas").css("background-color", e),
          $("#webook_master span").css("color", "#595a5a")
      }
      e.length > 0 && chrome.runtime.sendMessage({
          action: "getBook",
          code: e
      }, (function(e) {
          e && e.action
      }
      )),
      $(".webook_dialog_closeButton").click((function() {
          $("#webook_box").css("display", "none"),
          $("#webook_assist_box").css("display", "none")
      }
      )),
      $("#webook_export_note").click((function(e, o) {
          let t = $("title").text().split("-").slice(0, 2).join("\n") + "\n\n"
            , n = "";
          $(".readerNoteList > .sectionListItem").each((function() {
              let e = $(this).find(".sectionListItem_title");
              e.length > 0 && (n += `\n◆ ${e[0].innerText}\n`);
              let o = $(this).find(".sectionListItem_content");
              if (o.length > 0)
                  for (let e = 0; e < o.length; e++)
                      n += `\n>> ${o[e].innerText}\n`
          }
          )),
          console.log(t + n + "<br />"),
          0 != n.length ? (copy(t + n, "text/plain;charset=UTF-8"),
          showToast("👏 已成功导出笔记到剪贴板")) : showToast("没发现此书的笔记")
      }
      )),
      $("#webook_player").click((function() {
          getbbq();
          let e = document.body.getAttribute("data-bbq") + gettext();
          e.length > 0 ? chrome.runtime.sendMessage({
              text: e,
              action: "speakText"
          }, (function(e) {
              showToast("👏 开始播放"),
              console.log("**sendMessage resp**", e)
          }
          )) : showToast("没找到本章的内容")
      }
      )),
      $("#webook_player_pause").click((function() {
          chrome.runtime.sendMessage({
              text: "",
              action: "pauseText"
          }, (function(e) {}
          ))
      }
      )),
      $("#webook_player_continue").click((function() {
          chrome.runtime.sendMessage({
              text: "",
              action: "continueText"
          }, (function(e) {}
          ))
      }
      )),
      $("#webook_player_stop").click((function() {
          chrome.runtime.sendMessage({
              text: "",
              action: "stopText"
          }, (function(e) {}
          ))
      }
      )),
      chrome.storage.local.get(["webook_ui"], (function(e) {
          let o = e.webook_ui;
          if (o) {
              let e = $(`#${o}`);
              e.length > 0 && e[0].click()
          }
      }
      )),
      $("#webook_screen_1_0").click((function() {
          $(".app_content").css("max-width", ""),
          $(".readerTopBar").css("max-width", ""),
          $(".readerControls").css("margin-left", ""),
          setTimeout((function() {
              window.dispatchEvent(new Event("resize"))
          }
          ), 500),
          chrome.storage.local.remove("webook_screen")
      }
      )),
      $("#webook_screen_1_2").click((function() {
          c(1.2 * l),
          chrome.storage.local.set({
              webook_screen: "1.2"
          })
      }
      )),
      $("#webook_screen_1_4").click((function() {
          c(1.4 * l),
          chrome.storage.local.set({
              webook_screen: "1.4"
          })
      }
      )),
      $("#webook_screen_1_6").click((function() {
          c(1.6 * l),
          chrome.storage.local.set({
              webook_screen: "1.6"
          })
      }
      )),
      $("#webook_screen_2_0").click((function() {
          c(2 * l),
          chrome.storage.local.set({
              webook_screen: "2.0"
          })
      }
      )),
      $("#webook_ui_1").click((function(e) {
          console.log("webook_ui_1");
          let t = $(this).data("color");
          chrome.storage.local.set({
              webook_ui: "webook_ui_1"
          }),
          o(t)
      }
      )),
      $("#webook_ui_2").click((function(e) {
          console.log("webook_ui_2");
          let t = $(this).data("color");
          chrome.storage.local.set({
              webook_ui: "webook_ui_2"
          }),
          o(t)
      }
      )),
      $("#webook_ui_3").click((function(e) {
          console.log("webook_ui_3");
          let t = $(this).data("color");
          chrome.storage.local.set({
              webook_ui: "webook_ui_3"
          }),
          o(t)
      }
      )),
      $("#webook_ui_4").click((function(e) {
          console.log("webook_ui_4");
          let t = $(this).data("color");
          chrome.storage.local.set({
              webook_ui: "webook_ui_4"
          }),
          o(t)
      }
      )),
      $(".readerControls_item.dark").click((function(e) {
          console.log("click dark"),
          $(".readerChapterContent").css("background-color", ""),
          $(".app_content").css("background-color", ""),
          $(".readerTopBar").css("background-color", ""),
          $(".wr_canvasContainer canvas").css("background-color", ""),
          chrome.storage.local.set({
              webook_ui: null
          });
          let o = "#595a5a";
          $(".readerControls_item.white").length > 0 && (o = "white"),
          $("#webook_master span").css("color", o)
      }
      )),
      $(".readerControls_item.white").click((function(e) {
          console.log("click dark"),
          $(".readerChapterContent").css("background-color", ""),
          $(".app_content").css("background-color", ""),
          $(".readerTopBar").css("background-color", ""),
          $(".wr_canvasContainer canvas").css("background-color", ""),
          chrome.storage.local.set({
              webook_ui: null
          });
          let o = "#595a5a";
          $(".readerControls_item.white").length > 0 && (o = "white"),
          $("#webook_master span").css("color", o)
      }
      ))
  }
  ), 1e3),
  chrome.storage.local.get("webook_screen", (function(e) {
      console.log("webook_screen", e);
      let o = e.webook_screen;
      o && Number.parseFloat(o) && c(l * Number.parseFloat(o))
  }
  ))),
  "https://weread.qq.com/" != o && "https://weread.qq.com/web/shelf" != o || setTimeout((function() {
      chrome.storage.local.get(["viduri", "last_user_info"], (function(e) {
          let o = e.viduri;
          console.log("viduri", o);
          let t = e.last_user_info;
          o && (t && t + 60 > getTimestamp() || fetch(o).then((function(e) {
              return e.json()
          }
          )).then((function(e) {
              e.vid = e.userVid,
              chrome.storage.local.set({
                  userInfo: e,
                  last_user_info: getTimestamp()
              }, (function() {
                  console.log("**userInfo**", e)
              }
              ))
          }
          )))
      }
      ))
  }
  ), 1e3),
  "https://weread.qq.com/" != o && "https://weread.qq.com/web/shelf" != o || setTimeout((function() {
      chrome.storage.local.get(["userInfo"], (function(e) {
          let o = e.userInfo;
          o && o.vid && chrome.runtime.sendMessage({
              action: "fetch",
              data: {
                  url: `https://i.weread.qq.com/readdetail?baseTimestamp=${getMondayTimestamp()}&count=1&type=0`,
                  action: "readdetail"
              }
          })
      }
      ))
  }
  ), 2e3),
  "https://weread.qq.com/" != o && "https://weread.qq.com/web/shelf" != o || (setTimeout((function() {}
  ), 1e3),
  setTimeout((function() {
      chrome.storage.local.get(["last_card_summary"], (function(e) {
          let o = e.last_card_summary;
          console.log("*last_card_summary*", o),
          o && o + 60 > getTimestamp() || fetch("https://weread.qq.com/web/pay/memberCardSummary?pf=ios").then((function(e) {
              return e.json()
          }
          )).then((function(e) {
              chrome.storage.local.set({
                  userCardSummary: e,
                  last_card_summary: getTimestamp()
              })
          }
          ))
      }
      ))
  }
  ), 1e3)),
  $(".webook_audio_pause").click((function() {
      chrome.runtime.sendMessage({
          action: "pauseText"
      }, (function(e) {
          console.log("**sendMessage resp**", e)
      }
      ))
  }
  )),
  $(".webook_audio_resume").click((function() {
      chrome.runtime.sendMessage({
          action: "resumeText"
      }, (function(e) {
          console.log("**sendMessage resp**", e)
      }
      ))
  }
  )),
  $(".webook_dialog_closeButton").click((function() {
      $("#webook_box").css("display", "none"),
      $("#webook_assist_box").css("display", "none")
  }
  )),
  console.log("*inject ui end*\n**************"),
  ("https://weread.qq.com/" == o || o.startsWith("https://weread.qq.com/web/shelf")) && fetch("https://weread.qq.com/web/shelf").then((function(e) {
      return e.text()
  }
  )).then((function(e) {
      let o = JSON.parse(e.match(/window\.__INITIAL_STATE__\=({.*?});/)[1]);
      if (o.shelf.books) {
          let e = o.shelf.books;
          for (let o = 0; o < e.length; o++)
              shelfdict[make_me_happy(e[o].bookId)] = e[o]
      }
      o.shelf && chrome.storage.local.set({
          userShelf: o.shelf
      }, (function() {}
      ))
  }
  ));
  let _ = $('\n    <div style="display: flex; flex-direction: row; font-size: 14px; color: gray; margin-top: 10px;" class="m_shelf_admin">\n      <a class="m_webook_shelf_mp" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e;" data-status="close">查看公众号</a>\n      <a class="m_webook_shelf_note" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e;" data-status="close">我的笔记</a>\n      <a class="m_webook_shelf_admin" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e;" data-status="close">整理书架</a>\n      <a class="op m_webook_shelf_remove_book" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">移出</a>\n      <a class="op m_webook_shelf_make_book_private" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">私密阅读</a>\n      <a class="op m_webook_shelf_make_book_public" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">公开阅读</a>\n      <a class="op m_webook_shelf_export_note" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">导出笔记</a>\n      <a class="op m_webook_shelf_select_all" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">全选</a>\n    </div>\n  ')
    , h = $(".shelf_download_app");
  h && h.remove(),
  $(".shelf_header").after(_);
  let f = $('\n    <div id="webook_mp_box" class="wr_dialog" style="display: none;">\n      <div class="wr_dialog_mask"></div>\n      <div class="wr_dialog_container wr_dialog_bg">\n        <a href="#" class="wr_dialog_closeButton mp_dialog_closeButton">close</a>\n        <div id="webook_mp_scroll" style="width: 400px; height: 600px; overflow-y: scroll;">\n          <div style="margin-top: 40px; margin-bottom: 40px; padding: 5px; font-size: 14px; display: flex; flex-direction: column;">\n              <div id="webook_mp_list" style="display: flex; flex-direction: column; text-align: left; padding: 0 10px;">\n              </div>\n              <div id="webook_mp_load_more" style="cursor: pointer; background-color: #eceaea; border-radius: 3px; font-weight: bold; padding: 8px; margin: 0 20px; color: white;">加载更多</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ');
  o.startsWith("https://weread.qq.com/web/shelf") && ($("body").append(f),
  $(".mp_dialog_closeButton").click((function() {
      $("#webook_box").css("display", "none"),
      $("#webook_assist_box").css("display", "none"),
      document.getElementById("webook_mp_scroll").scroll(0, 0),
      document.getElementById("webook_mp_box").style.display = "none"
  }
  ))),
  $(".m_webook_shelf_note").click((function() {
      chrome.storage.local.get(["notes"], (function(e) {
          e.notes ? chrome.runtime.sendMessage({
              action: "exportNotes"
          }) : showToast("需先在整理书架那选择几本书导出笔记")
      }
      ))
  }
  )),
  $(".m_webook_shelf_mp").click((function() {
      if ("open" == $(this).data("status"))
          return $(this).text("查看公众号"),
          $(this).data("status", "close"),
          void $("a.webook_mp").remove();
      $(this).text("收起公众号"),
      $(this).data("status", "open"),
      chrome.runtime.sendMessage({
          action: "fetch",
          data: {
              url: "https://i.weread.qq.com/shelf/sync?synckey=0",
              action: "shelf_mp"
          }
      })
  }
  )),
  $("#webook_mp_load_more").click((function() {
      let e = $(this).data("bookid")
        , o = $(this).data("offset");
      e && o && chrome.runtime.sendMessage({
          action: "fetch",
          data: {
              url: `https://i.weread.qq.com/book/articles?bookId=${e}&count=10&offset=${o}`,
              action: "shelf_mp_articles_more",
              bookId: e,
              offset: o
          }
      })
  }
  )),
  $(".m_webook_shelf_admin").click((function() {
      "close" == $(this).data("status") ? (shelfInsertCheckbox(),
      $(".m_shelf_admin > a.op").css("display", "block"),
      $(this).data("status", "open")) : (shelfRemoveCheckbox(),
      $(".m_shelf_admin > a.op").css("display", "none"),
      $(this).data("status", "close"))
  }
  )),
  $(".m_webook_shelf_make_book_private").click((function() {
      let e = [];
      $(".m_webook_shelf_checkbox > input").each((function() {
          $(this).is(":checked") && e.push($(this).data("id").toString())
      }
      )),
      e.length > 0 && shelfMakeBookPrivate(e)
  }
  )),
  $(".m_webook_shelf_make_book_public").click((function() {
      let e = [];
      $(".m_webook_shelf_checkbox > input").each((function() {
          $(this).is(":checked") && e.push($(this).data("id").toString())
      }
      )),
      e.length > 0 && shelfMakeBookPublic(e)
  }
  )),
  $(".m_webook_shelf_remove_book").click((function() {
      let e = [];
      $(".m_webook_shelf_checkbox > input").each((function() {
          $(this).is(":checked") && e.push($(this).data("id").toString())
      }
      )),
      e.length > 0 && shelfRemoveBook(e)
  }
  )),
  $(".m_webook_shelf_export_note").click((function() {
      let e = [];
      $(".m_webook_shelf_checkbox > input").each((function() {
          $(this).is(":checked") && e.push($(this).data("id").toString())
      }
      )),
      e.length > 0 && (showToast(`正在导出，大约需要 ${1.5 * e.length} 秒`),
      fetchNotes(e).then((function(e) {
          console.log("***happy***", e.length),
          showToast("👏 导出成功"),
          $(".m_webook_shelf_checkbox > input").prop("checked", !1),
          setTimeout((function() {
              chrome.storage.local.set({
                  notes: e
              }, (function() {
                  chrome.runtime.sendMessage({
                      action: "exportNotes",
                      data: e
                  })
              }
              ))
          }
          ), 1e3)
      }
      )))
  }
  )),
  $(".m_webook_shelf_select_all").click((function() {
      shelfSelectAll()
  }
  ))
}
));
