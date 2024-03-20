/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResource } from './ExternalResource';
import type { ResourceGroupType } from './ResourceGroupType';

export type ExternalResourceGroup = {
    type: ResourceGroupType;
    name?: string | null;
    totalSize: number;
    resources?: Array<ExternalResource> | null;
};
