import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react'
import { useDemoStore } from '~/stores/demoStore'
import { demoSteps } from '~/data/demoScript'
import { AnimatedTerminal } from './AnimatedTerminal'
import { AnimatedModernUI } from './AnimatedModernUI'

export function SimpleDemoContainer() {
  const {
    currentStep,
    totalSteps,
    nextStep,
    previousStep,
    reset,
  } = useDemoStore()

  // Computed values
  const canGoNext = currentStep < totalSteps - 1
  const canGoPrevious = currentStep > 0
  const currentStepData = demoSteps[currentStep] || null

  // Animation state
  const [isTyping, setIsTyping] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-semibold">
              UniBasic Modernizer
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Demo Content */}
      <div className="p-2 sm:p-4">
        <div className="mx-auto max-w-7xl">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">
              UniBasic to Modern Transformation
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Step {currentStep + 1} of {totalSteps}
            </p>
            
            {/* Explanation below step counter */}
            {currentStepData && (
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {currentStepData.explanation}
                </p>
              </div>
            )}
          </div>
          
          {/* Demo Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
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
        <div className="mb-4 sm:mb-6 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* 3-Pane Layout */}
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {/* Pane 1: Legacy Terminal */}
          <Card className="flex flex-col border-2 border-red-200 dark:border-red-800 shadow-lg shadow-red-100 dark:shadow-red-900/50 lg:col-span-1 md:col-span-1">
            <div className="border-b bg-red-50 dark:bg-red-950/50 p-3">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-semibold rounded">
                  LEGACY USER INTERFACE
                </div>
              </div>
              <h2 className="font-semibold text-foreground mt-2 text-sm sm:text-base">Legacy Terminal</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                How users interact with UniBasic systems
              </p>
            </div>
            <div className="flex-1 p-2 sm:p-4">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] overflow-y-auto">
                <AnimatedTerminal />
              </div>
            </div>
          </Card>

          {/* Pane 2: Code Transformation */}
          <Card className="flex flex-col lg:col-span-1 md:col-span-1">
            <div className="border-b bg-muted/50 p-3">
              <h2 className="font-semibold text-foreground text-sm sm:text-base">Code Transformation</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                UniBasic → Modern C# / EF Core
              </p>
            </div>
            <div className="flex-1 p-2 sm:p-4">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] space-y-2 sm:space-y-4">
                {/* UniBasic Code */}
                <div className="h-[45%]">
                  <div className="mb-2 text-xs sm:text-sm font-medium text-red-600">Legacy UniBasic</div>
                  <div className="h-full bg-gray-900 text-white font-mono text-xs sm:text-sm p-2 sm:p-4 rounded overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {currentStepData?.unibasicCode || "Loading..."}
                    </pre>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex justify-center py-1 h-[10%]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <div className="h-px w-4 sm:w-8 bg-border" />
                    <span className="hidden sm:inline">transforms to</span>
                    <div className="h-px w-4 sm:w-8 bg-border" />
                  </div>
                </div>

                {/* C# Code */}
                <div className="h-[45%]">
                  <div className="mb-2 text-xs sm:text-sm font-medium text-green-600">Modern C# / EF Core</div>
                  <div className="h-full bg-gray-900 text-white font-mono text-xs sm:text-sm p-2 sm:p-4 rounded overflow-auto">
                    <pre className="whitespace-pre-wrap">
                      {currentStepData?.csharpCode || "Loading..."}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Pane 3: Modern UI Preview */}
          <Card className="flex flex-col border-2 border-green-200 dark:border-green-800 shadow-lg shadow-green-100 dark:shadow-green-900/50 lg:col-span-1 md:col-span-2">
            <div className="border-b bg-green-50 dark:bg-green-950/50 p-3">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold rounded">
                  MODERN USER INTERFACE
                </div>
              </div>
              <h2 className="font-semibold text-foreground mt-2 text-sm sm:text-base">Modern UI</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                How users interact with modern systems
              </p>
            </div>
            <div className="flex-1 p-2 sm:p-4">
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] overflow-y-auto">
                <AnimatedModernUI />
              </div>
            </div>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}