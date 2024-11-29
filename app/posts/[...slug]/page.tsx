import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import MDXReader from "@/components/mdx-reader";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const flattenedPath = slug.join("/");

  const post: Post | undefined = allPosts.find(
    (post) => post._raw.flattenedPath === flattenedPath
  );

  const baseUrl = process.env.BASE_URL;
  const defaultMeta = {
    title: "Untitled Post",
    description: "A post on the blog.",
  };

  if (!post) {
    // 게시물이 없는 경우 검색 엔진이 페이지를 인덱싱하지 않도록 robots 메타 태그 추가
    return {
      title: "Post not found",
      description: "The requested post does not exist.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: post.title || defaultMeta.title,
    description: post.description || defaultMeta.description,
    openGraph: {
      title: post.title || defaultMeta.title,
      description: post.description || defaultMeta.description,
      url: `${baseUrl}/posts/${flattenedPath}`,
      type: "article",
      images: post.image ? [`${baseUrl}${post.image}`] : undefined,
      article: {
        published_time: post.date,
        author: "bogyeom95",
      },
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title || defaultMeta.title,
      description: post.description || defaultMeta.description,
      images: post.image ? [`${baseUrl}${post.image}`] : undefined,
    },
    additionalMetaTags: [
      {
        name: "charset",
        content: "UTF-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        property: "article:published_time",
        content: post.date,
      },
      {
        name: "keywords",
        content: post.tags?.join(", "),
      },
      {
        rel: "canonical", // 중복 콘텐츠 문제를 방지하기 위해 canonical 태그를 추가
        href: `${baseUrl}/posts/${flattenedPath}`,
      },
    ],
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug) {
    return notFound();
  }

  const flattenedPath = slug.join("/");

  const post: Post | undefined = allPosts.find((post) => {
    return post._raw.flattenedPath === flattenedPath;
  });

  if (!post) {
    return notFound();
  }
  if (post._raw.sourceFileName === "index.mdx") {
    return notFound();
  }
  if (!post.body?.code) {
    return notFound();
  }

  return (
    <div className="flex flex-col  justify-center gap-6 mt-4 mx-auto w-[100dvw] max-w-4xl">
      <div className="w-full mx-auto ">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to all posts
        </Link>
      </div>

      <div className="mx-2">
        <MDXReader post={post} />
      </div>
    </div>
  );
}
