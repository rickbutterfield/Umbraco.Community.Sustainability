/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SustainabilityResponse } from '../models/SustainabilityResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SustainabilityResource {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static checkPage({
pageGuid,
}: {
pageGuid?: string,
}): CancelablePromise<SustainabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/sustainability/api/v1/checkPage',
            query: {
                'pageGuid': pageGuid,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getPageData({
pageGuid,
}: {
pageGuid?: string,
}): CancelablePromise<SustainabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/sustainability/api/v1/getPageData',
            query: {
                'pageGuid': pageGuid,
            },
        });
    }

    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static savePageData({
pageGuid,
requestBody,
}: {
pageGuid?: string,
requestBody?: SustainabilityResponse,
}): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/sustainability/api/v1/savePageData',
            query: {
                'pageGuid': pageGuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
