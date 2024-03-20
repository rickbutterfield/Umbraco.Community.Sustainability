#if NET8_0
using System.Text.Json;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "sustainability")]
    public class SustainabilityWorkspaceController : SustainabilityWorkspaceControllerBase
    {
        private readonly IPublishedContentQuery _contentQuery;
        private readonly IPageMetricService _pageMetricService;
        private readonly ISustainabilityService _sustainabilityService;

        public SustainabilityWorkspaceController(
            IPublishedContentQuery contentQuery,
            IPageMetricService pageMetricService,
            ISustainabilityService sustainabilityService)
        {
            _contentQuery = contentQuery;
            _pageMetricService = pageMetricService;
            _sustainabilityService = sustainabilityService;
        }

        [HttpGet("getPageData")]
        [ProducesResponseType(typeof(SustainabilityResponse), 200)]
        [ProducesResponseType(typeof(string), 204)]
        public async Task<IActionResult> GetPageData([FromQuery] string pageGuid)
        {
            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);
                if (contentItem == null)
                {
                    return NoContent();
                }

                var pageMetrics = await _pageMetricService.GetPageMetrics(contentItem.Id);
                var mostRecent = pageMetrics.OrderByDescending(x => x.RequestDate).FirstOrDefault();
                if (mostRecent?.PageData == null)
                {
                    return NoContent();
                }

                var sustainabilityData = JsonSerializer.Deserialize<SustainabilityResponse>(mostRecent.PageData);
                return Ok(sustainabilityData);
            }

            return NoContent();
        }

        [HttpGet("checkPage")]
        [ProducesResponseType(typeof(SustainabilityResponse), 200)]
        [ProducesResponseType(typeof(string), 204)]
        public async Task<IActionResult> CheckPage([FromQuery] string pageGuid)
        {
            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);
                if (contentItem == null)
                {
                    return Ok("Page not found");
                }

                var url = contentItem.Url(mode: UrlMode.Absolute);
                var sustainabilityData = await _sustainabilityService.GetSustainabilityData(url);

                return Ok(sustainabilityData);
            }

            return NoContent();
        }

        [HttpPost("savePageData")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> SavePageData([FromQuery] string pageGuid, [FromBody] SustainabilityResponse data)
        {
            if (data.TotalSize == 0)
            {
                return Ok(false);
            }

            if (Guid.TryParse(pageGuid, out Guid guid))
            {
                var contentItem = _contentQuery.Content(guid);

                if (contentItem == null)
                {
                    return Ok(false);
                }

                var pageMetric = new PageMetric()
                {
                    NodeId = contentItem.Id,
                    RequestedBy = "Admin",
                    RequestDate = data.LastRunDate,
                    TotalSize = data.TotalSize,
                    TotalEmissions = Convert.ToDecimal(data.TotalEmissions),
                    CarbonRating = data.CarbonRating,
                    PageData = JsonSerializer.Serialize(data),
                };

                await _pageMetricService.AddPageMetric(pageMetric);
                return Ok(true);
            }

            return Ok(false);
        }
    }
}
#endif
