"use client";
import { useMDXComponent } from "next-contentlayer/hooks";

interface MDXReaderProps {
  post: {
    body: {
      code: string;
    };
  };
}

export default function MDXReader({ post }: MDXReaderProps) {
  const MDXContent = useMDXComponent(post?.body?.code);

  return (
    <div>
      <MDXContent />
    </div>
  );
}
