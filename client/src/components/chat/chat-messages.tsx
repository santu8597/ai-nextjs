"use client"
import type { RefObject } from "react"
import { User, Bot, Sparkles, Send, ImagePlus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import MessageContent from "./message-content"

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
  scrollAreaRef: RefObject<HTMLDivElement | null>
  handlePdfClick: (url: string) => void
  handleSuggestedPrompt: (prompt: string) => void
  formRef: RefObject<HTMLFormElement | null>
  fileInputRef: RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
  scrollAreaRef,
  handlePdfClick,
  handleSuggestedPrompt,
  formRef,
  fileInputRef,
  handleFileChange
}: ChatMessagesProps) {
  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <ScrollArea className="flex-1 px-4 overflow-y-auto" ref={scrollAreaRef}>
      <AnimatePresence>
        {messages.length === 0 ? (
          <EmptyState handleSuggestedPrompt={handleSuggestedPrompt} formRef={formRef} fileInputRef={fileInputRef} />
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
                    "rounded-lg px-3 py-2 shadow-sm transition-all duration-300 max-w-[40rem]",
                    message.role === "user" ? "bg-black text-white mt-2" : "bg-secondary/10 overflow-auto",
                  )}
                >
                  <MessageContent message={message} handlePdfClick={handlePdfClick} />
                </div>
              </div>
            </motion.div>
          ))
        )}

        {isLoading && <LoadingIndicator />}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </ScrollArea>
  )
}

function EmptyState({
  handleSuggestedPrompt,
  formRef,
  fileInputRef,
}: {
  handleSuggestedPrompt: (prompt: string) => void
  formRef: RefObject<HTMLFormElement | null>
  fileInputRef: RefObject<HTMLInputElement | null>
}) {
  return (
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
        Ask questions, upload images,videos,pdfs,audio or just chat about anything you'd like with the assistant
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 group"
          onClick={() => handleSuggestedPrompt("What can you help me with?")}
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
          <span>Upload an file</span>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 1 }}
          >
            <ImagePlus className="h-3 w-3 opacity-70 group-hover:text-primary" />
          </motion.div>
        </Button>
      </div>
    </motion.div>
  )
}

function LoadingIndicator() {
  return (
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
  )
}
