import { Sparkles } from "lucide-react"

export default function ChatHeader() {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
      </div>
    </div>
  )
}
