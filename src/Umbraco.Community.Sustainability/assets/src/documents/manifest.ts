import { ManifestWorkspaceView } from "@umbraco-cms/backoffice/extension-registry";

const workspaceView: ManifestWorkspaceView = {
  type: 'workspaceView',
  alias: 'Umbraco.Community.Sustainability.Workspace',
  name: 'Sustainability Workspace',
  js: () => import('./views/sustainability-workspace-view.js'),
  weight: 10,
  meta: {
    icon: 'icon-eco',
    pathname: 'sustainability',
    label: 'Sustainability'
  },
  conditions: [
    {
      alias: 'Umb.Condition.WorkspaceAlias',
      match: 'Umb.Workspace.Document'
    },
  ]
}

export const manifests = [workspaceView];
