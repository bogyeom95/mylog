import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";

export default async function Home() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto max-w-4xl">
      {allPosts.map((post) => (
        <div
          key={post.title}
          className="flex w-full flex-col transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
        >
          <Link href={`posts/` + post.title} className="contents">
            <div className="flex flex-col gap-4 border border-base-300 bg-base-100 rounded-lg p-4">
              <div
                className={`flex ${post.image ? "flex-row" : "flex-col"} gap-4`}
              >
                {post.image && (
                  <div className="relative h-28 w-28 overflow-hidden rounded-md">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 flex-grow">
                  <h1 className="text-2xl font-extrabold text-primary group-hover:text-secondary transition duration-200">
                    {post.title}
                  </h1>
                  <p className="text-base-content">{post.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm font-medium bg-accent text-accent-content rounded-full transition duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <time dateTime={post.date} className="text-sm">
                  {/* 한국 날짜 포맷 */}
                  {format(parseISO(post.date), "yyyy-MM-dd")}
                </time>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
