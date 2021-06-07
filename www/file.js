!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.axios = t() : e.axios = t() }(this, function () { return function (e) { function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { exports: {}, id: r, loaded: !1 }; return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports } var n = {}; return t.m = e, t.c = n, t.p = "", t(0) }([function (e, t, n) { e.exports = n(1) }, function (e, t, n) { "use strict"; function r(e) { var t = new i(e), n = s(i.prototype.request, t); return o.extend(n, i.prototype, t), o.extend(n, t), n } var o = n(2), s = n(3), i = n(4), a = n(22), u = n(10), c = r(u); c.Axios = i, c.create = function (e) { return r(a(c.defaults, e)) }, c.Cancel = n(23), c.CancelToken = n(24), c.isCancel = n(9), c.all = function (e) { return Promise.all(e) }, c.spread = n(25), c.isAxiosError = n(26), e.exports = c, e.exports.default = c }, function (e, t, n) { "use strict"; function r(e) { return "[object Array]" === R.call(e) } function o(e) { return "undefined" == typeof e } function s(e) { return null !== e && !o(e) && null !== e.constructor && !o(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e) } function i(e) { return "[object ArrayBuffer]" === R.call(e) } function a(e) { return "undefined" != typeof FormData && e instanceof FormData } function u(e) { var t; return t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer } function c(e) { return "string" == typeof e } function f(e) { return "number" == typeof e } function p(e) { return null !== e && "object" == typeof e } function d(e) { if ("[object Object]" !== R.call(e)) return !1; var t = Object.getPrototypeOf(e); return null === t || t === Object.prototype } function l(e) { return "[object Date]" === R.call(e) } function h(e) { return "[object File]" === R.call(e) } function m(e) { return "[object Blob]" === R.call(e) } function y(e) { return "[object Function]" === R.call(e) } function g(e) { return p(e) && y(e.pipe) } function v(e) { return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams } function x(e) { return e.replace(/^\s*/, "").replace(/\s*$/, "") } function w() { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document) } function b(e, t) { if (null !== e && "undefined" != typeof e) if ("object" != typeof e && (e = [e]), r(e)) for (var n = 0, o = e.length; n < o; n++)t.call(null, e[n], n, e); else for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e) } function E() { function e(e, n) { d(t[n]) && d(e) ? t[n] = E(t[n], e) : d(e) ? t[n] = E({}, e) : r(e) ? t[n] = e.slice() : t[n] = e } for (var t = {}, n = 0, o = arguments.length; n < o; n++)b(arguments[n], e); return t } function j(e, t, n) { return b(t, function (t, r) { n && "function" == typeof t ? e[r] = S(t, n) : e[r] = t }), e } function C(e) { return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e } var S = n(3), R = Object.prototype.toString; e.exports = { isArray: r, isArrayBuffer: i, isBuffer: s, isFormData: a, isArrayBufferView: u, isString: c, isNumber: f, isObject: p, isPlainObject: d, isUndefined: o, isDate: l, isFile: h, isBlob: m, isFunction: y, isStream: g, isURLSearchParams: v, isStandardBrowserEnv: w, forEach: b, merge: E, extend: j, trim: x, stripBOM: C } }, function (e, t) { "use strict"; e.exports = function (e, t) { return function () { for (var n = new Array(arguments.length), r = 0; r < n.length; r++)n[r] = arguments[r]; return e.apply(t, n) } } }, function (e, t, n) { "use strict"; function r(e) { this.defaults = e, this.interceptors = { request: new i, response: new i } } var o = n(2), s = n(5), i = n(6), a = n(7), u = n(22); r.prototype.request = function (e) { "string" == typeof e ? (e = arguments[1] || {}, e.url = arguments[0]) : e = e || {}, e = u(this.defaults, e), e.method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get"; var t = [a, void 0], n = Promise.resolve(e); for (this.interceptors.request.forEach(function (e) { t.unshift(e.fulfilled, e.rejected) }), this.interceptors.response.forEach(function (e) { t.push(e.fulfilled, e.rejected) }); t.length;)n = n.then(t.shift(), t.shift()); return n }, r.prototype.getUri = function (e) { return e = u(this.defaults, e), s(e.url, e.params, e.paramsSerializer).replace(/^\?/, "") }, o.forEach(["delete", "get", "head", "options"], function (e) { r.prototype[e] = function (t, n) { return this.request(u(n || {}, { method: e, url: t, data: (n || {}).data })) } }), o.forEach(["post", "put", "patch"], function (e) { r.prototype[e] = function (t, n, r) { return this.request(u(r || {}, { method: e, url: t, data: n })) } }), e.exports = r }, function (e, t, n) { "use strict"; function r(e) { return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") } var o = n(2); e.exports = function (e, t, n) { if (!t) return e; var s; if (n) s = n(t); else if (o.isURLSearchParams(t)) s = t.toString(); else { var i = []; o.forEach(t, function (e, t) { null !== e && "undefined" != typeof e && (o.isArray(e) ? t += "[]" : e = [e], o.forEach(e, function (e) { o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), i.push(r(t) + "=" + r(e)) })) }), s = i.join("&") } if (s) { var a = e.indexOf("#"); a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + s } return e } }, function (e, t, n) { "use strict"; function r() { this.handlers = [] } var o = n(2); r.prototype.use = function (e, t) { return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1 }, r.prototype.eject = function (e) { this.handlers[e] && (this.handlers[e] = null) }, r.prototype.forEach = function (e) { o.forEach(this.handlers, function (t) { null !== t && e(t) }) }, e.exports = r }, function (e, t, n) { "use strict"; function r(e) { e.cancelToken && e.cancelToken.throwIfRequested() } var o = n(2), s = n(8), i = n(9), a = n(10); e.exports = function (e) { r(e), e.headers = e.headers || {}, e.data = s(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) { delete e.headers[t] }); var t = e.adapter || a.adapter; return t(e).then(function (t) { return r(e), t.data = s(t.data, t.headers, e.transformResponse), t }, function (t) { return i(t) || (r(e), t && t.response && (t.response.data = s(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t) }) } }, function (e, t, n) { "use strict"; var r = n(2); e.exports = function (e, t, n) { return r.forEach(n, function (n) { e = n(e, t) }), e } }, function (e, t) { "use strict"; e.exports = function (e) { return !(!e || !e.__CANCEL__) } }, function (e, t, n) { "use strict"; function r(e, t) { !s.isUndefined(e) && s.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t) } function o() { var e; return "undefined" != typeof XMLHttpRequest ? e = n(12) : "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process) && (e = n(12)), e } var s = n(2), i = n(11), a = { "Content-Type": "application/x-www-form-urlencoded" }, u = { adapter: o(), transformRequest: [function (e, t) { return i(t, "Accept"), i(t, "Content-Type"), s.isFormData(e) || s.isArrayBuffer(e) || s.isBuffer(e) || s.isStream(e) || s.isFile(e) || s.isBlob(e) ? e : s.isArrayBufferView(e) ? e.buffer : s.isURLSearchParams(e) ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : s.isObject(e) ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e }], transformResponse: [function (e) { if ("string" == typeof e) try { e = JSON.parse(e) } catch (e) { } return e }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, validateStatus: function (e) { return e >= 200 && e < 300 } }; u.headers = { common: { Accept: "application/json, text/plain, */*" } }, s.forEach(["delete", "get", "head"], function (e) { u.headers[e] = {} }), s.forEach(["post", "put", "patch"], function (e) { u.headers[e] = s.merge(a) }), e.exports = u }, function (e, t, n) { "use strict"; var r = n(2); e.exports = function (e, t) { r.forEach(e, function (n, r) { r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]) }) } }, function (e, t, n) { "use strict"; var r = n(2), o = n(13), s = n(16), i = n(5), a = n(17), u = n(20), c = n(21), f = n(14); e.exports = function (e) { return new Promise(function (t, n) { var p = e.data, d = e.headers; r.isFormData(p) && delete d["Content-Type"]; var l = new XMLHttpRequest; if (e.auth) { var h = e.auth.username || "", m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ""; d.Authorization = "Basic " + btoa(h + ":" + m) } var y = a(e.baseURL, e.url); if (l.open(e.method.toUpperCase(), i(y, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l.onreadystatechange = function () { if (l && 4 === l.readyState && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:"))) { var r = "getAllResponseHeaders" in l ? u(l.getAllResponseHeaders()) : null, s = e.responseType && "text" !== e.responseType ? l.response : l.responseText, i = { data: s, status: l.status, statusText: l.statusText, headers: r, config: e, request: l }; o(t, n, i), l = null } }, l.onabort = function () { l && (n(f("Request aborted", e, "ECONNABORTED", l)), l = null) }, l.onerror = function () { n(f("Network Error", e, null, l)), l = null }, l.ontimeout = function () { var t = "timeout of " + e.timeout + "ms exceeded"; e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(f(t, e, "ECONNABORTED", l)), l = null }, r.isStandardBrowserEnv()) { var g = (e.withCredentials || c(y)) && e.xsrfCookieName ? s.read(e.xsrfCookieName) : void 0; g && (d[e.xsrfHeaderName] = g) } if ("setRequestHeader" in l && r.forEach(d, function (e, t) { "undefined" == typeof p && "content-type" === t.toLowerCase() ? delete d[t] : l.setRequestHeader(t, e) }), r.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), e.responseType) try { l.responseType = e.responseType } catch (t) { if ("json" !== e.responseType) throw t } "function" == typeof e.onDownloadProgress && l.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && l.upload && l.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) { l && (l.abort(), n(e), l = null) }), p || (p = null), l.send(p) }) } }, function (e, t, n) { "use strict"; var r = n(14); e.exports = function (e, t, n) { var o = n.config.validateStatus; n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n) } }, function (e, t, n) { "use strict"; var r = n(15); e.exports = function (e, t, n, o, s) { var i = new Error(e); return r(i, t, n, o, s) } }, function (e, t) { "use strict"; e.exports = function (e, t, n, r, o) { return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code } }, e } }, function (e, t, n) { "use strict"; var r = n(2); e.exports = r.isStandardBrowserEnv() ? function () { return { write: function (e, t, n, o, s, i) { var a = []; a.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), r.isString(o) && a.push("path=" + o), r.isString(s) && a.push("domain=" + s), i === !0 && a.push("secure"), document.cookie = a.join("; ") }, read: function (e) { var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return t ? decodeURIComponent(t[3]) : null }, remove: function (e) { this.write(e, "", Date.now() - 864e5) } } }() : function () { return { write: function () { }, read: function () { return null }, remove: function () { } } }() }, function (e, t, n) { "use strict"; var r = n(18), o = n(19); e.exports = function (e, t) { return e && !r(t) ? o(e, t) : t } }, function (e, t) { "use strict"; e.exports = function (e) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e) } }, function (e, t) { "use strict"; e.exports = function (e, t) { return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e } }, function (e, t, n) { "use strict"; var r = n(2), o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]; e.exports = function (e) { var t, n, s, i = {}; return e ? (r.forEach(e.split("\n"), function (e) { if (s = e.indexOf(":"), t = r.trim(e.substr(0, s)).toLowerCase(), n = r.trim(e.substr(s + 1)), t) { if (i[t] && o.indexOf(t) >= 0) return; "set-cookie" === t ? i[t] = (i[t] ? i[t] : []).concat([n]) : i[t] = i[t] ? i[t] + ", " + n : n } }), i) : i } }, function (e, t, n) { "use strict"; var r = n(2); e.exports = r.isStandardBrowserEnv() ? function () { function e(e) { var t = e; return n && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname } } var t, n = /(msie|trident)/i.test(navigator.userAgent), o = document.createElement("a"); return t = e(window.location.href), function (n) { var o = r.isString(n) ? e(n) : n; return o.protocol === t.protocol && o.host === t.host } }() : function () { return function () { return !0 } }() }, function (e, t, n) { "use strict"; var r = n(2); e.exports = function (e, t) { function n(e, t) { return r.isPlainObject(e) && r.isPlainObject(t) ? r.merge(e, t) : r.isPlainObject(t) ? r.merge({}, t) : r.isArray(t) ? t.slice() : t } function o(o) { r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (s[o] = n(void 0, e[o])) : s[o] = n(e[o], t[o]) } t = t || {}; var s = {}, i = ["url", "method", "data"], a = ["headers", "auth", "proxy", "params"], u = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"], c = ["validateStatus"]; r.forEach(i, function (e) { r.isUndefined(t[e]) || (s[e] = n(void 0, t[e])) }), r.forEach(a, o), r.forEach(u, function (o) { r.isUndefined(t[o]) ? r.isUndefined(e[o]) || (s[o] = n(void 0, e[o])) : s[o] = n(void 0, t[o]) }), r.forEach(c, function (r) { r in t ? s[r] = n(e[r], t[r]) : r in e && (s[r] = n(void 0, e[r])) }); var f = i.concat(a).concat(u).concat(c), p = Object.keys(e).concat(Object.keys(t)).filter(function (e) { return f.indexOf(e) === -1 }); return r.forEach(p, o), s } }, function (e, t) { "use strict"; function n(e) { this.message = e } n.prototype.toString = function () { return "Cancel" + (this.message ? ": " + this.message : "") }, n.prototype.__CANCEL__ = !0, e.exports = n }, function (e, t, n) { "use strict"; function r(e) { if ("function" != typeof e) throw new TypeError("executor must be a function."); var t; this.promise = new Promise(function (e) { t = e }); var n = this; e(function (e) { n.reason || (n.reason = new o(e), t(n.reason)) }) } var o = n(23); r.prototype.throwIfRequested = function () { if (this.reason) throw this.reason }, r.source = function () { var e, t = new r(function (t) { e = t }); return { token: t, cancel: e } }, e.exports = r }, function (e, t) { "use strict"; e.exports = function (e) { return function (t) { return e.apply(null, t) } } }, function (e, t) { "use strict"; e.exports = function (e) { return "object" == typeof e && e.isAxiosError === !0 } }]) });


function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function el(el) {
    var obj = {}
    if (typeof el == 'object') {
        obj.el = el;
    } else {
        obj.el = document.createElement(el);
    }
    obj.ch = [];
    obj.id = function (a) {
        this.el.id = a;
        globalThis[a] = {
            parent: this.el,
            el: globalThis.el(this.el),
            child: function (a) {
                return this.parent.appendChild(a.get())
            }
        }
        return this;
    }
    obj.text = function (a) {
        this.el.innerText = a;
        return this;
    }
    obj.html = function (a) {
        this.el.innerHTML = a;
        return this;
    }
    obj.name = function (a) {
        this.el.setAttribute('name', a);
        return this;
    }
    obj.href = function (a) {
        this.el.setAttribute('href', a);
        return this;
    }
    obj.val = function (a) {
        this.el.value = a;
        return this;
    }
    obj.css = function (a, b) {
        if (typeof a == "object") {
            var ky = Object.keys(a);
            ky.forEach(function (item) {
                this.el.style[item] = a[item];
            }, this)
            return this;
        } else {
            this.el.style[a] = b;
            return this;
        }
    }
    obj.change = function (func) {
        this.el.addEventListener('change', func, false);
        return this;
    }
    obj.touchend = function (func) {
        this.el.addEventListener('touchend', func, false);
        return this;
    }
    obj.touchstart = function (func) {
        this.el.addEventListener('touchstart', func, false);
        return this;
    }
    obj.focus = function (func) {
        this.el.addEventListener('focus', func, false);
        return this;
    }
    obj.focusout = function (func) {
        this.el.addEventListener('focusout', func, false);
        return this;
    }
    obj.keydown = function (func) {
        this.el.addEventListener('keydown', func, false);
        return this;
    }
    obj.mouseover = function (func) {
        this.el.addEventListener('mouseover', func, false);
        return this;
    }
    obj.resize = function (func) {
        var gopy = this;
        window.addEventListener('resize', function (e) {
            width = e.target.outerWidth;
            height = e.target.outerHeight;
            var elm = {
                el: gopy.el,
                width: width,
                height: height
            }
            setTimeout(function () {
                func(elm);
            }, 100)
        }, gopy)
        return gopy;
    }
    obj.load = function (func) {
        var gopy = this;
        var width = window.outerWidth;
        var height = window.outerHeight;
        var elm = {
            el: gopy.el,
            width: width,
            height: height
        }
        setTimeout(function () {
            func(elm);
        }, 100)
        return gopy;
    }
    obj.mouseout = function (func) {
        this.el.addEventListener('mouseout', func, false);
        return this;
    }
    obj.keypress = function (func) {
        this.el.addEventListener('keypress', func, false);
        return this;
    }
    obj.click = function (func) {
        this.el.addEventListener('click', func, false);
        return this;
    }
    obj.submit = function (func) {
        this.el.addEventListener('submit', function (e) {
            el = e.path[0];

            el = new FormData(el);

            var object = {};
            el.forEach(function (value, key) {
                object[key] = value;
            });
            var json = object;

            func(json)

            e.preventDefault();
        }, false);
        return this;
    }
    obj.keyup = function (func) {
        this.el.addEventListener('keyup', func, false);
        return this;
    }
    obj.src = function (a) {
        this.el.setAttribute('src', a);
        return this;
    }
    obj.required = function (a) {
        this.el.setAttribute('required', '');
        return this;
    }
    obj.rq = function (a) {
        this.el.setAttribute('required', '');
        return this;
    }
    obj.width = function (a) {
        this.el.style.width = a;
        return this;
    }
    obj.margin = function (a) {
        this.el.style.margin = a;
        return this;
    }
    obj.outline = function (a) {
        this.el.style.outline = a;
        return this;
    }
    obj.border = function (a) {
        this.el.style.border = a;
        return this;
    }
    obj.padding = function (a) {
        this.el.style.padding = a;
        return this;
    }
    obj.fixed = function () {
        this.el.style.position = "fixed";
        return this;
    }
    obj.radius = function (a) {
        this.el.style.borderRadius = a;
        return this;
    }
    obj.bottom = function (a) {
        this.el.style.bottom = a;
        return this;
    }
    obj.right = function (a) {
        this.el.style.right = a;
        return this;
    }
    obj.left = function (a) {
        this.el.style.left = a;
        return this;
    }
    obj.top = function (a) {
        this.el.style.top = a;
        return this;
    }
    obj.float = function (a) {
        this.el.style.float = a;
        return this;
    }
    obj.color = function (a) {
        this.el.style.color = a;
        return this;
    }
    obj.align = function (a) {
        this.el.style.textAlign = a;
        return this;
    }
    obj.size = function (a) {
        this.el.style.fontSize = a;
        return this;
    }
    obj.bold = function (a) {
        if (a == undefined) {
            a = 'bold';
        }
        this.el.style.fontWeight = a;
        return this;
    }
    obj.bg = function (a) {
        this.el.style.background = a;
        return this;
    }
    obj.pd = function (a) {
        this.el.style.padding = a;
        return this;
    }
    obj.mt = function (a) {
        this.el.style.marginTop = a;
        return this;
    }
    obj.mb = function (a) {
        this.el.style.marginBottom = a;
        return this;
    }
    obj.ml = function (a) {
        this.el.style.marginLeft = a;
        return this;
    }
    obj.mr = function (a) {
        this.el.style.marginRight = a;
        return this;
    }
    obj.bgImg = function (a) {
        this.el.style.backgroundImage = "url(" + a + ")";
        return this;
    }
    obj.font = function (a) {
        this.el.style.fontFamily = a;
        return this;
    }
    obj.bgSize = function (a) {
        this.el.style.backgroundSize = a;
        return this;
    }
    obj.bgRepeat = function (a) {
        this.el.style.backgroundRepeat = a;
        return this;
    }
    obj.bgPosition = function (a) {
        this.el.style.backgroundPosition = a;
        return this;
    }
    obj.cursor = function (a) {
        this.el.style.cursor = a;
        return this;
    }
    obj.display = function (a) {
        this.el.style.display = a;
        return this;
    }
    obj.height = function (a) {
        this.el.style.height = a;
        return this;
    }
    obj.placeholder = function (a) {
        this.el.setAttribute('placeholder', a);
        return this;
    }
    obj.hold = function (a) {
        this.el.setAttribute('placeholder', a);
        return this;
    }
    obj.design = function () {
        this.el.setAttribute('contenteditable', true);
        return this;
    }
    obj.class = function (a) {
        if (this.el.className != "") {
            this.el.className += ' ' + a;
        } else {
            this.el.className += a;
        }
        return this;
    }
    obj.type = function (a) {
        this.el.setAttribute("type", a);
        return this;
    }
    obj.attr = function (a, d) {
        this.el.setAttribute(a, d);
        return this;
    }
    obj.data = function (a, d) {
        this.el.setAttribute('data-' + a, d);
        return this;
    }
    obj.aria = function (a, d) {
        this.el.setAttribute('aria-' + a, d);
        return this;
    }
    obj.get = function () {
        if (this.ch.length != 0) {
            this.ch.forEach(function (item) {
                this.el.appendChild(item)
            }, this)
            return this.el;
        } else {
            return this.el;
        }
    }
    obj.child = function (a) {
        this.ch.push(a.get());
        return this;
    }
    obj.row = function (a) {
        var d = div()
            .class('row')

        a.forEach(function (elm) {
            d.child(
                div().class(elm['class']).child(elm['content'])
            )
        }, d);
        this.ch.push(d.get());
        return this;
    }
    obj.getChild = function (pop) {
        return {
            parent: this.get().children[pop],
            el: globalThis.el(this.get().children[pop]),
            child: function (a) {
                return this.parent.appendChild(a.get())
            }
        }
    }
    obj.row = function (a) {
        var d = div()
            .class('row')

        a.forEach(function (elm) {
            d.child(
                div().class(elm['class']).child(elm['content'])
            )
        }, d);
        this.ch.push(d.get());
        return this;
    }
    return obj;
}

const getElementById = function(a){
    return globalThis[a];
}


function tanggal(a) {
    var newDate = new Date();
    if (a != undefined) {
        if (a === "gugus") {
            newDate = new Date(helper.sesiGet('tahun') + '-' + helper.sesiGet('bulan'));
        } else {
            newDate = new Date(a);
        }
    }

    var namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum`at', 'Sabtu'];

    function buat(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = ansDay + '-' + ansMonth + '-' + year;
        if (a == null) {
            return "";
        } else {
            return dayKnow;
        }
    }

    function buatN(newDate) {
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = namaBulan[month];
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = ansDay + ' ' + ansMonth + ' ' + year;
        if (a == null) {
            return "";
        } else {
            return dayKnow;
        }
    }

    function buatO(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = year + '-' + ansMonth + '-' + ansDay;
        return {
            full: dayKnow,
            day: newDate.getDay()
        };
    }

    function buatNum(newDate) {
        var year = newDate.getFullYear();
        var month = (newDate.getMonth() + 1) + '';
        var day = (newDate.getDate()) + '';
        var format = '00';
        var ansMonth = format.substring(0, format.length - month.length) + month;
        var ansDay = format.substring(0, format.length - day.length) + day;
        var dayKnow = year + ansMonth + ansDay;
        return Number(dayKnow);
    }

    function buatC(newDate) {
        var year = newDate.getFullYear();
        var month = newDate.getMonth();
        var day = newDate.getDate();
        var dateK = new Date(year, month, day);
        return dateK;
    }
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    var firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    var lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
    var returnData = {
        oneDayMilisecond: 86400000,
        milisecond: newDate.getTime(),
        normal: buatO(newDate).full,
        cek1: buatC(newDate),
        sekarang: buat(newDate),
        sekarang2: buatN(newDate),
        cek2: buatC(firstDay),
        normal2: buatO(firstDay).full,
        awal: buat(firstDay),
        awal2: buatN(firstDay),
        akhir: buat(lastDay),
        akhir2: buatN(lastDay),
        cek3: buatC(lastDay),
        normal3: buatO(lastDay).full,
        angka: buatNum(newDate),
        dayn: namaHari[buatO(newDate).day],
        day: buatO(newDate).day,
        day2n: namaHari[buatO(firstDay).day],
        day2: buatO(firstDay).day,
        day3n: namaHari[buatO(lastDay).day],
        day3: buatO(lastDay).day
    }
    return returnData;
}

function a() {
    return el('a')
}

function img() {
    return el('img');
}
function label() {
    return el('label')
}
function br() {
    return el('BR')
}

function div() {
    return el('div');
}
function p() {
    return el('p');
}
function line() {
    return el('hr')
        .css("padding", "0")
        .css("margin", "0")
}
function h1() {
    return el('h1').css("font-family", "baloo");
}
function h2() {
    return el('h2').css("fontFamily", "arima");
}
function h3() {
    return el('h3');
}
function h4() {
    return el('h4');
}
function h5() {
    return el('h5');
}
function h6() {
    return el('h6');
}
function input() {
    return el('input');
}
function btn() {
    return el('button');
}
function tbl() {
    return el('TABLE');
}
function tr() {
    return el('TR');
}
function nav() {
    return el('nav');
}
function td() {
    return el('TD');
}
function th() {
    return el('TH');
}
function thead() {
    return el('THEAD');
}
function tbody() {
    return el('TBODY');
}
function form() {
    return el('FORM');
}
function ul() {
    return el('ul');
}
function li() {
    return el('li');
}
function option() {
    return el('option');
}
function textarea() {
    return el('textarea');
}

// bootstrap element select
function btSelect(text, name, el, act) {
    var a = select().name(name).class('form-control')
        .id(name)
        .child(
            option().val('').text('pilih data')
        )
    if (act != undefined) {
        Object.keys(act).forEach(function (eld) {
            a[eld](act[eld]);
        }, a)
    }
    if (el != undefined) {
        el.forEach(function (item) {
            a.child(
                option().val(item.value).text(item.name)
            )
        }, a)
    }
    var b = div()
        .class('form-group')
        .child(
            label().text(text)
        )
        .child(
            a
        )
    return b;
}

function select() {
    return el('select');
}
function span() {
    return el('span');
}
function i() {
    return el('i');
}
function video() {
    return el('video');
}
function canvas() {
    return el('canvas');
}
function icon(a) {
    return i().class(a)
        .css('cursor', 'pointer')
        .css('fontSize', '30px')
        .css('marginRight', '10px')
        .css('marginLeft', '10px')
        .css('transition', '0.5s')
}

function domp(a, ch) {
    var domp = document.getElementById(a);
    if (domp != null) {
        var parent = domp.parentNode;
        var newd = div().id(a).child(ch);
        parent.replaceChild(newd.get(), domp);
    } else {
        domp.appendChild(ch.get());
    }
}

function dompp(a, ch) {
    var domp = a;
    if (domp != null) {
        var parent = domp.parentNode;
        var newd = div().id(a).child(ch);
        parent.replaceChild(newd.get(), domp);
    } else {
        domp.appendChild(ch.get());
    }
}

function dom(a, ch) {
    var domp = a;
    domp.appendChild(ch.get());
}


function newStyle(a, ccs) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ccs;
    document.getElementsByTagName('head')[a].appendChild(style);
}


function prop(name, child, value) {
    if (value != undefined && child != undefined) {
        globalThis[name][child] = value
    } else {
        if (value != undefined) {
            return globalThis[name][child]
        } else {
            return globalThis[name]
        }
    }
}

function loadJs(url, callback) {
    var script = document.createElement('script');
    script.onload = function () {
        callback()
    };
    script.src = url;
    document.head.appendChild(script);
}

function headConf(callback) {
    document.head.innerHTML += callback;
}

function perulangan(a, b, c) {
    if (a != undefined && b != undefined && c != undefined) {
        for (i = a; i < b; i++) {
            c(i);
        }
    } else {
        // do nothing
    }
}

function loads(arr = [], success, errorf) {
    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement("script");
            script.src = url;
            script.async = false;
            script.onload = function () {
                resolve(url);
            };
            script.onerror = function () {
                reject(url);
            };
            document.body.appendChild(script);
        });
    }

    let scripts = arr;

    // save all Promises as array
    let promises = [];
    scripts.forEach(function (url) {
        promises.push(loadScript(url));

    });

    Promise.all(promises)
        .then(function () {
            success();
        })
        .catch(function (script) {
            errorf(script)
        });
}

function childes(el = null , err = []){
    var e = el;
    for (let x = 0; x < err.length; x++) {
        if((err.length - 1)== x){
            e = e.getChild(err[x])        
        }else{
            e = e.getChild(err[x]).el;       
        }
    }
    return e;
}