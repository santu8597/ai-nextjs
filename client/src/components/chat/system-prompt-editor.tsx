"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Code, Cloud, Terminal, ImageIcon, RefreshCw,Music,Mail,FileText,Shield,Twitter,User,Globe ,Search,Folder} from "lucide-react"

interface SystemPromptEditorProps {
  systemPrompt: string
  onSystemPromptChange: (prompt: string) => void
  selectedTools: string[]
  onToolsChange: (tools: string[]) => void
  onApplyConfig: () => void
}

export default function SystemPromptEditor({
  systemPrompt,
  onSystemPromptChange,
  selectedTools,
  onToolsChange,
  onApplyConfig,
}: SystemPromptEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const availableTools = [
    { id: "weatherTool", name: "Weather Tool", icon: <Cloud className="h-4 w-4 mr-2" /> },
    { id: "shellTool", name: "Shell Tool", icon: <Terminal className="h-4 w-4 mr-2" /> },
    { id: "imageGenTool", name: "Image Generation Tool", icon: <ImageIcon className="h-4 w-4 mr-2" /> },
    { id: "analyzeSrcStructureTool", name: "Folder-Structure Tool", icon: <Folder className="h-4 w-4 mr-2" /> },
    { id: "musicMoodTool", name: "Music Mood Tool", icon: <Music className="h-4 w-4 mr-2" /> },
    // { id: "twitterTool", name: "Twitter Tool", icon: <Twitter className="h-4 w-4 mr-2" /> },
    { id: "sendEmailTool", name: "Email Tool", icon: <Mail className="h-4 w-4 mr-2" /> },
    // { id: "docsTool", name: "Docs Tool", icon: <FileText className="h-4 w-4 mr-2" /> },
    // { id: "phishingDetectorTool", name: "Phishing Detector Tool", icon: <Shield className="h-4 w-4 mr-2" /> },
    // { id: "normalTool", name: "Normal Tool", icon: <User className="h-4 w-4 mr-2" /> },
    { id: "webSearchTool", name: "Browser Tool", icon: <Globe className="h-4 w-4 mr-2" /> },
    { id: "scrapeDocsTool", name: "Web Scraper Tool", icon: <Search className="h-4 w-4 mr-2" /> },
  ]

  const handleToolToggle = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter((id) => id !== toolId))
    } else {
      onToolsChange([...selectedTools, toolId])
    }
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader
        className="pb-2 flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-md">AI Configuration</CardTitle>
        <Button variant="ghost" size="sm">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="system-prompt">System Prompt</Label>
              <Textarea
                id="system-prompt"
                placeholder="Enter system instructions for the AI..."
                className="mt-4 min-h-[290px] max-h-[290px] overflow-y-scroll"
                value={systemPrompt}
                onChange={(e) => onSystemPromptChange(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block">Available Tools</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableTools.map((tool) => (
                  <div key={tool.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={tool.id}
                      checked={selectedTools.includes(tool.id)}
                      onCheckedChange={() => handleToolToggle(tool.id)}
                    />
                    <Label htmlFor={tool.id} className="flex items-center cursor-pointer">
                      {tool.icon}
                      {tool.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={onApplyConfig} className="w-full" variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Apply Configuration
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
