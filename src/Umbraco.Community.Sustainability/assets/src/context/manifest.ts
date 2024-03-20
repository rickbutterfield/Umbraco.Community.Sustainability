import { ManifestGlobalContext } from '@umbraco-cms/backoffice/extension-registry';

const contexts: Array<ManifestGlobalContext> = [
  {
    type: 'globalContext',
    alias: 'sustainability.context',
    name: 'Sustainability context',
    js: () => import('./sustainability.context.ts')
  }
]

export const manifests = [...contexts];