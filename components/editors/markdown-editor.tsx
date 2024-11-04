// app/components/MdxEditor.tsx
"use client";

import { useState, useRef } from "react";
import remarkMdx from "remark-mdx";
import rehypeHighlight from "rehype-highlight";
import MDEditor from "@uiw/react-md-editor";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkBreaks from "remark-breaks";

import "highlight.js/styles/github-dark-dimmed.css";
interface MdxEditorProps {
  initialMarkdown: string;
}

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-center p-3 bg-yellow-100 dark:bg-gray-800 dark:text-gray-100 rounded-md border border-yellow-200 dark:border-gray-600 shadow-sm">
    <span role="img" aria-label="note" className="mr-2 text-lg">
      📝
    </span>
    <span className="pl-2">{children}</span>
  </p>
);

export default function MarkdownEditor({ initialMarkdown }: MdxEditorProps) {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const editorRef = useRef<HTMLDivElement>(null);

  // MDX 변환 함수
  const handleMarkdownChange = async (value: string | undefined) => {
    setMarkdown(value || "");
    const serializedContent = await serialize(value || "", {
      mdxOptions: {
        remarkPlugins: [remarkMdx, remarkBreaks],
        rehypePlugins: [rehypeHighlight],
      },
    });
    setMdxContent(serializedContent);
  };

  return (
    <div className="flex flex-row min-w-screen-sm mx-auto p-4 border rounded shadow-md relative">
      {/* Markdown Editor */}
      <div ref={editorRef} className="w-1/2 mr-4">
        <MDEditor
          value={markdown}
          onChange={(value) => handleMarkdownChange(value)}
          className="w-full min-h-screen overflow-y-auto "
          preview="edit"
        />
      </div>
      {/* Markdown Preview */}
      <div className="w-2/3 border-l-2 border-gray-300 px-2 ">
        {mdxContent ? (
          <MDXRemote {...mdxContent} components={{ Note }} />
        ) : (
          <p>Loading preview...</p>
        )}
      </div>
    </div>
  );
}
