var I = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
};
var n = (e, t, r) => (I(e, t, "read from private field"), r ? r.call(e) : t.get(e)), d = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, u = (e, t, r, s) => (I(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r);
import { UmbControllerBase as H } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as O } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as _ } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as L } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
class $ extends Error {
  constructor(t, r, s) {
    super(s), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = t;
  }
}
class M extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
var l, f, y, g, m, P, D;
class W {
  constructor(t) {
    d(this, l, void 0);
    d(this, f, void 0);
    d(this, y, void 0);
    d(this, g, void 0);
    d(this, m, void 0);
    d(this, P, void 0);
    d(this, D, void 0);
    u(this, l, !1), u(this, f, !1), u(this, y, !1), u(this, g, []), u(this, m, new Promise((r, s) => {
      u(this, P, r), u(this, D, s);
      const a = (c) => {
        var h;
        n(this, l) || n(this, f) || n(this, y) || (u(this, l, !0), (h = n(this, P)) == null || h.call(this, c));
      }, i = (c) => {
        var h;
        n(this, l) || n(this, f) || n(this, y) || (u(this, f, !0), (h = n(this, D)) == null || h.call(this, c));
      }, o = (c) => {
        n(this, l) || n(this, f) || n(this, y) || n(this, g).push(c);
      };
      return Object.defineProperty(o, "isResolved", {
        get: () => n(this, l)
      }), Object.defineProperty(o, "isRejected", {
        get: () => n(this, f)
      }), Object.defineProperty(o, "isCancelled", {
        get: () => n(this, y)
      }), t(a, i, o);
    }));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, r) {
    return n(this, m).then(t, r);
  }
  catch(t) {
    return n(this, m).catch(t);
  }
  finally(t) {
    return n(this, m).finally(t);
  }
  cancel() {
    var t;
    if (!(n(this, l) || n(this, f) || n(this, y))) {
      if (u(this, y, !0), n(this, g).length)
        try {
          for (const r of n(this, g))
            r();
        } catch (r) {
          console.warn("Cancellation threw an error", r);
          return;
        }
      n(this, g).length = 0, (t = n(this, D)) == null || t.call(this, new M("Request aborted"));
    }
  }
  get isCancelled() {
    return n(this, y);
  }
}
l = new WeakMap(), f = new WeakMap(), y = new WeakMap(), g = new WeakMap(), m = new WeakMap(), P = new WeakMap(), D = new WeakMap();
const w = {
  BASE: "",
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
}, x = (e) => e != null, C = (e) => typeof e == "string", R = (e) => C(e) && e !== "", B = (e) => typeof e == "object" && typeof e.type == "string" && typeof e.stream == "function" && typeof e.arrayBuffer == "function" && typeof e.constructor == "function" && typeof e.constructor.name == "string" && /^(Blob|File)$/.test(e.constructor.name) && /^(Blob|File)$/.test(e[Symbol.toStringTag]), q = (e) => e instanceof FormData, G = (e) => {
  try {
    return btoa(e);
  } catch {
    return Buffer.from(e).toString("base64");
  }
}, J = (e) => {
  const t = [], r = (a, i) => {
    t.push(`${encodeURIComponent(a)}=${encodeURIComponent(String(i))}`);
  }, s = (a, i) => {
    x(i) && (Array.isArray(i) ? i.forEach((o) => {
      s(a, o);
    }) : typeof i == "object" ? Object.entries(i).forEach(([o, c]) => {
      s(`${a}[${o}]`, c);
    }) : r(a, i));
  };
  return Object.entries(e).forEach(([a, i]) => {
    s(a, i);
  }), t.length > 0 ? `?${t.join("&")}` : "";
}, V = (e, t) => {
  const r = e.ENCODE_PATH || encodeURI, s = t.url.replace("{api-version}", e.VERSION).replace(/{(.*?)}/g, (i, o) => {
    var c;
    return (c = t.path) != null && c.hasOwnProperty(o) ? r(String(t.path[o])) : i;
  }), a = `${e.BASE}${s}`;
  return t.query ? `${a}${J(t.query)}` : a;
}, K = (e) => {
  if (e.formData) {
    const t = new FormData(), r = (s, a) => {
      C(a) || B(a) ? t.append(s, a) : t.append(s, JSON.stringify(a));
    };
    return Object.entries(e.formData).filter(([s, a]) => x(a)).forEach(([s, a]) => {
      Array.isArray(a) ? a.forEach((i) => r(s, i)) : r(s, a);
    }), t;
  }
}, A = async (e, t) => typeof t == "function" ? t(e) : t, z = async (e, t) => {
  const r = await A(t, e.TOKEN), s = await A(t, e.USERNAME), a = await A(t, e.PASSWORD), i = await A(t, e.HEADERS), o = Object.entries({
    Accept: "application/json",
    ...i,
    ...t.headers
  }).filter(([c, h]) => x(h)).reduce((c, [h, b]) => ({
    ...c,
    [h]: String(b)
  }), {});
  if (R(r) && (o.Authorization = `Bearer ${r}`), R(s) && R(a)) {
    const c = G(`${s}:${a}`);
    o.Authorization = `Basic ${c}`;
  }
  return t.body && (t.mediaType ? o["Content-Type"] = t.mediaType : B(t.body) ? o["Content-Type"] = t.body.type || "application/octet-stream" : C(t.body) ? o["Content-Type"] = "text/plain" : q(t.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, X = (e) => {
  var t;
  if (e.body !== void 0)
    return (t = e.mediaType) != null && t.includes("/json") ? JSON.stringify(e.body) : C(e.body) || B(e.body) || q(e.body) ? e.body : JSON.stringify(e.body);
}, Q = async (e, t, r, s, a, i, o) => {
  const c = new AbortController(), h = {
    headers: i,
    body: s ?? a,
    method: t.method,
    signal: c.signal
  };
  return e.WITH_CREDENTIALS && (h.credentials = e.CREDENTIALS), o(() => c.abort()), await fetch(r, h);
}, Y = (e, t) => {
  if (t) {
    const r = e.headers.get(t);
    if (C(r))
      return r;
  }
}, Z = async (e) => {
  if (e.status !== 204)
    try {
      const t = e.headers.get("Content-Type");
      if (t)
        return ["application/json", "application/problem+json"].some((a) => t.toLowerCase().startsWith(a)) ? await e.json() : await e.text();
    } catch (t) {
      console.error(t);
    }
}, tt = (e, t) => {
  const s = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...e.errors
  }[t.status];
  if (s)
    throw new $(e, t, s);
  if (!t.ok) {
    const a = t.status ?? "unknown", i = t.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new $(
      e,
      t,
      `Generic Error: status: ${a}; status text: ${i}; body: ${o}`
    );
  }
}, N = (e, t) => new W(async (r, s, a) => {
  try {
    const i = V(e, t), o = K(t), c = X(t), h = await z(e, t);
    if (!a.isCancelled) {
      const b = await Q(e, t, i, c, o, h, a), U = await Z(b), k = Y(b, t.responseHeader), v = {
        url: i,
        ok: b.ok,
        status: b.status,
        statusText: b.statusText,
        body: k ?? U
      };
      tt(t, v), r(v.body);
    }
  } catch (i) {
    s(i);
  }
});
class j {
  /**
   * @returns any Success
   * @throws ApiError
   */
  static checkPage({
    pageGuid: t
  }) {
    return N(w, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/checkPage",
      query: {
        pageGuid: t
      }
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getPageData({
    pageGuid: t
  }) {
    return N(w, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getPageData",
      query: {
        pageGuid: t
      }
    });
  }
  /**
   * @returns boolean Success
   * @throws ApiError
   */
  static savePageData({
    pageGuid: t,
    requestBody: r
  }) {
    return N(w, {
      method: "POST",
      url: "/umbraco/sustainability/api/v1/savePageData",
      query: {
        pageGuid: t
      },
      body: r,
      mediaType: "application/json"
    });
  }
}
var p;
class et {
  constructor(t) {
    d(this, p, void 0);
    u(this, p, t);
  }
  async checkPage(t) {
    return await O(n(this, p), j.checkPage({ pageGuid: t }));
  }
  async getPageData(t) {
    return await O(n(this, p), j.getPageData({ pageGuid: t }));
  }
  async savePageData(t, r) {
    return await O(n(this, p), j.savePageData({
      pageGuid: t,
      requestBody: r
    }));
  }
}
p = new WeakMap();
var E;
class rt extends H {
  constructor(r) {
    super(r);
    d(this, E, void 0);
    u(this, E, new et(this)), console.log("repository constructor");
  }
  async checkPage(r) {
    return n(this, E).checkPage(r);
  }
  async getPageData(r) {
    return n(this, E).getPageData(r);
  }
  async savePageData(r, s) {
    return n(this, E).savePageData(r, s);
  }
}
E = new WeakMap();
var S, T;
class at extends H {
  constructor(r) {
    super(r);
    d(this, S, void 0);
    d(this, T, void 0);
    u(this, T, new L(void 0)), this.pageData = n(this, T).asObservable(), this.provideContext(st, this), u(this, S, new rt(this)), this.consumeContext(F, (s) => {
      w.TOKEN = () => s.getLatestToken(), w.WITH_CREDENTIALS = !0;
    });
  }
  async checkPage(r, s = !0) {
    const { data: a } = await n(this, S).checkPage(r);
    a && (n(this, T).setValue(a), s || await this.savePageData(r, a));
  }
  async getPageData(r, s = !0) {
    const { data: a } = await n(this, S).getPageData(r);
    a && (n(this, T).setValue(a), s || await this.savePageData(r, a));
  }
  async savePageData(r, s) {
    return await n(this, S).savePageData(r, s);
  }
}
S = new WeakMap(), T = new WeakMap();
const st = new _(at.name);
export {
  st as SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN,
  at as SustainabilityManagementContext,
  at as default
};
//# sourceMappingURL=sustainability.context--ZTXXUek.js.map
