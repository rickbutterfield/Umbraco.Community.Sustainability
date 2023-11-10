using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Models.Membership;

namespace Umbraco.Community.Sustainability.ContentApps
{
    public class SustainabilityContentApp : IContentAppFactory
    {
        public ContentApp? GetContentAppFor(object source, IEnumerable<IReadOnlyUserGroup> userGroups)
        {
            // Only show app on content items
            if (!(source is IContent))
                return null;

            var content = (IContent)source;

            // Only show app on content items with template
            if (content.TemplateId is null)
                return null;

            return new ContentApp
            {
                Alias = "sustainabilityCheck",
                Name = "Emissions",
                Icon = "icon-flowerpot",
                View = "/App_Plugins/Umbraco.Community.Sustainability/views/sustainability-check.html",
                Weight = 0
            };
        }
    }
}
