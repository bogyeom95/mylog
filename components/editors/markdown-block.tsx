import React, { useState, useRef, useEffect } from "react";
import MarkdownMenu from "./markdown-menu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // 추가된 플러그인

interface MarkdownBlockProps {
  content: string;
  onContentChange: (newContent: string) => void;
  onEnterPress: () => void;
  onDeletePress: () => void;
  isFocused: boolean;
}

const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
  content,
  onContentChange,
  onEnterPress,
  onDeletePress,
  isFocused,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    onContentChange(newContent);

    if (newContent.endsWith("/")) {
      setShowMenu(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !showMenu) {
      e.preventDefault();
      onEnterPress();
    } else if (e.key === "Backspace" && !content) {
      e.preventDefault();
      onDeletePress();
    }
  };

  const insertMarkdownSyntax = (syntax: string) => {
    const newContent = content.replace(/\/$/, syntax);
    onContentChange(newContent);
    setShowMenu(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="p-2 outline-none border-b border-gray-200 w-full"
      />
      {showMenu && (
        <MarkdownMenu
          onSelect={insertMarkdownSyntax}
          closeMenu={() => setShowMenu(false)}
        />
      )}
      <div className="mt-2 p-2 bg-gray-100 rounded">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownBlock;
