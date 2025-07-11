import { useDemoStore } from '~/stores/demoStore'
import { Button } from '~/components/ui/button'

export function SimpleDemoTest() {
  const currentStep = useDemoStore((state) => state.currentStep)
  const totalSteps = useDemoStore((state) => state.totalSteps)
  const nextStep = useDemoStore((state) => state.nextStep)
  const previousStep = useDemoStore((state) => state.previousStep)
  const reset = useDemoStore((state) => state.reset)
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Demo Test</h1>
      <p className="mb-4">Current Step: {currentStep + 1} of {totalSteps}</p>
      
      <div className="flex gap-4">
        <Button onClick={previousStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep >= totalSteps - 1}>
          Next
        </Button>
        <Button onClick={reset} variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}