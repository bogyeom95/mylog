"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Figcaption } from "./items/figcaption";
import Pre from "./items/pre";
import CodeBlockContainer from "./items/code-block-container";
import { ReactNode } from "react";

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
    pre: Pre,
    text: ({ children }: { children: ReactNode }) => {
      console.log(children);
      if (typeof children === "string" && children === "\n") {
        // 개행 문자인 경우 <br />로 렌더링
        return <br />;
      }
      return <>{children}</>; // 일반 텍스트는 그대로 출력
    },
    div: ({
      children,
      ...props
    }: {
      children: ReactNode;
      className?: string;
    }) => {
      if (props.className === "code-block-container") {
        return <CodeBlockContainer {...props}>{children}</CodeBlockContainer>;
      }
      return <div {...props}>{children}</div>;
    },

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
