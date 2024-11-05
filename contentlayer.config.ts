import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { Pluggable } from "unified";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    date: { type: "date", required: true },
    isPublished: { type: "boolean", required: true },
    image: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/docs/${post._raw.flattenedPath}`,
    },
  },
}));

const rehypeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: true,
};

const languages = new Set(); // 언어 목록을 중복 없이 수집하기 위한 Set

export default makeSource({
  contentDirPath: "docs", // 프로젝트 루트의 docs 폴더
  documentTypes: [Post],

  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [child] = node.children;

            if (child.tagName !== "code") return;

            // 언어 정보를 추출하고 `languages`에 추가
            const language = child.properties.className?.[0].replace(
              "language-",
              ""
            );
            if (language) {
              languages.add(language);
            }

            node.properties = {
              ...node.properties,
              language,
            };

            node.__raw__ = child.children?.[0].value;
          }
        });
      },
      [rehypePrettyCode, rehypeOptions] as Pluggable,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }
            // console.log(node);
            const figcaptionElement = node.children[0];
            if (figcaptionElement.tagName !== "figcaption") {
              return;
            }
            // console.log("figcaption", figcaptionElement);
            // 모든 언어를 배열 형태로 figcaptionElement에 추가
            figcaptionElement.properties["__all_languages__"] =
              Array.from(languages);
            figcaptionElement.properties["__raw__"] = node.__raw__;
            // console.log("figcaption", figcaptionElement);
          }
        });
      },
      () => (tree) => {
        // figure 태그의 연속 요소를 하나로 묶는 작업
        const newChildren = [];
        let buffer = [];

        tree.children.forEach((node) => {
          if (node.type === "element" && node.tagName === "figure") {
            buffer.push(node); // 연속된 figure 요소를 buffer에 추가
          } else if (node.type === "text" && node.value === "\n") {
            if (buffer.length === 0) {
              newChildren.push({
                type: "element",
                tagName: "br", // <br /> 태그 생성
                children: [], // <br /> 태그는 자식이 필요 없으므로 빈 배열
              });
            }
          } else {
            if (buffer.length > 0) {
              // buffer에 저장된 연속된 figure 요소들을 하나의 code-block-container로 묶기
              newChildren.push({
                type: "element",
                tagName: "div",
                properties: { className: ["code-block-container"] },
                children: buffer,
              });
              buffer = []; // buffer 초기화
            }
            newChildren.push(node); // 연속되지 않은 다른 요소는 그대로 추가
          }
        });

        // 마지막에 buffer에 남아 있는 연속된 figure 요소를 처리
        if (buffer.length > 0) {
          newChildren.push({
            type: "element",
            tagName: "div",
            properties: { className: ["code-block-container"] },
            children: buffer,
          });
        }

        // 최종적으로 tree.children에 newChildren 배열을 할당하여 적용
        tree.children = newChildren;
        console.log(tree);
      },
    ],
  },
});
