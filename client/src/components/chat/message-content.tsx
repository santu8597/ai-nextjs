"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { useMarkdownProcessor } from "@/components/hooks/use-text-processor"
import ToolInvocationCard from "./tool-invocation-card"
import { FileUp, Music, Video } from "lucide-react"

interface MessageContentProps {
  message: any
  handlePdfClick: (url: string) => void
}

export default function MessageContent({ message, handlePdfClick }: MessageContentProps) {
  const content = useMarkdownProcessor(message.content)

  // Helper function to render message content based on parts
  const renderMessageContent = (message: any) => {
    // If message has parts array, use the new format
    if (message.parts && message.parts.length > 0) {
      return (
        <>
          {message.parts.map((part: any, index: number) => {
            switch (part.type) {
              case "text":
                return (
                  <ReactMarkdown key={`text-${index}`} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {part.text}
                  </ReactMarkdown>
                )
              case "reasoning":
                return (
                  <div key={`reasoning-${index}`} className="bg-muted/30 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1 text-muted-foreground">Reasoning:</div>
                    {part.reasoning}
                  </div>
                )
              case "source":
                return (
                  <div key={`source-${index}`} className="bg-primary/10 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1 text-primary">Source:</div>
                    <a
                      href={part.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {part.source.title || part.source.url}
                    </a>
                  </div>
                )
              case "tool-invocation":
                const toolInvocation = {
                  toolName: part.toolInvocation.toolName,
                  args: part.toolInvocation.args,
                  result: part.toolInvocation.state === "result" ? part.toolInvocation.result : null,
                  state: part.toolInvocation.state,
                }
                
                return (
                  <div key={`tool-${index}`} className="bg-secondary/20 p-2 rounded-md my-2 text-sm">
                    <div className="font-semibold text-xs mb-1">Tool: {part.toolInvocation.toolName}</div>
                    <pre className="text-xs overflow-auto p-1 bg-black/5 rounded">
                      <ToolInvocationCard toolInvocation={toolInvocation} />
                    </pre>
                  </div>
                )
                // case "tool-result":
                //   // Check if this is a weather tool result
                //   if (part.toolResult?.type === "analyzeSrcStructureTool" && part.toolResult?.data) {
                //     return (
                //       <div key={`tool-result-${index}`} className="my-3">
                //         <h1>dshhhjdw</h1>
                //       </div>
                //     )
                //   }
                //   // Default tool result rendering
                //   return (
                //     <div key={`tool-result-${index}`} className="bg-primary/5 p-2 rounded-md my-2 text-sm">
                //       <div className="font-semibold text-xs mb-1 text-primary">Tool Result:</div>
                //       <pre className="text-xs overflow-auto p-1 bg-black/5 rounded">
                //         {JSON.stringify(part.toolResult, null, 2)}
                //       </pre>
                //     </div>
                //   )
              case "file":
                return (
                  <div key={`file-${index}`} className="my-2">
                    {part.mimeType.startsWith("image/") && (
                      <Image
                        src={`data:${part.mimeType};base64,${part.data}`}
                        width={300}
                        height={300}
                        alt={`Generated image ${index}`}
                        className="object-contain max-h-[300px] w-auto rounded-md"
                      />
                    )}
                  </div>
                )
              default:
                return null
            }
          })}
        </>
      )
    } else {
      // Fallback to the old format for backward compatibility
      return <ReactMarkdown>{content}</ReactMarkdown>
    }
  }

  return (
    <>
      <div className="whitespace-pre-wrap break-words relative">{renderMessageContent(message)}</div>
      {(message.experimental_attachments || []).filter(
        (attachment: any) =>
          attachment?.contentType?.startsWith("image/") ||
          attachment?.contentType?.startsWith("application/pdf") ||
          attachment?.contentType?.startsWith("audio/") ||
          attachment?.contentType?.startsWith("video/"),
      ).length > 0 && (
        <div className="mt-3 space-y-2">
          {/* Image attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("image/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`${message.id}-img-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <Image
                  src={attachment.url || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt={attachment.name ?? `attachment-${index}`}
                  className="object-contain max-h-[300px] w-auto rounded-md"
                />
              </motion.div>
            ))}

          {/* PDF attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("application/pdf"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`pdf-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handlePdfClick(attachment.url)}
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-medium text-sm">{attachment.name || `Document-${index}.pdf`}</p>
                    <p className="text-xs text-muted-foreground">Click to view PDF</p>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Audio attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("audio/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`audio-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium text-sm">{attachment.name || `Audio-${index}.mp3`}</p>
                    </div>
                  </div>
                  <audio controls src={attachment.url} className="w-full max-w-md" preload="metadata">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </motion.div>
            ))}

          {/* Video attachments */}
          {(message?.experimental_attachments || [])
            .filter((attachment: any) => attachment?.contentType?.startsWith("video/"))
            .map((attachment: any, index: number) => (
              <motion.div
                key={`video-${message.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-md overflow-hidden border shadow-sm"
              >
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium text-sm">{attachment.name || `Video-${index}.mp4`}</p>
                    </div>
                  </div>
                  <video controls src={attachment.url} className="w-full max-w-md rounded-md" preload="metadata">
                    Your browser does not support the video element.
                  </video>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </>
  )
}
