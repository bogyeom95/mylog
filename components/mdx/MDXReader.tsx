"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Figcaption } from "./mdx-items/Figcaption";
import { MDXComponents } from "mdx/types";
interface MDXReaderProps {
  post: {
    body: {
      code: string;
    };
  };
}

const components: MDXComponents = {
  figcaption: Figcaption,
};

export default function MDXReader({ post }: MDXReaderProps) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="prose dark:prose-dark mb-20">
      <MDXContent components={components} />
    </div>
  );
}
