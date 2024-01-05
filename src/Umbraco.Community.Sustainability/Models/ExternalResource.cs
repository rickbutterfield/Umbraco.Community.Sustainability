namespace Umbraco.Community.Sustainability.Models
{
    public class ExternalResource
    {
        public string? Url { get; set; }
        public decimal Size { get; set; } = 0;

        public ExternalResource() { }

        public ExternalResource(string url, decimal size)
        {
            Url = url;
            Size = size;
        }
    }
}
