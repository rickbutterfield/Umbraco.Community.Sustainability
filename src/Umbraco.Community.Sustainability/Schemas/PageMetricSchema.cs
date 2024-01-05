using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.Sustainability.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class PageMetric
    {
        public const string TableName = "umbPageMetrics";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("NodeId")]
        public int NodeId { get; set; }

        [Column("RequestedBy")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? RequestedBy { get; set; }

        [Column("RequestDate")]
        public DateTime RequestDate { get; set; }

        [Column("TotalSize")]
        public decimal TotalSize { get; set; }

        [Column("TotalEmissions")]
        public decimal TotalEmissions { get; set; }

        [Column("CarbonRating")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CarbonRating { get; set; }

        [Column("PageData")]
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string? PageData { get; set; }
    }
}
