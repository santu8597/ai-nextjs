"use client"

import { useChat } from "@ai-sdk/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Loader2, Terminal, Code, Cloud, Image, Music, Twitter, Mail, FileText, Shield, User, Globe, Search, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import ChatHeader from "./chat-header"
import ChatInput from "./chat-input"
import ChatMessages from "./chat-messages"
import FilePreviewArea from "./file-preview-area"
import PdfViewer from "./pdf-viewer"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Chat() {
  const [selectedAgent, setSelectedAgent] = useState('shellAgent');
  
  const agents = [
    { id: 'shellAgent', name: 'Shell Agent', icon: <Terminal className="h-4 w-4 mr-2" /> },
    { id: 'nextjsAgent', name: 'Next.js Agent', icon: <Code className="h-4 w-4 mr-2" /> },
    { id: 'weatherAgent', name: 'Weather Agent', icon: <Cloud className="h-4 w-4 mr-2" /> },
    { id: 'imageAgent', name: 'Image Agent', icon: <Image className="h-4 w-4 mr-2" /> },
    { id: 'MusicMoodAgent', name: 'Music Mood Agent', icon: <Music className="h-4 w-4 mr-2" /> },
    { id: 'twitterAgent', name: 'Twitter Agent', icon: <Twitter className="h-4 w-4 mr-2" /> },
    { id: 'emailAgent', name: 'Email Agent', icon: <Mail className="h-4 w-4 mr-2" /> },
    { id: 'docsAgent', name: 'Docs Agent', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'phishingDetectorAgent', name: 'Phishing Detector', icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: 'normalAgent', name: 'Normal Agent', icon: <User className="h-4 w-4 mr-2" /> },
    { id: 'browserAgent', name: 'Browser Agent', icon: <Globe className="h-4 w-4 mr-2" /> },
    { id: 'webScraperAgent', name: 'Web Scraper Agent', icon: <Search className="h-4 w-4 mr-2" /> },
  ];

  const getSelectedAgentName = () => {
    return agents.find(agent => agent.id === selectedAgent)?.name || 'Select Agent';
  };

  const getSelectedAgentIcon = () => {
    return agents.find(agent => agent.id === selectedAgent)?.icon;
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "api/chat",
    body: {
      ai_agent: selectedAgent
    }
  })
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  
  const [previews, setPreviews] = useState<string[]>([])
  const [pdfPreviews, setPdfPreviews] = useState<{ name: string; size: number; url: string; type?: string }[]>([])
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate image previews when files are selected
  useEffect(() => {
    if (!files) {
      setPreviews([])
      setPdfPreviews([])
      return
    }

    const newPreviews: string[] = []
    const newPdfPreviews: { name: string; size: number; url: string, type?: string }[] = []
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
      } else if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
        // Create object URL for audio and video files
        const url = URL.createObjectURL(file)
        // Store in the same array as PDFs for simplicity
        newPdfPreviews.push({
          name: file.name,
          size: file.size,
          url,
          type: file.type.startsWith("audio/") ? "audio" : "video",
        })
        setPdfPreviews(newPdfPreviews)
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

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
    setTimeout(() => formRef.current?.requestSubmit(), 100)
  }

  return (
    <div className="flex flex-col w-full mx-auto h-screen bg-background shadow-lg overflow-hidden">
      
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <ChatHeader />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {getSelectedAgentIcon()}
              <span>{getSelectedAgentName()}</span>
              <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {agents.map((agent) => (
              <DropdownMenuItem 
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  {agent.icon}
                  <span>{agent.name}</span>
                </div>
                {selectedAgent === agent.id && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        scrollAreaRef={scrollAreaRef}
        handlePdfClick={handlePdfClick}
        handleSuggestedPrompt={handleSuggestedPrompt}
        formRef={formRef}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />

      <AnimatePresence>
        {(previews.length > 0 || pdfPreviews.length > 0) && (
          <FilePreviewArea
            previews={previews}
            pdfPreviews={pdfPreviews}
            clearFiles={clearFiles}
            setPdfPreviews={setPdfPreviews}
          />
        )}
      </AnimatePresence>

      {isUploading && previews.length === 0 && pdfPreviews.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 py-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">Processing files...</span>
        </motion.div>
      )}

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
        files={files}
        formRef={formRef}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />

      {activePdf && <PdfViewer activePdf={activePdf} setActivePdf={setActivePdf} />}
    </div>
  )
}