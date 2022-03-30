const version = chrome.runtime.getManifest().version;
function setCookie(e, t, n) {
    var o = "";
    if (0 != n) {
        var r = new Date;
        r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3),
        o = "; expires=" + r.toUTCString()
    }
    document.cookie = e + "=" + (t || "") + o + "; path=.qnmlgb.tech"
}
function getExpireTime() {
    return ((new Date).getTime() + 94608e6) / 1e3
}
function getReadTimeStr(e) {
    if (0 === e)
        return " 未阅读";
    let t = "";
    if (e && Number.isInteger(e)) {
        if (Number.parseInt(e) < 60)
            return " 1 分钟";
        let n = Number.parseInt(e / 3600)
          , o = Number.parseInt((e - 3600 * n) / 60);
        n > 0 && (t += ` ${n} 小时 `),
        o > 0 && (t += ` ${o} 分钟`)
    }
    return t.length > 0 ? t : " 未阅读"
}
function sendMsg(e, t) {
    chrome.tabs.sendMessage(t.id, e, (function(e) {
        console.log(e)
    }
    ))
}
function callbackMsg(e) {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, (function(t) {
        chrome.tabs.sendMessage(t[0].id, e, (function(e) {
            console.log(e)
        }
        ))
    }
    ))
}
function showToast(e) {
    $("#webook_toast").text(e),
    $("#webook_toast").css("display", "block"),
    setTimeout((function() {
        $("#webook_toast").css("display", "none")
    }
    ), 2e3)
}
function _zudui() {
    fetch("https://weread.qq.com/wrpage/huodong/abtest/zudui").then((function(e) {
        return e.text()
    }
    )).then((function(e) {
        $(e).find(".members_list > div.wr_avatar").length;
        {
            let t = e.match(/csrfToken:.*'(.*)'/);
            t && ((new FormData).append("csrfToken", t[1]),
            console.log("csrfToken", t[1]),
            fetch("https://weread.qq.com/wrpage/infinite/lottery/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `csrfToken=${t[1]}`
            }).then((function(e) {
                return e.json()
            }
            )).then((function(e) {
                e && e.result && e.result.humanMessage && showToast("💥 需先在微信读书网站（weread.qq.com）上登录");
                let t = e.data;
                t && Number.isInteger(t.lackMembers) && (0 == t.lackMembers ? showToast("👏 已组完") : showToast(`🐼 还差 ${t.lackMembers} 个`))
            }
            )).catch((e=>{
                showToast("微信读书服务器故障")
            }
            )))
        }
    }
    )).catch((function(e) {
        showToast("微信读书服务器故障")
    }
    ))
}
chrome.storage.local.get(["userInfo", "userShelf", "userCardSummary", "totalReadTime"], (function(e) {
    let t = e.userInfo
      , n = e.userShelf
      , o = e.userCardSummary
      , r = e.totalReadTime
      , i = 0;
    n && n.books && (i = n.books.length);
    let a = 0;
    if (o && o.expiredTime && (a = Math.max(0, parseInt((o.expiredTime - Date.parse(new Date) / 1e3) / 86400))),
    console.log("**popup**", e, a),
    t && t.vid) {
        console.log("**storage**", t);
        let e = $(`\n    <a style="display: flex; flex-direction: row; justify-content: left; align-items: center;" href="https://weread.qq.com/" target="_blank">\n      ${t.avatar && t.avatar.length > 0 ? `<img src="${t.avatar}" style="width: 20px; height: 20px; border-radius: 20px;" />` : '<div style="width: 20px; height: 20px; background-color: #e4e4e4; border-radius: 20px;"></div>'}\n      <span style="margin-left: 5px; text-decoration: none; cursor: pointer; color: #259;">${t.name}</span>\n    </a><div style="margin-top: 5px; color: #5d646e;">vid: ${t.vid}</div>\n    ${a >= 0 ? `<div style="margin-top: 5px; color: #5d646e;">无限卡剩余: <span style="font-weight: bold;">${a}</span> 天</div>` : ""}\n    <div style="margin-top: 5px; color: #5d646e;">本周阅读时长: ${getReadTimeStr(r)}</div>\n    <div style="margin-top: 5px; color: #5d646e;">书架: <a href="shelf.html" style="margin: 0 3px;">${i}</a>本</div>\n    `);
        $("#webook_user_info").prepend(e),
        t.vid && chrome.cookies.set({
            url: "https://qnmlgb.tech",
            domain: ".qnmlgb.tech",
            name: "vid",
            value: t.vid.toString(),
            expirationDate: getExpireTime()
        })
    } else {
        let e = $('\n    <div style="display: flex; flex-direction: row; justify-content: left; align-items: center;">\n      <a href="https://weread.qq.com/" target="_blank" style="text-decoration: none; cursor: pointer; color: #259;">⚡️ 前往登录微信读书</a>\n    </div>\n    ');
        $("#webook_user_info").prepend(e)
    }
}
)),
$((function() {
    $("#version").text(version),
    $("#clearme").click((function() {
        chrome.storage.local.clear(),
        window.location.href = "/src/popup/popup.html"
    }
    )),
    $("#sta_btn").click((function() {
        fetch("https://weread.qq.com/wrpage/infinite/lottery/create", {
            method: "POST"
        }).then((function(e) {
            return e.text()
        }
        )).then((function(e) {
            console.log(e)
        }
        )),
        chrome.storage.local.get(["userInfo", "userShelf"], (function(e) {
            let t = e.userInfo;
            t && t.vid ? $.ajax({
                method: "POST",
                url: "https://weread.qnmlgb.tech/submit?ref=chrome",
                data: JSON.stringify({
                    url: t.vid.toString()
                }),
                contentType: "application/json"
            }).done((function(e) {
                console.log("**resp**", e),
                showToast("提交成功，耐心等待")
            }
            )) : showToast("💥 需先在微信读书网站（weread.qq.com）上登录")
        }
        ))
    }
    )),
    $("#check_zudui_btn").click((function() {
        _zudui()
    }
    )),
    fetch("https://webook.qnmlgb.tech/announcement").then((function(e) {
        return e.json()
    }
    )).then((function(e) {
        e && e.content && e.content.length > 0 && $("#announcement").html(e.content)
    }
    ))
}
));
