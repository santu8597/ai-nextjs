"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

interface ToolInvocationProps {
  toolInvocation: {
    toolName: string
    args: any
    result: any
    state: string
  }
}

export default function ToolInvocationCard({ toolInvocation }: ToolInvocationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!toolInvocation) return null

  const { toolName, args, result, state } = toolInvocation

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden mb-4 bg-black text-white">
      <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <Check size={18} className="text-white" />
          <span>Used tool: {toolName}</span>
        </div>
        <button className="text-white">{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
      </div>

      {isExpanded && (
        <>
          <div className="border-t border-gray-700 p-3 font-mono text-sm">{JSON.stringify(args, null, 2)}</div>

          {state === "result" && (
            <>
              <div className="border-t border-gray-700 p-3">
                <div className="text-white font-semibold mb-1">Result:</div>
                <pre className="font-mono text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
