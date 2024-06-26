using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.Sustainability.Models;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Services
{
    public interface IPageMetricService
    {
        Task<IEnumerable<PageMetric>> GetOverviewMetrics();
        Task<AveragePageMetrics> GetAverageMetrics();
        Task<IEnumerable<PageMetric>> GetPageMetrics(Guid pageKey);
        Task AddPageMetric(PageMetric pageMetric);
    }

    public class PageMetricService : IPageMetricService
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly IPublishedContentQuery _contentQuery;

        public PageMetricService(
            IScopeProvider scopeProvider,
            IPublishedContentQuery contentQuery)
        {
            _scopeProvider = scopeProvider;
            _contentQuery = contentQuery;
        }

        public async Task<IEnumerable<PageMetric>> GetOverviewMetrics()
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = await scope.Database.FetchAsync<PageMetric>();

            queryResults = queryResults.OrderByDescending(x => x.RequestDate).ToList();
            queryResults = queryResults.DistinctBy(x => x.NodeKey).ToList();

            foreach (var result in queryResults)
            {
                var node = _contentQuery.Content(result.NodeKey);
                result.NodeName = node?.Name;
            }

            scope.Complete();

            return queryResults;
        }

        public async Task<AveragePageMetrics> GetAverageMetrics()
        {
            var overviewMetrics = await GetOverviewMetrics();

            if (overviewMetrics.Any())
            {
                return new AveragePageMetrics()
                {
                    PageSize = overviewMetrics.Sum(x => x.TotalSize) / overviewMetrics.Count(),
                    Emissions = overviewMetrics.Sum(x => x.TotalEmissions) / overviewMetrics.Count(),
                };
            }

            return new();
        }

        public async Task<IEnumerable<PageMetric>> GetPageMetrics(Guid pageKey)
        {
            using var scope = _scopeProvider.CreateScope();
            var queryResults = await scope.Database.FetchAsync<PageMetric>($"SELECT * FROM {PageMetric.TableName} WHERE NodeKey = @0", pageKey);
            scope.Complete();

            return queryResults;
        }

        public async Task AddPageMetric(PageMetric pageMetric)
        {
            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertAsync(pageMetric);
            scope.Complete();
        }
    }
}
