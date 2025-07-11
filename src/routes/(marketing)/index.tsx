import {  Link } from '@tanstack/react-router'
import GradientOrb from "~/components/gradient-orb"
import { Button } from "~/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export const Route = createFileRoute({
    component: RouteComponent
})

function RouteComponent() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Hero Section */}
            <main className="container relative z-0 mx-auto flex flex-col items-center px-4 pt-20 text-center md:pt-32">
                <GradientOrb className="-translate-x-1/2 absolute top-0 left-1/2 z-[-1] transform" />

                <h1 className="max-w-4xl font-medium text-4xl text-foreground md:text-6xl lg:text-7xl">
                    UniBasic to Modern
                    <br />
                    <span className="text-primary">Transformation Demo</span>
                </h1>

                <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                    See how legacy UniBasic code transforms into modern .NET + SQL implementations
                </p>

                <div className="mt-8 flex gap-4">
                    <Button asChild size="lg" className="gap-2">
                        <Link to="/demo">
                            <Play className="h-4 w-4" />
                            Start Demo
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-2">
                        <Link to="/docs">
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <p className="mt-6 text-muted-foreground text-xs uppercase tracking-wider">
                    Interactive 3-minute presentation
                </p>
            </main>
        </div>
    )
}
