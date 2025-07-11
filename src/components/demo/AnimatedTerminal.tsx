import { useEffect, useState, useRef } from 'react'
import { useDemoStore } from '~/stores/demoStore'
import { demoSteps } from '~/data/demoScript'

export function AnimatedTerminal() {
  const currentStep = useDemoStore((state) => state.currentStep)
  const currentStepData = demoSteps[currentStep] || null
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const previousStepRef = useRef(-1)

  useEffect(() => {
    if (!currentStepData) return

    // Check if we're moving to the next step or going back
    const isMovingForward = currentStep > previousStepRef.current
    const isMovingBackward = currentStep < previousStepRef.current
    
    if (isMovingBackward) {
      // If going backward, immediately show the target step's output
      setDisplayedText(currentStepData.terminalOutput)
      setIsTyping(false)
      previousStepRef.current = currentStep
      return
    }

    if (isMovingForward) {
      // If moving forward, continue typing from previous content
      const previousText = displayedText
      const newContent = currentStepData.terminalOutput
      
      // If the new content includes the previous content, just type the new part
      if (newContent.startsWith(previousText)) {
        const newPart = newContent.slice(previousText.length)
        if (newPart.length > 0) {
          setIsTyping(true)
          let currentIndex = 0
          
          const typeInterval = setInterval(() => {
            if (currentIndex < newPart.length) {
              setDisplayedText(previousText + newPart.slice(0, currentIndex + 1))
              currentIndex++
            } else {
              setIsTyping(false)
              clearInterval(typeInterval)
            }
          }, 30) // Typing speed
          
          previousStepRef.current = currentStep
          return () => clearInterval(typeInterval)
        }
      } else {
        // If content doesn't build on previous, type the whole thing
        setIsTyping(true)
        setDisplayedText('')
        
        let currentIndex = 0
        const typeInterval = setInterval(() => {
          if (currentIndex < newContent.length) {
            setDisplayedText(newContent.slice(0, currentIndex + 1))
            currentIndex++
          } else {
            setIsTyping(false)
            clearInterval(typeInterval)
          }
        }, 30)
        
        previousStepRef.current = currentStep
        return () => clearInterval(typeInterval)
      }
    }
    
    previousStepRef.current = currentStep
  }, [currentStep, currentStepData])

  return (
    <div className="relative h-full">
      <div className="h-full bg-black text-green-400 font-mono text-xs sm:text-sm p-2 sm:p-4 rounded overflow-y-auto">
        <pre className="whitespace-pre-wrap">
          {displayedText}
          {isTyping && <span className="animate-pulse">█</span>}
        </pre>
      </div>
    </div>
  )
}