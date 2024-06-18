using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Community.Sustainability.ContentApps;
using Umbraco.Community.Sustainability.Notifications;
using Umbraco.Community.Sustainability.Sections;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            string value = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            Environment.SetEnvironmentVariable("PLAYWRIGHT_BROWSERS_PATH", $"{value}\\ms-playwright");

            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install", "chromium" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, PageMetricsNotificationHandler>();
            builder.ManifestFilters().Append<SustainabilityManifestFilter>();
            builder.ContentApps().Append<SustainabilityContentApp>();

            builder.Sections().Append<SustainabilitySection>();

            builder.Services.AddScoped<IPageMetricService, PageMetricService>();
            builder.Services.AddSingleton<ISustainabilityService, SustainabilityService>();

            builder.Services.AddOptions<MediaLibraryOptions>().Bind(builder.Config.GetSection(MediaLibraryOptions.SectionAlias));
            builder.Services.AddSingleton<IImageSizeService, ImageSizeService>();
            builder.Services.AddSingleton<IMediaLibraryService, MediaLibraryService>();
            builder.AddNotificationHandler<TreeNodesRenderingNotification, MediaTreeNodeRenderingNotificationHandler>();

        }
    }
}
