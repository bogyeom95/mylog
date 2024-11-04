import { allPosts, Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import MDXReader from "components/MDXReader";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
    return notFound();
  }

  const post: Post | undefined = allPosts.find((post) => post.title === slug);

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
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to all posts
      </Link>
      <h1 className="text-3xl font-bold  my-4">{post.title}</h1>
      <p>{post.description}</p>
      <time dateTime={post.date} className="text-sm">
        {/* 한국 날짜 포맷 */}
        {format(parseISO(post.date), "yyyy-MM-dd")}
      </time>
      <MDXReader post={post} />
    </div>
  );
}
