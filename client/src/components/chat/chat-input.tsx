"use client"

import type React from "react"

import { FileUp, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { RefObject } from "react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  files: FileList | undefined
  formRef: RefObject<HTMLFormElement | null>
  fileInputRef: RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ChatInput({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
  files,
  formRef,
  fileInputRef,
  handleFileChange,
}: ChatInputProps) {
  return (
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
  )
}
