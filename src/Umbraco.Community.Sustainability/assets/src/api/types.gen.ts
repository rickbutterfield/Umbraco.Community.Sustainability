// This file is auto-generated by @hey-api/openapi-ts


export type AveragePageMetrics = {
    carbonRating?: string | null;
    pageSize?: number | null;
    emissions?: number | null;
};

export type DirectionModel = 'Ascending' | 'Descending';

export type EventMessageTypeModel = 'Default' | 'Info' | 'Error' | 'Success' | 'Warning';

export type ExternalResource = {
    url?: string | null;
    size: number;
};

export type ExternalResourceGroup = {
    type: ResourceGroupType;
    name?: string | null;
    totalSize: number;
    resources?: Array<(ExternalResource)> | null;
};

export type NotificationHeaderModel = {
    message: string;
    category: string;
    type: EventMessageTypeModel;
};

export type PageMetric = {
    id: number;
    nodeId: number;
    nodeName?: string | null;
    requestedBy?: string | null;
    requestDate: string;
    totalSize: number;
    totalEmissions: number;
    carbonRating?: string | null;
    pageData?: string | null;
};

export type PagedResultPageMetricModel = {
    pageNumber: number;
    pageSize: number;
    readonly totalPages: number;
    totalItems: number;
    items?: Array<(PageMetric)> | null;
};

export type ResourceGroupType = 'Images' | 'Scripts' | 'Styles' | 'Other';

export type SustainabilityResponse = {
    lastRunDate: string;
    totalSize: number;
    totalEmissions: number;
    carbonRating?: string | null;
    resourceGroups?: Array<(ExternalResourceGroup)> | null;
};

export type $OpenApiTs = {
    '/umbraco/sustainability/api/v1/checkPage': {
        get: {
            req: {
                pageGuid?: string;
            };
            res: {
                /**
 * Success
 */
                200: SustainabilityResponse;
            };
        };
    };
    '/umbraco/sustainability/api/v1/getAverageData': {
        get: {
            res: {
                /**
 * Success
 */
                200: AveragePageMetrics;
            };
        };
    };
    '/umbraco/sustainability/api/v1/getOverviewData': {
        get: {
            req: {
                direction?: DirectionModel;
                orderBy?: string;
                pageNumber?: number;
                pageSize?: number;
            };
            res: {
                /**
 * Success
 */
                200: PagedResultPageMetricModel;
            };
        };
    };
    '/umbraco/sustainability/api/v1/getPageData': {
        get: {
            req: {
                pageGuid?: string;
            };
            res: {
                /**
 * Success
 */
                200: SustainabilityResponse;
            };
        };
    };
    '/umbraco/sustainability/api/v1/savePageData': {
        post: {
            req: {
                pageGuid?: string;
                requestBody?: SustainabilityResponse;
            };
            res: {
                /**
 * Success
 */
                200: boolean;
            };
        };
    };
};