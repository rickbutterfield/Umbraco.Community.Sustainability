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
            await page.GotoAsync(url);

            // Add our script to report data
            await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Path = "./App_Plugins/Umbraco.Community.Sustainability/js/resource-checker.js",
                Type = "module"
            });

            // Retrieve data from page
            var data = await page.GetByTestId("sustainabilityData").TextContentAsync();
            var sustainabilityData = JsonSerializer.Deserialize<SustainabilityData>(data);

            var resourceGroups = new List<ExternalResourceGroup>();

            var scripts = GetExternalResourceGroup(ResourceGroupType.Scripts, sustainabilityData.resources);
            resourceGroups.Add(scripts);

            var images = GetExternalResourceGroup(ResourceGroupType.Images, sustainabilityData.resources);
            resourceGroups.Add(images);

            var styles = GetExternalResourceGroup(ResourceGroupType.Styles, sustainabilityData.resources);
            resourceGroups.Add(styles);

            var other = GetExternalResourceGroup(ResourceGroupType.Other, sustainabilityData.resources);
            resourceGroups.Add(other);

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
            var resourcesByType = resources.Where(x => x.initiatorType.Equals(initiator));

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
