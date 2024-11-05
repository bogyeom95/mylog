import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { Pluggable } from "unified";
import remarkGfm from "remark-gfm";
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
    rehypePlugins: [[rehypePrettyCode, rehypeOptions] as Pluggable],
  },
});
