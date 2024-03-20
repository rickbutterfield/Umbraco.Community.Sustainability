#if NET8_0
using Asp.Versioning;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Common.OpenApi;

namespace Umbraco.Community.Sustainability
{
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");

            options.SwaggerDoc(
                "sustainability",
                new OpenApiInfo
                {
                    Title = "Sustainability API",
                    Version = "Latest",
                    Description = "Umbraco.Community.Sustainability"
                });
        }
    }
}
#endif
