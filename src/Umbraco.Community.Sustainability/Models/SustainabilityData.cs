namespace Umbraco.Community.Sustainability.Models
{
    public record SustainabilityData
    {
        public int pageWeight { get; set; }
        public string carbonRating { get; set; }
        public Emissions emissions { get; set; }
        public Resource[] resources { get; set; }
    }

    public record Emissions
    {
        public float co2 { get; set; }
        public bool green { get; set; }
        public Variables variables { get; set; }
    }

    public record Variables
    {
        public string description { get; set; }
        public int bytes { get; set; }
        public Gridintensity gridIntensity { get; set; }
        public float dataReloadRatio { get; set; }
        public float firstVisitPercentage { get; set; }
        public float returnVisitPercentage { get; set; }
    }

    public record Gridintensity
    {
        public string description { get; set; }
        public float network { get; set; }
        public float dataCenter { get; set; }
        public float production { get; set; }
        public float device { get; set; }
    }

    public record Resource
    {
        public string name { get; set; }
        public string entryType { get; set; }
        public float startTime { get; set; }
        public float duration { get; set; }
        public string initiatorType { get; set; }
        public string deliveryType { get; set; }
        public string nextHopProtocol { get; set; }
        public string renderBlockingStatus { get; set; }
        public int workerStart { get; set; }
        public int redirectStart { get; set; }
        public int redirectEnd { get; set; }
        public float fetchStart { get; set; }
        public float domainLookupStart { get; set; }
        public float domainLookupEnd { get; set; }
        public float connectStart { get; set; }
        public float secureConnectionStart { get; set; }
        public float connectEnd { get; set; }
        public float requestStart { get; set; }
        public float responseStart { get; set; }
        public int firstInterimResponseStart { get; set; }
        public float responseEnd { get; set; }
        public int transferSize { get; set; }
        public int encodedBodySize { get; set; }
        public int decodedBodySize { get; set; }
        public int responseStatus { get; set; }
        public object[] serverTiming { get; set; }
    }
}
