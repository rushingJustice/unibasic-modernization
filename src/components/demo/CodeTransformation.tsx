import { useEffect, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { useDemoStore } from '~/stores/demoStore'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { demoSteps } from '~/data/demoScript'

export function CodeTransformation() {
  const currentStep = useDemoStore((state) => state.currentStep)
  const currentStepData = demoSteps[currentStep] || null
  const unibasicEditorRef = useRef<any>(null)
  const csharpEditorRef = useRef<any>(null)

  const handleUnibasicEditorMount = (editor: any) => {
    unibasicEditorRef.current = editor
  }

  const handleCsharpEditorMount = (editor: any) => {
    csharpEditorRef.current = editor
  }

  useEffect(() => {
    // Auto-scroll to highlighted code when step changes
    if (unibasicEditorRef.current && csharpEditorRef.current) {
      setTimeout(() => {
        unibasicEditorRef.current.revealLine(1)
        csharpEditorRef.current.revealLine(1)
      }, 100)
    }
  }, [currentStepData])

  if (!currentStepData) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a step to view code transformation
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Explanation Banner */}
      <Card className="mb-3 p-3">
        <div className="flex items-start gap-2">
          <Badge variant="outline" className="shrink-0">
            Explanation
          </Badge>
          <p className="text-sm text-muted-foreground">
            {currentStepData.explanation}
          </p>
        </div>
      </Card>

      {/* Code Editors */}
      <div className="flex flex-1 flex-col gap-2">
        {/* UniBasic Code */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="destructive">Legacy UniBasic</Badge>
          </div>
          <div className="h-full rounded-md border">
            <Editor
              height="100%"
              defaultLanguage="basic"
              value={currentStepData.unibasicCode}
              onMount={handleUnibasicEditorMount}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 12,
                wordWrap: 'on',
                automaticLayout: true,
                theme: 'vs-dark',
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                renderLineHighlight: 'all',
                selectionHighlight: false,
                contextmenu: false,
                links: false,
                hover: {
                  enabled: false,
                },
              }}
            />
          </div>
        </div>

        {/* Arrow Indicator */}
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-px w-8 bg-border" />
            <div className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* C# Code */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="default">Modern C# / EF Core</Badge>
          </div>
          <div className="h-full rounded-md border">
            <Editor
              height="100%"
              defaultLanguage="csharp"
              value={currentStepData.csharpCode}
              onMount={handleCsharpEditorMount}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 12,
                wordWrap: 'on',
                automaticLayout: true,
                theme: 'vs-dark',
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                renderLineHighlight: 'all',
                selectionHighlight: false,
                contextmenu: false,
                links: false,
                hover: {
                  enabled: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}