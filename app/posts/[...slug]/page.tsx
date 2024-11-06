import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import MDXReader from "@/components/mdx-reader";
import { CardBodyFooter } from "@/components/post/post-list";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!slug) {
    return notFound();
  }

  const flattenedPath = slug.join("/");

  const post: Post | undefined = allPosts.find((post) => {
    return post._raw.flattenedPath === flattenedPath;
  });

  if (!post) {
    console.error(`Error: No post found with title ${slug}`);
    notFound();
    return null;
  }

  if (!post.body?.raw) {
    console.error("Error: post.body.code is undefined");
    return <div>Error: No content available for this post.</div>;
  }

  return (
    <div className="flex flex-col  justify-center gap-6 mt-4 mx-auto w-[100vw] max-w-4xl">
      <div className="w-full mx-auto ">
        <div className="border-b-2 mx-2 ">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to all posts
          </Link>
          <h1 className="text-2xl font-extrabold  truncate">{post.title}</h1>
          <p>{post.description}</p>
          <div className="my-4">
            <CardBodyFooter post={post} />
          </div>
        </div>
      </div>

      <div className="mx-2">
        <MDXReader post={post} />
      </div>
    </div>
  );
}
