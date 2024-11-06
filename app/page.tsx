import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";

export default async function Home() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100vw] max-w-4xl">
      {allPosts.map((post) => (
        <div
          key={post.title}
          className="flex w-full flex-col transition duration-200 ease-in-out hover:shadow-2xl"
        >
          <Link href={`posts/` + post._raw.flattenedPath} className="contents">
            <div className="flex flex-col gap-4 border border-base-300 bg-base-100 rounded-lg p-4 ">
              <div className="flex flex-row gap-4">
                {post.image && (
                  <div className="relative h-28 w-28 rounded-md flex-shrink-0 ">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className={`flex flex-col gap-2 overflow-hidden`}>
                  <h1 className="text-2xl font-extrabold  truncate">
                    {post.title}
                  </h1>
                  <p className="pt-2 line-clamp-3">{post.description}</p>
                </div>
              </div>
              <CardBodyFooter post={post} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function CardBodyFooter({ post }: { post: Post }) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-wrap">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="p-1 px-2 mx-1 text-sm font-medium  text-accent-content border bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800  transition duration-200"
          >
            {`${tag}`}
          </span>
        ))}
      </div>

      <time
        dateTime={post.date}
        className="text-sm font-semibold  dark:text-neutral-200"
      >
        {/* 한국 날짜 포맷 */}
        {format(parseISO(post.date), "yyyy-MM-dd")}
      </time>
    </div>
  );
}
