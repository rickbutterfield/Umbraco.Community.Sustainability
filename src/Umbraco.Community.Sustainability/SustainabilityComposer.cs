using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Notifications;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, PageMetricsNotificationHandler>();

            builder.Services.AddScoped<IPageMetricService, PageMetricService>();
            builder.Services.AddSingleton<ISustainabilityService, SustainabilityService>();

            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }
}
