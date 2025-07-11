import { create } from 'zustand'
import { demoSteps } from '~/data/demoScript'

export interface DemoStep {
  id: number
  unibasicCode: string
  csharpCode: string
  explanation: string
  terminalOutput: string
  uiUpdates: {
    customerId?: string
    customerName?: string
    rackPrice?: number
    tax?: number
    total?: number
    inventory?: number
  }
}

interface DemoState {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  formData: {
    customerId: string
    customerName: string
    rackPrice: number
    tax: number
    total: number
    inventory: number
  }
  
  // Actions
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  togglePlay: () => void
  reset: () => void
  
}

export const useDemoStore = create<DemoState>((set, get) => ({
  currentStep: 0,
  totalSteps: demoSteps.length,
  isPlaying: false,
  formData: {
    customerId: '',
    customerName: '',
    rackPrice: 0,
    tax: 0,
    total: 0,
    inventory: 0,
  },

  nextStep: () => {
    set((state) => {
      const { currentStep, totalSteps } = state
      if (currentStep < totalSteps - 1) {
        const newStep = currentStep + 1
        const stepData = demoSteps[newStep]
        
        return {
          ...state,
          currentStep: newStep,
          formData: {
            ...state.formData,
            ...stepData.uiUpdates,
          },
        }
      }
      return state
    })
  },

  previousStep: () => {
    set((state) => {
      const { currentStep } = state
      if (currentStep > 0) {
        const newStep = currentStep - 1
        const stepData = demoSteps[newStep]
        
        return {
          ...state,
          currentStep: newStep,
          formData: {
            ...state.formData,
            ...stepData.uiUpdates,
          },
        }
      }
      return state
    })
  },

  goToStep: (step: number) => {
    set((state) => {
      const { totalSteps } = state
      if (step >= 0 && step < totalSteps) {
        const stepData = demoSteps[step]
        
        return {
          ...state,
          currentStep: step,
          formData: {
            ...state.formData,
            ...stepData.uiUpdates,
          },
        }
      }
      return state
    })
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }))
  },

  reset: () => {
    set({
      currentStep: 0,
      isPlaying: false,
      formData: {
        customerId: '',
        customerName: '',
        rackPrice: 0,
        tax: 0,
        total: 0,
        inventory: 0,
      },
    })
  },
}))

// Auto-play functionality will be handled in the component instead