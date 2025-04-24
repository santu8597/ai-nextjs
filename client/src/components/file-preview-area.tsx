"use client"

import type React from "react"

import { X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FileUp, Music, Video } from "lucide-react"

interface FilePreviewAreaProps {
  previews: string[]
  pdfPreviews: { name: string; size: number; url: string; type?: string }[]
  clearFiles: () => void
  setPdfPreviews: React.Dispatch<React.SetStateAction<{ name: string; size: number; url: string; type?: string }[]>>
}

export default function FilePreviewArea({ previews, pdfPreviews, clearFiles, setPdfPreviews }: FilePreviewAreaProps) {
  return (
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
        {pdfPreviews.map((preview, index) => (
          <motion.div
            key={`file-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.1 }}
            className="relative h-20 w-20 flex-shrink-0 group"
          >
            <div className="flex flex-col items-center justify-center h-full w-full bg-primary/5 rounded-md border border-primary/20 overflow-hidden">
              {preview.type === "audio" ? (
                <Music className="h-6 w-6 text-primary/70 mb-1" />
              ) : preview.type === "video" ? (
                <Video className="h-6 w-6 text-primary/70 mb-1" />
              ) : (
                <FileUp className="h-6 w-6 text-primary/70 mb-1" />
              )}
              <div className="bg-background/90 w-full p-1 text-[8px] text-center font-medium text-primary/80 truncate">
                {preview.name.length > 10 ? preview.name.substring(0, 8) + "..." : preview.name}
              </div>
              <div className="text-[7px] text-muted-foreground">{(preview.size / 1048576).toFixed(2)} MB</div>
            </div>
            <button
              type="button"
              onClick={() => {
                const updatedPreviews = pdfPreviews.filter((p) => p.url !== preview.url)
                setPdfPreviews(updatedPreviews)
              }}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity z-10"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
