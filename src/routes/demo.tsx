








import { SimpleDemoContainer } from '~/components/demo/SimpleDemoContainer'

export const Route = createFileRoute({
  component: DemoComponent,
})

function DemoComponent() {
  return (
    <div className="min-h-screen bg-background">
      <SimpleDemoContainer />
    </div>
  )
}