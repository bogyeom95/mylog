/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    date: { type: "date", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: false },

    tags: { type: "list", of: { type: "string" }, required: false },
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
    remarkPlugins: [remarkParse, remarkGfm],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [child] = node.children;

            if (child.tagName !== "code") return;

            node.__raw__ = child.children?.[0].value;
          }
        });
      },
      [rehypePrettyCode, rehypeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const figcaptionElement = node.children[0];
            if (figcaptionElement.tagName !== "figcaption") {
              return;
            }
            figcaptionElement.properties["__raw__"] = node.__raw__;
          }
        });
      },
    ],
  },
});
