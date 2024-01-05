using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    public class SustainabilityController : UmbracoApiController
    {
        private readonly IPublishedContentQuery _contentQuery;
        private readonly IPageMetricService _pageMetricService;
        private readonly ISustainabilityService _sustainabilityService;

        public SustainabilityController(
            IPublishedContentQuery contentQuery,
            IPageMetricService pageMetricService,
            ISustainabilityService sustainabilityService)
        {
            _contentQuery = contentQuery;
            _pageMetricService = pageMetricService;
            _sustainabilityService = sustainabilityService;
        }

        [HttpGet]
        public IActionResult GetPageData([FromQuery] int pageId)
        {
            var pageMetrics = _pageMetricService.GetPageMetrics(pageId);
            var mostRecent = pageMetrics.OrderByDescending(x => x.RequestDate).FirstOrDefault();
            if (mostRecent?.PageData == null)
            {
                return Ok("No recent data found");
            }

            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityResponse>(mostRecent.PageData);
            return Ok(sustainabilityData);
        }

        [HttpGet]
        public async Task<IActionResult> CheckPage([FromQuery] int pageId)
        {
            var contentItem = _contentQuery.Content(pageId);
            if (contentItem == null)
            {
                return Ok("Page not found");
            }

            var url = contentItem.Url(mode: UrlMode.Absolute);
            var sustainabilityData = await _sustainabilityService.GetSustainabilityData(url);

            return Ok(sustainabilityData);
        }

        [HttpPost]
        public IActionResult SavePageData([FromQuery] int pageId, [FromBody] SustainabilityResponse data)
        {
            if (data.TotalSize == 0)
            {
                return Ok("Missing data to update");
            }

            var pageMetric = new PageMetric()
            {
                NodeId = pageId,
                RequestedBy = "Admin",
                RequestDate = data.LastRunDate,
                TotalSize = data.TotalSize,
                TotalEmissions = Convert.ToDecimal(data.TotalEmissions),
                CarbonRating = data.CarbonRating,
                PageData = JsonSerializer.Serialize(data),
            };

            _pageMetricService.AddPageMetric(pageMetric);
            return Ok(true);
        }
    }
}
