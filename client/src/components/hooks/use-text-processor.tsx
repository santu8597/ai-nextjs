import { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import mermaid from "mermaid";
import "highlight.js/styles/base16/green-screen.css";
import { Dialog } from "@/components/ui/dialog";

// Code block for syntax highlight and mermaid preview
const CodeBlock = ({ children, className }: any) => {
  const [showMermaidPreview, setShowMermaidPreview] = useState(false);
  const isMermaid = className?.includes("language-mermaid");

  return (
    <>
      <code className={className}>{children}</code>
      {isMermaid && (
        <div className="mt-2">
          <button
            onClick={() => setShowMermaidPreview(true)}
            className="text-sm text-blue-500 underline"
          >
            Open Mermaid preview
          </button>
          <Dialog
            open={showMermaidPreview}
            setOpen={setShowMermaidPreview}
            title="Mermaid diagram preview"
            size="3xl"
          >
            <Mermaid content={children?.toString() ?? ""} />
          </Dialog>
        </div>
      )}
    </>
  );
};

const Mermaid = ({ content }: { content: string }) => {
  const [diagram, setDiagram] = useState<string | boolean>(true);

  useEffect(() => {
    const render = async () => {
      const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
      try {
        if (await mermaid.parse(content, { suppressErrors: true })) {
          const { svg } = await mermaid.render(id, content);
          setDiagram(svg);
        } else {
          setDiagram(false);
        }
      } catch {
        setDiagram(false);
      }
    };
    render();
  }, [content]);

  if (diagram === true) return <p>Rendering diagram...</p>;
  if (diagram === false) return <p>Unable to render diagram.</p>;
  return <div dangerouslySetInnerHTML={{ __html: diagram }} />;
};

const markdownComponents = {
  a: ({ href, children }: React.HTMLProps<HTMLAnchorElement>) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-blue-500 underline">
      {children}
    </a>
  ),
  p: ({ children }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-2 text-gray-800">{children}</p>
  ),
  code: CodeBlock,
  pre: ({ children }: React.HTMLProps<HTMLPreElement>) => (
    <div className="rounded bg-black text-green-300 p-2 overflow-x-auto">
      <pre>{children}</pre>
    </div>
  ),
  h1: ({ children }: any) => <h1 className="text-3xl font-bold">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-2xl font-semibold">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-xl font-medium">{children}</h3>,
  ul: ({ children }: any) => <ul className="list-disc pl-6">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-6">{children}</ol>,
  li: ({ children }: any) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="overflow-auto my-2">
      <table className="table-auto border border-gray-300 w-full text-left">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => <th className="border p-2 bg-gray-100">{children}</th>,
  td: ({ children }: any) => <td className="border p-2">{children}</td>,
};

export const useMarkdownProcessor = (content: string) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "forest" });
  }, []);

  return useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { ignoreMissing: true });

    const tree = processor.runSync(processor.parse(content));
    return toJsxRuntime(tree, {
      Fragment,
      jsx,
      jsxs,
      components: markdownComponents,
    });
  }, [content]);
};
