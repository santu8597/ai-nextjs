"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfViewerProps {
  activePdf: string
  setActivePdf: (pdf: string | null) => void
}

export default function PdfViewer({ activePdf, setActivePdf }: PdfViewerProps) {
  return (
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
  )
}
