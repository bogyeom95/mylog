"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

interface MDXReaderProps {
  post: {
    body: {
      code: string;
    };
  };
}

export default function MDXReader({ post }: MDXReaderProps) {
  const MDXContent = useMDXComponent(post.body.code);
  const components = {
    Image,
  };

  return (
    <div>
      <MDXContent components={components} />
    </div>
  );
}
