using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Migrations
{
    public class AddPageMetricsTable : MigrationBase
    {
        public AddPageMetricsTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddPageMetricsTable");

            if (TableExists(PageMetric.TableName) == false)
            {
                Create.Table<PageMetric>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", PageMetric.TableName);
            }
        }
    }
}
