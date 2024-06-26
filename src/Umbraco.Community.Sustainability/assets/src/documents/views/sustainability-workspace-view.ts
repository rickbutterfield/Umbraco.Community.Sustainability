import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement, customElement, css, state, repeat } from '@umbraco-cms/backoffice/external/lit'
import { UMB_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/workspace";
import type { UmbDocumentWorkspaceContext } from '@umbraco-cms/backoffice/document';
import SustainabilityContext, { SUSTAINABILITY_CONTEXT } from "../../context/sustainability.context";
import { ExternalResourceGroup, SustainabilityResponse } from "../../api";

@customElement('sustainability-workspace-view')
export class SustainabilityWorkspaceElement extends UmbElementMixin(LitElement) {

  #sustainabilityContext?: SustainabilityContext;

  @state()
  private _documentUnique?: string = '';

  @state()
  waiting?: boolean = false;

  @state()
  pageData?: SustainabilityResponse | undefined = undefined;

  constructor() {
    super();

    this.consumeContext(UMB_WORKSPACE_CONTEXT, (nodeContext) => {
      const workspaceContext = (nodeContext as UmbDocumentWorkspaceContext);

      this.observe((workspaceContext).unique, (unique) => {
        this._documentUnique = unique;
      });
    });

    this.consumeContext(SUSTAINABILITY_CONTEXT, (instance) => {
      this.#sustainabilityContext = instance;
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    if (this.#sustainabilityContext != null) {
      if (this._documentUnique) {
        this.pageData = await this.#sustainabilityContext.getPageData(this._documentUnique);
      }
    }
  }

  async checkPage() {
    this.waiting = true;
    if (this._documentUnique) {
      this.pageData = await this.#sustainabilityContext?.checkPage(this._documentUnique, false);
      this.waiting = false;
    }
  }

  render() {
    if (this.pageData === undefined) {
      return html`
          <uui-box headline="Loading sustainability report...">
              <p>It looks like you haven't run a report on this page yet. Click the button below to get started.</p>
              <uui-button label="Run sustainability report" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
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
              <uui-box headline="Carbon rating">
                <sustainability-carbon-rating slot="header" .carbonRating=${this.pageData?.carbonRating}></sustainability-carbon-rating>
                <p><strong>Last tested:</strong> ${new Intl.DateTimeFormat('en-GB', { dateStyle: "long", timeStyle: "short" }).format(new Date(this.pageData?.lastRunDate!))}</p>
                <uui-button label="Run again" look="primary" @click=${this.checkPage} .state=${this.waiting ? "waiting" : undefined}>
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
