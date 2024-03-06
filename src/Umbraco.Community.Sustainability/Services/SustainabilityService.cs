using System.Reflection;
using System.Text.Json;
using Microsoft.Playwright;
using Umbraco.Community.Sustainability.Models;

namespace Umbraco.Community.Sustainability.Services
{
    public interface ISustainabilityService
    {
        Task<SustainabilityResponse> GetSustainabilityData(string url);
    }

    public class SustainabilityService : ISustainabilityService
    {
        public async Task<SustainabilityResponse> GetSustainabilityData(string url)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions() { Headless = true });

            // Create a new incognito browser context and go to web page
            var context = await browser.NewContextAsync();
            var page = await context.NewPageAsync();
            await page.GotoAsync(url, new PageGotoOptions()
            {
                WaitUntil = WaitUntilState.DOMContentLoaded
            });

            // Add our script to report data
            await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Url = "/App_Plugins/Umbraco.Community.Sustainability/js/resource-checker.js",
                Type = "module"
            });

            // Retrieve data from page
            var data = await page.GetByTestId("sustainabilityData").TextContentAsync();
            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityData>(data);

            var resourceGroups = new List<ExternalResourceGroup>();
            foreach (ResourceGroupType resourceGroupType in Enum.GetValues(typeof(ResourceGroupType)))
            {
                var resources = GetExternalResourceGroup(resourceGroupType, sustainabilityData.resources);
                resourceGroups.Add(resources);
            }

            await browser.CloseAsync();

            return new SustainabilityResponse()
            {
                TotalSize = sustainabilityData.pageWeight,
                TotalEmissions = sustainabilityData.emissions.co2,
                CarbonRating = sustainabilityData.carbonRating,
                ResourceGroups = resourceGroups
            };
        }

        private ExternalResourceGroup GetExternalResourceGroup(ResourceGroupType groupType, IList<Resource> resources)
        {
            var initiator = ExternalResourceGroup.GetInitiatorType(groupType);
            var resourcesByType = resources.Where(x => x.initiatorType.Equals(initiator) && x.transferSize > 0);

            var transferSize = 0;
            var resourceList = new List<ExternalResource>();
            foreach (var resource in resourcesByType.OrderByDescending(x => x.transferSize))
            {
                transferSize += resource.transferSize;
                resourceList.Add(new ExternalResource(resource.name, resource.transferSize));
            }

            return new ExternalResourceGroup(groupType)
            {
                TotalSize = transferSize,
                Resources = resourceList
            };
        }
    }
}
