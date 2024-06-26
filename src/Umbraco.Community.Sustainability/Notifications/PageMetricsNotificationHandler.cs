using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.Sustainability.Migrations;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Notifications
{
    public class PageMetricsNotificationHandler : INotificationHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IMigrationPlanExecutor _migrationPlanExecutor;
        private readonly ICoreScopeProvider _coreScopeProvider;
        private readonly IKeyValueService _keyValueService;
        private readonly IRuntimeState _runtimeState;
        private readonly IUserGroupService _userGroupService;

        public PageMetricsNotificationHandler(
            ICoreScopeProvider coreScopeProvider,
            IMigrationPlanExecutor migrationPlanExecutor,
            IKeyValueService keyValueService,
            IRuntimeState runtimeState,
            IUserGroupService userGroupService)
        {
            _migrationPlanExecutor = migrationPlanExecutor;
            _coreScopeProvider = coreScopeProvider;
            _keyValueService = keyValueService;
            _runtimeState = runtimeState;
            _userGroupService = userGroupService;
        }

        public async void Handle(UmbracoApplicationStartingNotification notification)
        {
            if (_runtimeState.Level < RuntimeLevel.Run)
            {
                return;
            }

            // Create a migration plan for a specific project/feature
            // We can then track that latest migration state/step for this project/feature
            var migrationPlan = new MigrationPlan(PageMetric.TableName);

            // This is the steps we need to take
            // Each step in the migration adds a unique value
            migrationPlan.From(string.Empty)
                .To<AddPageMetricsTable>("pagemetrics-init")
                .To<AddCarbonRating>("pagemetrics-carbonrating")
                .To<ChangeNodeIdToNodeKey>("pagemetrics-nodeidtonodekey");

            // Go and upgrade our site (Will check if it needs to do the work or not)
            // Based on the current/latest step
            var upgrader = new Upgrader(migrationPlan);
            upgrader.Execute(
                _migrationPlanExecutor,
                _coreScopeProvider,
                _keyValueService);
            
            var adminGroup = await _userGroupService.GetAsync(Cms.Core.Constants.Security.AdminGroupAlias);
            if (adminGroup != null)
            {
                if (!adminGroup.AllowedSections.Contains(Constants.SectionAlias))
                {
                    adminGroup.AddAllowedSection(Constants.SectionAlias);
                    await _userGroupService.UpdateAsync(adminGroup, Cms.Core.Constants.Security.SuperUserKey);
                }
            }
        }
    }
}
