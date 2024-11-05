"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Figcaption } from "./items/figcaption";

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
    figcaption: Figcaption,
    h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
    h2: (props) => <h2 className="text-3xl font-bold" {...props} />,
    h3: (props) => <h3 className="text-2xl font-bold" {...props} />,
    h4: (props) => <h4 className="text-xl font-bold" {...props} />,
    h5: (props) => <h5 className="text-lg font-bold" {...props} />,
    h6: (props) => <h6 className="text-base font-bold" {...props} />,
  };
  return (
    <div>
      <MDXContent components={components} />
    </div>
  );
}
