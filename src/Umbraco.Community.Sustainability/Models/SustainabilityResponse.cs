namespace Umbraco.Community.Sustainability.Models
{
    public class SustainabilityResponse
    {
        public decimal TotalSize { get; set; } = 0;
        public float TotalEmissions { get; set; } = 0;
        public string CarbonRating { get; set; }
        public List<ExternalResourceGroup>? ResourceGroups { get; set; }
    }
}