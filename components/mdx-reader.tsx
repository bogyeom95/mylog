"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Figcaption } from "./items/figcaption";
import { MDXComponents } from "mdx/types";
interface MDXReaderProps {
  post: {
    body: {
      code: string;
    };
  };
}

export default function MDXReader({ post }: MDXReaderProps) {
  const MDXContent = useMDXComponent(post.body.code);
  const components: MDXComponents = {
    figcaption: Figcaption,
  };
  return (
    <div className="prose dark:prose-dark mb-20">
      <MDXContent components={components} />
    </div>
  );
}
