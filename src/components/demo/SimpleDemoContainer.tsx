import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react'
import { useDemoStore } from '~/stores/demoStore'
import { demoSteps } from '~/data/demoScript'
import { SimpleModernUIPreview } from './SimpleModernUIPreview'
// import { EducationalCallouts } from './EducationalCallouts'

export function SimpleDemoContainer() {
  const {
    currentStep,
    totalSteps,
    isPlaying,
    nextStep,
    previousStep,
    togglePlay,
    reset,
  } = useDemoStore()

  // Computed values
  const canGoNext = currentStep < totalSteps - 1
  const canGoPrevious = currentStep > 0
  const currentStepData = demoSteps[currentStep] || null

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              UniBasic to Modern Transformation
            </h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
          
          {/* Demo Controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={previousStep}
              disabled={!canGoPrevious}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={togglePlay}
              variant={isPlaying ? "secondary" : "default"}
              size="sm"
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Play
                </>
              )}
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canGoNext}
              variant="outline"
              size="sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* 3-Pane Layout */}
        <div className="grid h-[calc(100vh-200px)] grid-cols-3 gap-4">
          {/* Pane 1: Legacy Terminal */}
          <Card className="flex flex-col overflow-hidden">
            <div className="border-b bg-muted/50 p-3">
              <h2 className="font-semibold text-foreground">Legacy Terminal</h2>
              <p className="text-sm text-muted-foreground">
                UniBasic Split-Load/BOL Entry
              </p>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <div className="h-full bg-black text-green-400 font-mono text-sm p-4 rounded">
                <pre className="whitespace-pre-wrap">
                  {currentStepData?.terminalOutput || "Loading..."}
                </pre>
              </div>
            </div>
          </Card>

          {/* Pane 2: Code Transformation */}
          <Card className="flex flex-col overflow-hidden">
            <div className="border-b bg-muted/50 p-3">
              <h2 className="font-semibold text-foreground">Code Transformation</h2>
              <p className="text-sm text-muted-foreground">
                UniBasic → Modern C# / EF Core
              </p>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <div className="h-full space-y-4">
                {/* UniBasic Code */}
                <div className="h-1/2">
                  <div className="mb-2 text-sm font-medium text-red-600">Legacy UniBasic</div>
                  <div className="h-full bg-gray-900 text-white font-mono text-sm p-4 rounded overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {currentStepData?.unibasicCode || "Loading..."}
                    </pre>
                  </div>
                </div>

                {/* C# Code */}
                <div className="h-1/2">
                  <div className="mb-2 text-sm font-medium text-blue-600">Modern C# / EF Core</div>
                  <div className="h-full bg-gray-900 text-white font-mono text-sm p-4 rounded overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {currentStepData?.csharpCode || "Loading..."}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Pane 3: Modern UI Preview */}
          <Card className="flex flex-col overflow-hidden">
            <div className="border-b bg-muted/50 p-3">
              <h2 className="font-semibold text-foreground">Modern UI</h2>
              <p className="text-sm text-muted-foreground">
                Live React Form & Calculations
              </p>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <SimpleModernUIPreview />
            </div>
          </Card>
        </div>

        {/* Educational Callouts */}
        {currentStepData && (
          <div className="mt-4">
            <Card className="p-4 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-background">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    Step {currentStep + 1} Explanation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentStepData.explanation}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}