"use client";
import { useState } from "react";

export default function CopyCodeBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 피드백 메시지 숨기기
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={handleCopy} className="btn btn-ghost relative">
        <span
          className={`material-icons-round transition-transform duration-1000 ${
            copied
              ? "scale-125 opacity-0 ease-out"
              : "scale-100 opacity-100 ease-in"
          }`}
        >
          content_copy
        </span>
        <span
          className={`material-icons-round transition-transform duration-1000 ${
            copied
              ? "scale-100 opacity-100 ease-out"
              : "scale-90 opacity-0 ease-in"
          } absolute`}
        >
          done
        </span>
      </button>
    </div>
  );
}
