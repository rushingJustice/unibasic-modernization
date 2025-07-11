import { useDemoStore } from '~/stores/demoStore'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { 
  Shield, 
  TestTube, 
  Zap, 
  Database, 
  GitBranch, 
  Users
} from 'lucide-react'

const educationalCallouts = [
  {
    stepId: 1,
    title: "Repository Pattern",
    icon: Database,
    description: "Replaces direct file reads with structured data access, enabling better testing and maintainability.",
    benefits: ["Type safety", "Easy mocking", "Consistent error handling"]
  },
  {
    stepId: 2,
    title: "Service Layer",
    icon: TestTube,
    description: "Isolates business logic into testable services with dependency injection.",
    benefits: ["Unit testable", "Reusable", "Maintainable"]
  },
  {
    stepId: 3,
    title: "Rule Isolation",
    icon: Shield,
    description: "Tax calculation logic is isolated in a service, making it unit-testable and configurable.",
    benefits: ["Easy to test", "Configurable", "Auditable"]
  },
  {
    stepId: 4,
    title: "Real-time Updates",
    icon: Zap,
    description: "Modern UI provides instant feedback without manual refresh commands.",
    benefits: ["Better UX", "Immediate validation", "Error prevention"]
  },
  {
    stepId: 5,
    title: "Data Integrity",
    icon: Shield,
    description: "SQL transactions ensure data consistency and prevent corruption.",
    benefits: ["ACID compliance", "Rollback on errors", "Consistent state"]
  },
  {
    stepId: 6,
    title: "Event-Driven Architecture",
    icon: GitBranch,
    description: "Inventory updates are tracked as events, providing full audit trails.",
    benefits: ["Audit trail", "Event sourcing", "Scalable"]
  },
  {
    stepId: 7,
    title: "Modern Document Generation",
    icon: Users,
    description: "Professional PDF generation with digital signatures and automated delivery.",
    benefits: ["Professional output", "Digital signatures", "Automated distribution"]
  }
]

export function EducationalCallouts() {
  const currentStep = useDemoStore((state) => state.currentStep)
  
  const currentCallout = educationalCallouts.find(callout => 
    callout.stepId === currentStep
  )

  if (!currentCallout) return null

  const Icon = currentCallout.icon

  return (
    <Card className="p-4 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-background">
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-full bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-foreground">{currentCallout.title}</h4>
            <Badge variant="secondary" className="text-xs">
              Best Practice
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {currentCallout.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {currentCallout.benefits.map((benefit, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
              >
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}