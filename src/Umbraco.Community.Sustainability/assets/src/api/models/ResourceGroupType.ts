/* tslint:disable */
/* eslint-disable */
/**
 * Sustainability API
 * Umbraco.Community.Sustainability
 *
 * The version of the OpenAPI document: Latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const ResourceGroupType = {
    Images: 'Images',
    Scripts: 'Scripts',
    Styles: 'Styles',
    Other: 'Other'
} as const;
export type ResourceGroupType = typeof ResourceGroupType[keyof typeof ResourceGroupType];


export function ResourceGroupTypeFromJSON(json: any): ResourceGroupType {
    return ResourceGroupTypeFromJSONTyped(json, false);
}

export function ResourceGroupTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResourceGroupType {
    return json as ResourceGroupType;
}

export function ResourceGroupTypeToJSON(value?: ResourceGroupType | null): any {
    return value as any;
}

