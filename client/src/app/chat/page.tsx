"use client"
import type React from "react"
import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FileUp, Send, X, Loader2, User, Bot, ImagePlus, Sparkles,Check,ChevronDown,ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// import { useToast } from "@/components/ui/use-toast"
import { useMarkdownProcessor } from "@/components/hooks/use-text-processor"
// import { CodeBlockParser } from "@/components/utils/code-block-parser"
const ToolInvocationCard = ({ toolInvocation }) => {
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
  
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/chat",
  })
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const [previews, setPreviews] = useState<string[]>([])
  const [pdfPreviews, setPdfPreviews] = useState<{ name: string; size: number; url: string }[]>([])
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
//   const { toast } = useToast()

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages]) // Updated dependency

  // Generate image previews when files are selected
  useEffect(() => {
    if (!files) {
      setPreviews([])
      setPdfPreviews([])
      return
    }

    const newPreviews: string[] = []
    const newPdfPreviews: { name: string; size: number; url: string }[] = []
    setIsUploading(true)
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      } else if (file.type.startsWith("application/pdf")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            const url = URL.createObjectURL(file)
            newPdfPreviews.push({ name: file.name, size: file.size, url })
            setPdfPreviews(newPdfPreviews)
          }
        }
        reader.readAsDataURL(file)
      }
    })
    setIsUploading(false)
  }, [files])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
    }
  }

  const clearFiles = () => {
    setFiles(undefined)
    setPreviews([])
    setPdfPreviews([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!input && (!files || files.length === 0)) return

    handleSubmit(event, {
      experimental_attachments: files,
    })

    clearFiles()
  }

  const handlePdfClick = (url: string) => {
    setActivePdf(url === activePdf ? null : url)
  }

  // Check if a message contains code blocks
  

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  // Helper function to render message content based on parts
  const renderMessageContent = (message: any) => {
    // If message has parts array, use the new format
    if (message.parts && message.parts.length > 0) {
      return (
        <>
          {message.parts.map((part: any, index: number) => {
            switch (part.type) {
              case "text":
                
                return <ReactMarkdown key={`text-${index}` } remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}>{part.text}</ReactMarkdown>
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
      const content=useMarkdownProcessor(message.content)
      return <ReactMarkdown>{content}</ReactMarkdown>
    }
  }

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-background shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center text-muted-foreground"
            >
              <div className="relative w-24 h-24 mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary/10 rounded-full"
                />
                <Bot className="h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
              <p className="text-sm max-w-xs">
                Ask questions, upload images, or just chat about anything you'd like assistance with
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 group"
                  onClick={() => {
                    handleInputChange({ target: { value: "What can you help me with?" } } as any)
                    setTimeout(() => formRef.current?.requestSubmit(), 100)
                  }}
                >
                  <span>What can you help me with?</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 1 }}
                  >
                    <Send className="h-3 w-3 opacity-70 group-hover:text-primary" />
                  </motion.div>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span>Upload an image</span>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 1 }}
                  >
                    <ImagePlus className="h-3 w-3 opacity-70 group-hover:text-primary" />
                  </motion.div>
                </Button>
              </div>
            </motion.div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn("flex w-full mb-4", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "flex items-start gap-3 max-w-[80%]",
                    message.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <Avatar
                    className={cn(
                      "ring-2 transition-all duration-300",
                      message.role === "user" ? "bg-primary ring-primary/20 mr-2 mt-2" : "bg-secondary ml-2",
                    )}
                  >
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-black" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 shadow-sm transition-all duration-300 max-w-[40rem]]",
                      message.role === "user" ? "bg-black text-white mt-2" : "bg-secondary/10 overflow-auto",
                    )}
                  >
                    <div className="whitespace-pre-wrap break-words relative">{renderMessageContent(message)}</div>
                    {(message.experimental_attachments || []).filter(
                      (attachment) =>
                        attachment?.contentType?.startsWith("image/") ||
                        attachment?.contentType?.startsWith("application/pdf"),
                    ).length > 0 && (
                      <div className="mt-3 space-y-2">
                        {(message?.experimental_attachments || [])
                          .filter((attachment) => attachment?.contentType?.startsWith("image/"))
                          .map((attachment, index) => (
                            <motion.div
                              key={`${message.id}-${index}`}
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
                        {(message?.experimental_attachments || [])
                          .filter((attachment) => attachment?.contentType?.startsWith("application/pdf"))
                          .map((attachment, index) => (
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
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 max-w-[80%]"
            >
              <Avatar className="bg-secondary ring-2 ring-secondary/20">
                <AvatarFallback>
                  <Sparkles className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>

              <div className="bg-secondary/10 rounded-lg rounded-tl-none p-4 shadow-sm min-w-[200px]">
                <div className="flex space-x-2">
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      delay: 0,
                    }}
                    className="h-2 w-2 bg-secondary rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      delay: 0.2,
                    }}
                    className="h-2 w-2 bg-secondary rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      delay: 0.4,
                    }}
                    className="h-2 w-2 bg-secondary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </ScrollArea>

      <AnimatePresence>
        {(previews.length > 0 || pdfPreviews.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 border-t bg-muted/10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {previews.map((preview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-20 w-20 flex-shrink-0 group"
                >
                  <div className="absolute inset-0 rounded-md overflow-hidden border shadow-sm">
                    <Image
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      fill
                      className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearFiles}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
              {pdfPreviews.map((pdfPreview, index) => (
                <motion.div
                  key={`pdf-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-20 w-20 flex-shrink-0 group"
                >
                  <div className="flex flex-col items-center justify-center h-full w-full bg-primary/5 rounded-md border border-primary/20 overflow-hidden">
                    <FileUp className="h-6 w-6 text-primary/70 mb-1" />
                    <div className="bg-background/90 w-full p-1 text-[8px] text-center font-medium text-primary/80 truncate">
                      {pdfPreview.name.length > 10 ? pdfPreview.name.substring(0, 8) + "..." : pdfPreview.name}
                    </div>
                    <div className="text-[7px] text-muted-foreground">{(pdfPreview.size / 1048576).toFixed(2)} MB</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedPdfPreviews = pdfPreviews.filter((p) => p.url !== pdfPreview.url)
                      setPdfPreviews(updatedPdfPreviews)
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isUploading && previews.length === 0 && pdfPreviews.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 py-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">Processing files...</span>
        </motion.div>
      )}

      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form ref={formRef} onSubmit={onSubmit} className="flex items-end gap-2">
          <div className="relative flex-1">
            <div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute left-2 bottom-4 h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="h-5 w-5" />
                <span className="sr-only">Upload file</span>
              </Button>
            </div>

            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  if (input.trim() || (files && files.length > 0)) {
                    formRef.current?.requestSubmit()
                  }
                }
              }}
              placeholder="Type a message... (Shift+Enter for new line)"
              className="pl-12 pr-12 py-4 border-muted bg-background/50 focus-visible:ring-primary/50 transition-all duration-300 w-full rounded-md resize-none min-h-[56px] max-h-[200px] overflow-y-auto"
              rows={input.split("\n").length > 3 ? 3 : input.split("\n").length || 1}
            />

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 bottom-4 h-8 w-8 bg-primary hover:bg-primary/90 transition-colors"
                disabled={isLoading || (!input && (!files || files.length === 0))}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send message</span>
              </Button>
            </motion.div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*,application/pdf,audio/*,video/*"
            className="hidden"
          />
        </form>
      </div>
      {activePdf && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="bg-background rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-2 border-b">
              <h3 className="font-medium">PDF Document</h3>
              <Button variant="ghost" size="icon" onClick={() => setActivePdf(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <iframe src={activePdf} className="w-full h-[calc(100%-3rem)]" title="PDF Viewer" />
          </div>
        </div>
      )}
    </div>
  )
}
