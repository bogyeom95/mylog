"use client";
import { PropsWithChildren, useRef, useState } from "react";
import cn from "classnames";

export default function CopyCodeBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // 기존 타이머가 있다면 취소
    }

    setCopied(true);
    await navigator.clipboard.writeText(text);

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null; // 타이머 ID 초기화
    }, 1000);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleCopy}
        className="btn btn-ghost relative hover:bg-transparent"
      >
        <AnimaIcon show={!copied} iconName="content_copy" />
        <AnimaIcon show={copied} iconName="done" className="absolute" />
      </button>
    </div>
  );
}

interface AnimaIconProps {
  className?: string;
  show?: boolean;
  iconName: string;
}

const AnimaIcon = ({
  className,
  show = true,
  iconName,
}: PropsWithChildren<AnimaIconProps>) => {
  return (
    <span
      className={cn(
        "material-icons-round transition-transform duration-500",
        {
          "scale-100 opacity-100 ease-out": show,
          "scale-90 opacity-0 ease-in": !show,
        },
        className
      )}
    >
      {iconName}
    </span>
  );
};
