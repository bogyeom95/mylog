// app/components/MdxEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MarkdownMenu from "./markdown-menu";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Alert = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => <div className={className}>{children}</div>;

interface MdxEditorProps {
  initialMarkdown: string;
}

export default function MdxEditor({ initialMarkdown }: MdxEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [showMenu, setShowMenu] = useState(false);
  const [serializedContent, setSerializedContent] =
    useState<MDXRemoteSerializeResult | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const onChange = (value: string) => {
    setMarkdown(value);
    if (value.endsWith("/")) {
      setShowMenu(true);
    }
  };

  const insertMarkdown = (syntax: string) => {
    const newMarkdown = markdown.replace(/\/$/, syntax);
    setMarkdown(newMarkdown);
    setShowMenu(false);
  };

  useEffect(() => {
    async function serializeMarkdown() {
      const serialized = await serialize(markdown);
      setSerializedContent(serialized);
    }
    serializeMarkdown();
  }, [markdown]);

  return (
    <MDXProvider components={{ Alert }}>
      <div className="flex flex-col min-w-screen-sm mx-auto p-4 border rounded shadow-md relative">
        <div ref={editorRef} className="mb-4 w-full">
          <MDEditor
            value={markdown}
            onChange={(value) => onChange(value || "")}
            className="prose w-full overflow-y-auto"
            style={{ width: "100%" }}
          />
          {showMenu && (
            <MarkdownMenu
              onSelect={insertMarkdown}
              closeMenu={() => setShowMenu(false)}
            />
          )}
        </div>
        <input type="hidden" name="markdown" value={markdown} />
        <div className="border-t mt-4 pt-4">
          {/* MDXRemote 컴포넌트를 통해 MDX 렌더링 */}
          {serializedContent && (
            <MDXRemote {...serializedContent} components={{ Alert }} />
          )}
        </div>
      </div>
    </MDXProvider>
  );
}
