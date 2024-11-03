// app/components/MdxEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownMenu from "./markdown-menu";

// 동적 로딩 설정
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MdxEditorProps {
  initialMarkdown: string;
}

export default function MdxEditor({ initialMarkdown }: MdxEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [showMenu, setShowMenu] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // '/' 입력 감지
  const onChange = (value: string) => {
    setMarkdown(value);
    if (value.endsWith("/")) {
      setShowMenu(true);
    }
  };

  // 선택 시 마크다운 삽입 함수
  const insertMarkdown = (syntax: string) => {
    const newMarkdown = markdown.replace(/\/$/, syntax);
    setMarkdown(newMarkdown);
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 border rounded shadow-md relative">
      <div ref={editorRef} className="mb-4">
        <MDEditor
          value={markdown}
          onChange={(value) => onChange(value || "")}
          className="prose max-w-none"
        />
        {showMenu && (
          <MarkdownMenu
            onSelect={insertMarkdown}
            closeMenu={() => setShowMenu(false)}
          />
        )}
      </div>
      <input type="hidden" name="markdown" value={markdown} />
      <div className="border-t mt-4 pt-4 hi">
        {/* 미리보기 기능 */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
