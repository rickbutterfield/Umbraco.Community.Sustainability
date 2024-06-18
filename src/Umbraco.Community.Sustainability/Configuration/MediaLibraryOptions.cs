namespace Umbraco.Community.Sustainability.Configuration
{
    public class MediaLibraryOptions
    {
        public const string SectionAlias = "Umbraco:CMS:MediaLibrary:Optimisation";

        public bool Enabled { get; set; }
        public Dictionary<string, string> AcceptedFileTypes { get; set; } = new Dictionary<string, string>();
    }
}
