#if NET8_0
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Cms.Api.Common.Attributes;

namespace Umbraco.Community.Sustainability.Controllers
{
    [ApiController]
    [BackOfficeRoute("sustainability/api/v{version:apiVersion}")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [MapToApi("sustainability")]
    public class SustainabilityWorkspaceControllerBase : Controller
    { }
}
#endif
