using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability.Notifications
{
    public class MediaTreeNodeRenderingNotificationHandler : INotificationHandler<TreeNodesRenderingNotification>
    {
        private readonly ILogger<MediaTreeNodeRenderingNotificationHandler> _logger;
        private readonly IImageSizeService _imageSizeService;
        private readonly IMediaLibraryService _mediaLibraryService;

        public MediaTreeNodeRenderingNotificationHandler(ILogger<MediaTreeNodeRenderingNotificationHandler> logger,
            IImageSizeService imageService, IMediaLibraryService mediaLibraryService)
        {
            _logger = logger;
            _imageSizeService = imageService;
            _mediaLibraryService = mediaLibraryService;
        }

        public void Handle(TreeNodesRenderingNotification notification)
        {
            if (notification.TreeAlias == Cms.Core.Constants.Trees.Media)
            {
                foreach (var node in notification.Nodes)
                {
                    int.TryParse(node?.Id?.ToString(), out int nodeId);

                    if (nodeId > 0)
                    {
                        var mediaItem = _mediaLibraryService.GetMediaLibraryFile(nodeId);

                        if (mediaItem == null)
                        {
                            continue;
                        }

                        var acceptedFileType = _imageSizeService.AcceptedFileExtension(mediaItem);
                        if (!acceptedFileType)
                        {
                            continue;
                        }

                        var acceptedFileSize = _imageSizeService.AcceptedFileSize(mediaItem);
                        if (!acceptedFileSize)
                        {
                            node.CssClasses.Add("image-size-css");
                            node.Icon = "icon-thumb-down";
                            _logger.LogWarning($"Image Size Warning: Node Id: {node.Id} || Node Name: {node.Name}");
                        }
                    }
                }
            }
        }
    }
}
