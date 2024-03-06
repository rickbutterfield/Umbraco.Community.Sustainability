using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Umbraco.Community.Sustainability.Extensions;

namespace Umbraco.Community.Sustainability.Models
{
    public class ExternalResourceGroup
    {
        [JsonProperty("type")]
        public ResourceGroupType Type { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("totalSize")]
        public decimal TotalSize { get; set; } = 0;

        [JsonProperty("resources")]
        public List<ExternalResource>? Resources { get; set; } = new List<ExternalResource>();

        public ExternalResourceGroup() { }
        public ExternalResourceGroup(ResourceGroupType type)
        {
            Type = type;
            Name = type.GetDisplayName();
        }

        public static string GetInitiatorType(ResourceGroupType groupType)
        {
            return groupType switch
            {
                ResourceGroupType.Images => "img",
                ResourceGroupType.Scripts => "script",
                ResourceGroupType.Links => "link",
                ResourceGroupType.Css => "css",
                ResourceGroupType.Other => "other",
                _ => string.Empty,
            };
        }
    }

    public enum ResourceGroupType
    {
        [Display(Name = "Images")]
        Images,
        [Display(Name = "Scripts")]
        Scripts,
        [Display(Name = "Links")]
        Links,
        [Display(Name = "Css")]
        Css,
        [Display(Name = "Other")]
        Other
    }
}
