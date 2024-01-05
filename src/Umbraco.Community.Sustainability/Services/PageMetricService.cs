using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IPageMetricService
    {
        IEnumerable<PageMetric> GetPageMetrics(int pageId);
        void AddPageMetric(PageMetric pageMetric);
    }

    public class PageMetricService : IPageMetricService
    {
        private readonly IScopeProvider _scopeProvider;

        public PageMetricService(IScopeProvider scopeProvider)
        {
            _scopeProvider = scopeProvider;
        }

        public IEnumerable<PageMetric> GetPageMetrics(int pageId)
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = scope.Database.Fetch<PageMetric>($"SELECT * FROM {PageMetric.TableName} WHERE NodeId = @0", pageId);
            scope.Complete();

            return queryResults;
        }

        public void AddPageMetric(PageMetric pageMetric)
        {
            using var scope = _scopeProvider.CreateScope();
            scope.Database.Insert(pageMetric);
            scope.Complete();
        }
    }
}
