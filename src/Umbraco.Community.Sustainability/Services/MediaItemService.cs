using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Extensions;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IImageSizeService
    {
        bool AcceptedFileSize(IPublishedContent content);
        bool AcceptedFileExtension(IPublishedContent content);
    }
    public class ImageSizeService : IImageSizeService
    {
        private readonly ILogger<ImageSizeService> _logger;
        private readonly IOptions<MediaLibraryOptions> _settings;

        public ImageSizeService(ILogger<ImageSizeService> logger, IOptions<MediaLibraryOptions> settings)
        {
            _logger = logger;
            _settings = settings;
        }

        public bool AcceptedFileExtension(IPublishedContent content)
        {
            try
            {
                var fileTypes = _settings.Value.AcceptedFileTypes;

                return fileTypes.Any(x => x.Key.ToLowerInvariant() == content.ContentType.Alias.ToLowerInvariant());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public bool AcceptedFileSize(IPublishedContent content)
        {
            try
            {
                var imageSize = content.Value<int>("umbracoBytes");
                var fileTypes = _settings.Value.AcceptedFileTypes;
                var acceptedFileSize = fileTypes.Where(x => x.Key.ToLowerInvariant() == content.ContentType.Alias.ToLowerInvariant()).FirstOrDefault();

                if (acceptedFileSize.Equals(default(KeyValuePair<string, string>)))
                {
                    return false;
                }

                long maxAcceptedFileSize = (long)Convert.ToDouble(acceptedFileSize.Value);

                if (imageSize >= maxAcceptedFileSize)
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }
    }
}
