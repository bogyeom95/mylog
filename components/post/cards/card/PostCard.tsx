import { Post } from "@/.contentlayer/generated";
import Link from "next/link";
import PostCardFooter from "./PostCardFooter";
import { PostCardHeader } from "./PostCardHeader";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      key={post.title}
      href={`posts/` + post._raw.flattenedPath}
      className="contents"
    >
      <div key={post.title} className="flex w-full flex-col">
        <div className="border-b-2 border-b-slate-500 p-2 xl:p-4">
          <PostCardHeader
            imageUrl={post.image}
            title={post.title}
            description={post.description}
          />

          <PostCardFooter
            className={"mt-4"}
            tags={post.tags}
            date={post.date}
          />
        </div>
      </div>
    </Link>
  );
}
