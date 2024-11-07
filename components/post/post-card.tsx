import { Post } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      key={post.title}
      href={`posts/` + post._raw.flattenedPath}
      className="contents"
    >
      <div key={post.title} className="flex w-full flex-col">
        <div className="border-b-2 p-4  transition duration-200 ease-in-out hover:scale-105 ">
          <div className="flex flex-row gap-4">
            <div className="relative h-28 w-28 rounded-md flex-shrink-0 ">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={"image_search_28dp.svg"}
                  fill
                  alt="Empty Image"
                  objectFit="cover"
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
          <div className="mt-4">
            <CardBodyFooter post={post} />
          </div>
        </div>
      </div>
    </Link>
  );
}
