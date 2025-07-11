import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useDemoStore } from '~/stores/demoStore'
import { demoSteps } from '~/data/demoScript'
import 'xterm/css/xterm.css'

export function LegacyTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<Terminal | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)
  const currentStep = useDemoStore((state) => state.currentStep)
  const currentStepData = demoSteps[currentStep] || null

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize terminal
    terminal.current = new Terminal({
      cursorBlink: true,
      fontSize: 12,
      fontFamily: 'Monaco, "Cascadia Code", "Fira Code", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#ffffff',
      },
      cols: 80,
      rows: 24,
    })

    fitAddon.current = new FitAddon()
    terminal.current.loadAddon(fitAddon.current)
    terminal.current.open(terminalRef.current)

    // Initial terminal content
    terminal.current.writeln('UniBasic Terminal - Split-Load/BOL Entry System')
    terminal.current.writeln('================================================')
    terminal.current.writeln('')

    // Fit terminal to container
    setTimeout(() => {
      fitAddon.current?.fit()
    }, 100)

    // Handle resize
    const handleResize = () => {
      setTimeout(() => {
        fitAddon.current?.fit()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      terminal.current?.dispose()
    }
  }, [])

  useEffect(() => {
    if (!terminal.current || !currentStepData) return

    // Clear terminal and show current step output
    terminal.current.clear()
    terminal.current.writeln('UniBasic Terminal - Split-Load/BOL Entry System')
    terminal.current.writeln('================================================')
    terminal.current.writeln('')

    // Animate terminal output
    const lines = currentStepData.terminalOutput.split('\n')
    let lineIndex = 0

    const typeNextLine = () => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex]
        let charIndex = 0

        const typeChar = () => {
          if (charIndex < line.length) {
            terminal.current?.write(line[charIndex])
            charIndex++
            setTimeout(typeChar, 20) // Typing speed
          } else {
            terminal.current?.writeln('')
            lineIndex++
            setTimeout(typeNextLine, 200) // Pause between lines
          }
        }

        typeChar()
      } else {
        // Add blinking cursor at the end
        terminal.current?.write('\r\n$ ')
      }
    }

    typeNextLine()
  }, [currentStep, currentStepData])

  return (
    <div className="h-full w-full bg-[#1e1e1e] p-2">
      <div
        ref={terminalRef}
        className="h-full w-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}