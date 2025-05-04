"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Code block theme (you can change)

export function LLMResponse({ content }) {
  return (
    <div className="prose prose-lg max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({node, inline, className, children, ...props}) {
            return !inline ? (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-200 rounded px-1" {...props}>
                {children}
              </code>
            );
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600" {...props}>
                {children}
              </blockquote>
            );
          }
        }}
      />
    </div>
  );
}