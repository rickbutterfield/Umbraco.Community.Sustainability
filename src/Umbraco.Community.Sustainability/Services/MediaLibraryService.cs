using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IMediaLibraryService
    {
        IPublishedContent? GetMediaLibraryFile(int nodeId);
    }

    public class MediaLibraryService : IMediaLibraryService
    {
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        public MediaLibraryService(IUmbracoContextFactory umbracoContextFactor)
        {
            _umbracoContextFactory = umbracoContextFactor;
        }
        public IPublishedContent? GetMediaLibraryFile(int nodeId)
        {
            using var umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();

            var mediaItem = umbracoContextReference?.UmbracoContext?.Media?.GetById(nodeId);

            return mediaItem ?? null;
        }
    }
}
