import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as u, repeat as f, css as x, state as v, property as d, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UMB_WORKSPACE_CONTEXT as k } from "@umbraco-cms/backoffice/workspace";
import { SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN as C } from "./sustainability.context--ZTXXUek.js";
import "@umbraco-cms/backoffice/class-api";
import "@umbraco-cms/backoffice/resources";
import "@umbraco-cms/backoffice/context-api";
import "@umbraco-cms/backoffice/observable-api";
import "@umbraco-cms/backoffice/auth";
var D = Object.defineProperty, E = Object.getOwnPropertyDescriptor, r = (t, i, e, a) => {
  for (var s = a > 1 ? void 0 : a ? E(i, e) : i, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (s = (a ? p(i, e, s) : p(s)) || s);
  return a && s && D(i, e, s), s;
}, g = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
}, c = (t, i, e) => (g(t, i, "read from private field"), e ? e.call(t) : i.get(t)), m = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, S = (t, i, e, a) => (g(t, i, "write to private field"), a ? a.call(t, e) : i.set(t, e), e), $ = (t, i, e) => (g(t, i, "access private method"), e), n, h, y;
let o = class extends _(w) {
  constructor() {
    super(), m(this, h), m(this, n, void 0), this._documentUnique = "", this.pageName = "", this.loading = !0, this.waiting = !1, this.consumeContext(k, (t) => {
      const i = t;
      this.observe(i.unique, (a) => {
        this._documentUnique = a;
      });
      const e = t;
      console.log(e.getName()), this.pageName = e.getName();
    }), this.consumeContext(C, (t) => {
      S(this, n, t), this.observe(t.pageData, (i) => {
        var e;
        this.pageData = i, this.pageData != null && typeof ((e = this.pageData) == null ? void 0 : e.totalSize) < "u" && (this.loading = !1);
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), c(this, n) != null && this.loading && this._documentUnique && c(this, n).getPageData(this._documentUnique);
  }
  async checkPage() {
    var t;
    this.waiting = !0, this._documentUnique && (await ((t = c(this, n)) == null ? void 0 : t.checkPage(this._documentUnique, !1)), this.waiting = !1);
  }
  render() {
    var t, i, e;
    return this.loading ? u`
          <uui-box headline="Loading sustainability report...">
              <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
              <uui-button look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                Run sustainability report
              </uui-button>
          </uui-box>
      ` : u`
            <div class="container">
              ${f(
      (t = this.pageData) == null ? void 0 : t.resourceGroups,
      (a) => a.name,
      (a) => $(this, h, y).call(this, a)
    )}
            </div>
            <div class="container">
              <uui-box headline="Sustainability report">
                <p><strong>Last tested:</strong> ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" }).format(new Date((i = this.pageData) == null ? void 0 : i.lastRunDate))}</p>
                <uui-button look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : void 0}>
                  Run again
                </uui-button>
              </uui-box>
              <uui-box headline="Page size">
                ${(this.pageData.totalSize / 1024).toFixed(2)}KB
              </uui-box>
              <uui-box headline="CO₂ per page view">
                ${(e = this.pageData) == null ? void 0 : e.totalEmissions.toFixed(4)}g
              </uui-box>
            </div>
          `;
  }
};
n = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
y = function(t) {
  var i;
  if (((i = t.resources) == null ? void 0 : i.length) !== 0)
    return u`
          <uui-box headline=${t.name}>
            <ul>
            ${f(
      t.resources,
      (e) => e.url,
      (e) => u`<li>${e.url} (${(e.size / 1024).toFixed(2)}KB)</li>`
    )}
            </ul>
          </uui-box>
        `;
};
o.styles = x`
        :host {
            display: grid;
            gap: var(--uui-size-layout-1);
            padding: var(--uui-size-layout-1);
            grid-template-columns: 1fr 350px;
        }

        div.container {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-layout-1);
        }
    `;
r([
  v()
], o.prototype, "_documentUnique", 2);
r([
  v()
], o.prototype, "pageName", 2);
r([
  d({ type: Boolean })
], o.prototype, "loading", 2);
r([
  d({ type: Boolean })
], o.prototype, "waiting", 2);
r([
  d({ type: Object })
], o.prototype, "pageData", 2);
o = r([
  b("sustainability-workspace-view")
], o);
const G = o;
export {
  o as SustainabilityWorkspaceElement,
  G as default
};
//# sourceMappingURL=sustainability-workspace-view-zfQh7O_j.js.map
