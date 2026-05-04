import { defineConfig, useDocumentOperation } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { DocumentActionComponent } from 'sanity'
import { schemaTypes } from '@/sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const ForcePublishAction: DocumentActionComponent = (props) => {
  const ops = useDocumentOperation(props.id, props.type)
  return {
    disabled: ['LIVE_EDIT_ENABLED', 'NOT_READY'].includes(ops.publish.disabled as string),
    label: 'Publish',
    tone: 'positive',
    onHandle: () => {
      if (ops.publish.disabled === false) {
        ops.publish.execute()
      }
      props.onComplete()
    },
  }
}
ForcePublishAction.action = 'publish'
ForcePublishAction.displayName = 'PublishAction'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  releases: { enabled: false },
  document: {
    actions: (prev) => {
      const withoutPublish = prev.filter((a) => a.action !== 'publish')
      return [ForcePublishAction, ...withoutPublish]
    }
  }
})
