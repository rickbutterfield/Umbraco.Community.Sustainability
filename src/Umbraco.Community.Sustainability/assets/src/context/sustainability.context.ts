import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { SustainabilityManagementRepository } from "../repository/sustainability.repository";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";

import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";

import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth'
import { OpenAPI, SustainabilityResponse } from "../api";

export class SustainabilityManagementContext extends UmbControllerBase {
  
  #repository: SustainabilityManagementRepository;

  #pageData = new UmbObjectState<SustainabilityResponse | undefined>(undefined);
  public readonly pageData = this.#pageData.asObservable();

  constructor(host: UmbControllerHost) {
    super(host);

    this.provideContext(SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN, this);
    this.#repository = new SustainabilityManagementRepository(this);
    
    this.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {
      OpenAPI.TOKEN = () => _auth.getLatestToken();
      OpenAPI.WITH_CREDENTIALS = true;
    });

  }

  async checkPage(pageGuid: string, initialLoad: boolean = true) {
    const { data } = await this.#repository.checkPage(pageGuid);
    if (data) {
      this.#pageData.setValue(data);

      if (!initialLoad) {
        await this.savePageData(pageGuid, data);
      }
    }
  }

  async getPageData(pageGuid: string, initialLoad: boolean = true) {
    const { data } = await this.#repository.getPageData(pageGuid);
    if (data) {
      this.#pageData.setValue(data);

      if (!initialLoad) {
        await this.savePageData(pageGuid, data);
      }
    }
  }
  
  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse) {
    const saved = await this.#repository.savePageData(pageGuid, sustainabilityResponse);
    return saved;
  }
  
}

export default SustainabilityManagementContext;

export const SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN = new UmbContextToken<SustainabilityManagementContext>(SustainabilityManagementContext.name);
