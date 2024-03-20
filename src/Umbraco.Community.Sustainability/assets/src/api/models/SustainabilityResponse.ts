/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalResourceGroup } from './ExternalResourceGroup';

export type SustainabilityResponse = {
    lastRunDate: string;
    totalSize: number;
    totalEmissions: number;
    carbonRating?: string | null;
    resourceGroups?: Array<ExternalResourceGroup> | null;
};
