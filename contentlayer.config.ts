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

            console.log("code child", child);

            // 언어 정보를 추출하여 `data-language` 속성으로 설정
            node.properties = {
              ...node.properties,
              language: child.properties.className?.[0].replace(
                "language-",
                ""
              ),
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
            figcaptionElement.properties["__raw__"] = node.__raw__;
            // console.log("figcaption", figcaptionElement);
          }
        });
      },
    ],
  },
});
