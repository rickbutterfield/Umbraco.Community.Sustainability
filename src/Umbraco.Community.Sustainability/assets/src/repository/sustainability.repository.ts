import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { SustainabilityManagementDataSource } from "./sources/sustainability.datasource";
import { SustainabilityResponse } from "../api";

export class SustainabilityManagementRepository extends UmbControllerBase {
  #sustainabilityDataSource: SustainabilityManagementDataSource;

  constructor(host: UmbControllerHost) {
    super(host);
    this.#sustainabilityDataSource = new SustainabilityManagementDataSource(this);

    console.log('repository constructor');
  }

  async checkPage(pageGuid: string) {
    return this.#sustainabilityDataSource.checkPage(pageGuid);
  }

  async getPageData(pageGuid: string) {
    return this.#sustainabilityDataSource.getPageData(pageGuid);
  }

  async savePageData(pageGuid: string, sustainabilityResponse: SustainabilityResponse) {
    return this.#sustainabilityDataSource.savePageData(pageGuid, sustainabilityResponse);
  }
}
