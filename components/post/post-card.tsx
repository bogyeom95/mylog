import { Post } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import CardBodyFooter from "./post-card-footer";
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      key={post.title}
      href={`posts/` + post._raw.flattenedPath}
      className="contents"
    >
      <div key={post.title} className="flex w-full flex-col">
        <div className="border-b-2 border-b-slate-500 p-2 xl:p-4">
          <div className="flex flex-row gap-4">
            <div className="relative h-36 w-36 rounded-md flex-shrink-0   dark:bg-slate-700  ">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover p-1"
                />
              ) : (
                <Image
                  src={"image_search_28dp.svg"}
                  fill
                  alt="Empty Image"
                  className="object-cover p-1"
                />
              )}
            </div>
            <div className={`flex flex-col gap-2 overflow-hidden`}>
              <h1 className="text-2xl font-extrabold  truncate">
                {post.title}
              </h1>
              <p className="pt-2 line-clamp-3">{post.description}</p>
            </div>
          </div>
          <div className="mt-2">
            <CardBodyFooter post={post} />
          </div>
        </div>
      </div>
    </Link>
  );
}
