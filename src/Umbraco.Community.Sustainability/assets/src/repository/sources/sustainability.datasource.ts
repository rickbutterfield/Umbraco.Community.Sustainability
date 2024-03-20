import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { SustainabilityResource, SustainabilityResponse } from "../../api";

export interface SustainabilityDataSource {

  checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>>;
  savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>>;

}

export class SustainabilityManagementDataSource implements SustainabilityDataSource {

  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async checkPage(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.checkPage({ pageGuid: pageGuid }));
  }

  async getPageData(pageGuid: string): Promise<UmbDataSourceResponse<SustainabilityResponse>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.getPageData({ pageGuid: pageGuid }));
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse): Promise<UmbDataSourceResponse<boolean>> {
    return await tryExecuteAndNotify(this.#host, SustainabilityResource.savePageData({
      pageGuid: pageGuid,
      requestBody: sustainabilityResponse
    }))
  }

}
