import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement, customElement, css, state, property, repeat } from '@umbraco-cms/backoffice/external/lit'
import { UMB_WORKSPACE_CONTEXT, UmbVariantableWorkspaceContextInterface } from "@umbraco-cms/backoffice/workspace";
import SustainabilityManagementContext, { SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN } from "../../context/sustainability.context";
import { ExternalResourceGroup, SustainabilityResponse } from "../../api";
import type { UmbDocumentWorkspaceContext } from '@umbraco-cms/backoffice/document';

@customElement('sustainability-workspace-view')
export class SustainabilityWorkspaceElement extends UmbElementMixin(LitElement) {

  #sustainabilityContext?: SustainabilityManagementContext;

  @state()
  private _documentUnique?: string = '';

  @state()
  pageName?: string = '';

  @property({ type: Boolean })
  loading?: boolean = true;

  @property({ type: Boolean })
  waiting?: boolean = false;

  @property({ type: Object })
  pageData?: SustainabilityResponse;

  constructor() {
    super();

    this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {

      const workspaceContext = (nodeContext as UmbDocumentWorkspaceContext);

      this.observe((workspaceContext).unique, (unique) => {
        this._documentUnique = unique;
      });

      const variantContext = (nodeContext as UmbVariantableWorkspaceContextInterface);
      console.log(variantContext.getName());

      this.pageName = variantContext.getName();
    });

    this.consumeContext(SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN, (_instance) => {
      this.#sustainabilityContext = _instance;

      this.observe(_instance.pageData, (_pageData) => {
        this.pageData = _pageData;
        if (this.pageData != null) {
          if (typeof this.pageData?.totalSize !== "undefined") {
            this.loading = false;
          }
        }
      })
    })
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.#sustainabilityContext != null) {
      if (this.loading) {
        if (this._documentUnique) {
          this.#sustainabilityContext.getPageData(this._documentUnique);
        }
      }
    }
  }

  async checkPage() {
    this.waiting = true;
    if (this._documentUnique) {
      await this.#sustainabilityContext?.checkPage(this._documentUnique, false);
      this.waiting = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
          <uui-box headline="Loading sustainability report...">
              <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
              <uui-button look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
                Run sustainability report
              </uui-button>
          </uui-box>
      `;
    }
    else {
      return html`
            <div class="container">
              ${repeat(
        this.pageData?.resourceGroups!,
        (group) => group.name,
        (group) => this.#renderResourceGroup(group)
      )}
            </div>
            <div class="container">
              <uui-box headline="Sustainability report">
                <p><strong>Last tested:</strong> ${new Intl.DateTimeFormat('en-GB', { dateStyle: "long", timeStyle: "short" }).format(new Date(this.pageData?.lastRunDate!))}</p>
                <uui-button look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
                  Run again
                </uui-button>
              </uui-box>
              <uui-box headline="Page size">
                ${(this.pageData!.totalSize / 1024).toFixed(2)}KB
              </uui-box>
              <uui-box headline="CO₂ per page view">
                ${this.pageData?.totalEmissions.toFixed(4)}g
              </uui-box>
            </div>
          `;
    }
  }

  #renderResourceGroup(group: ExternalResourceGroup) {
    if (group.resources?.length !== 0) {
      return html`
          <uui-box headline=${group.name!}>
            <ul>
            ${repeat(
        group.resources!,
        (resource) => resource.url,
        (resource) => html`<li>${resource.url} (${(resource.size / 1024).toFixed(2)}KB)</li>`
      )}
            </ul>
          </uui-box>
        `;
    }
  }

  static styles = css`
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
    `
}

export default SustainabilityWorkspaceElement;
