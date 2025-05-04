import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Music,
  Terminal,
  Mail,
  Code,
  FileText,
  Shield,
  Globe,
  Workflow,
  ImageIcon,
  Youtube,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Workflow className="h-6 w-6" />
            <span>AI-Next</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#workflows" className="text-sm font-medium hover:text-primary">
              Workflows
            </Link>
            <Link href="#agents" className="text-sm font-medium hover:text-primary">
              Agents
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-16">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Intelligent AI Agents for Your Next Project
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Supercharge your productivity with AI-Next's powerful agents and intelligent workflows.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/chat" className="gap-1.5 text-white shadow-md px-3 rounded-md flex items-center font-semibold bg-black">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Free tier available</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                  <Image
                    src="/generated-1745666779204.png"
                    alt="AI-Next Platform"
                    width={600}
                    height={600}
                    className="object-cover rounded-md object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflows Section */}
        <section id="workflows" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold">
                  <Workflow className="mr-2 h-4 w-4" />
                  Intelligent Workflows
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Smart Sequences for Intelligent Task Execution
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Workflows define the smart sequences of steps or actions that agents and tools perform to achieve a
                  specific goal, ensuring seamless and intelligent task execution.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/Screenshot 2025-04-27 140058.png"
                width={500}
                height={400}
                alt="Workflow Diagram"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Define</h3>
                      <p className="text-muted-foreground">
                        Create custom workflows tailored to your specific needs and goals.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Automate</h3>
                      <p className="text-muted-foreground">
                        Let AI agents handle repetitive tasks while you focus on what matters.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Optimize</h3>
                      <p className="text-muted-foreground">
                        Continuously improve your workflows with AI-driven insights and recommendations.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Section */}
        <section id="agents" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet Our Agents</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Powerful AI agents designed to handle specific tasks and boost your productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl pt-8">
              <AgentCard
                icon={<Music className="h-8 w-8" />}
                title="Music Agent"
                description="Your personal DJ and music expert. This agent handles music-related tasks, recommendations, and interactions with music services."
              />
              <AgentCard
                icon={<Terminal className="h-8 w-8" />}
                title="Shell Command Agent"
                description="A cautious yet powerful assistant for Windows shell commands. It safely generates and executes shell operations on your behalf."
              />
              <AgentCard
                icon={<Mail className="h-8 w-8" />}
                title="Email Agent"
                description="Simplify your communications. The Email Agent drafts and sends professional emails while generating recent content through smart web searches."
              />
              <AgentCard
                icon={<Code className="h-8 w-8" />}
                title="Next.js Coding Agent"
                description="A senior-level Next.js developer in your pocket. This agent manages your files, routes, components, and code quality."
              />
              <AgentCard
                icon={<FileText className="h-8 w-8" />}
                title="Docs Agent"
                description="Master developer documentation effortlessly. This agent scrapes, organizes, and understands complex documentation sites."
              />
              <AgentCard
                icon={<Shield className="h-8 w-8" />}
                title="Phishing Detector Agent"
                description="Stay safe online. This cybersecurity agent detects phishing links by analyzing URLs for suspicious patterns and domain reputation."
              />
              <AgentCard
                icon={<Globe className="h-8 w-8" />}
                title="Browser Automation Agent"
                description="Automate your browsing experience. This agent can visit websites, scroll through pages, and interact dynamically."
              />
              <AgentCard
                icon={<Workflow className="h-8 w-8" />}
                title="Web Scraper Agent"
                description="Professional-grade web data extraction at your service. This agent scrapes dynamic and static content efficiently."
              />
              <AgentCard
                icon={<ImageIcon className="h-8 w-8" />}
                title="Image Generation Agent"
                description="Bring your creative ideas to life. This agent uses the powerful Gemini image model to generate stunning visuals based on your prompts."
              />
              <AgentCard
                icon={<Youtube className="h-8 w-8" />}
                title="YouTube Player Agent"
                description="Enjoy YouTube hands-free. This assistant opens, plays, and navigates YouTube videos for you through smart browser automation."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of developers and businesses already using AI-Next to supercharge their productivity.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <Workflow className="h-5 w-5" />
            <span>AI-Next</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AI-Next. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface AgentCardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function AgentCard({ icon, title, description }: AgentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="mb-2 text-primary">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardDescription className="line-clamp-4">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
