using Umbraco.Cms.Core.Manifest;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityManifestFilter : IManifestFilter
    {
        public void Filter(List<PackageManifest> manifests)
        {
            var assembly = typeof(SustainabilityManifestFilter).Assembly;

            manifests.Add(new PackageManifest
            {
                PackageName = "Umbraco.Community.Sustainability",
                Version = assembly.GetName()?.Version?.ToString(3) ?? "0.1.0",
                AllowPackageTelemetry = true,
                Scripts = new string[] {
                    // List any Script files
                    // Urls should start '/App_Plugins/UmbracoCommunitySustainability/' not '/wwwroot/UmbracoCommunitySustainability/', e.g.
                    "/App_Plugins/UmbracoCommunitySustainability/js/sustainability.resource.js",
                    "/App_Plugins/UmbracoCommunitySustainability/js/sustainability-stats.controller.js",
                    "/App_Plugins/UmbracoCommunitySustainability/js/sustainability-overview.controller.js",
                    "/App_Plugins/UmbracoCommunitySustainability/js/sustainability-content-app.controller.js"
                },
                Stylesheets = new string[]
                {
                    // List any Stylesheet files
                    // Urls should start '/App_Plugins/UmbracoCommunitySustainability/' not '/wwwroot/Umbraco.Community.Sustainability/', e.g.
                     "/App_Plugins/UmbracoCommunitySustainability/Styles/medialibrary.css"
                }
            });
        }
    }
}
