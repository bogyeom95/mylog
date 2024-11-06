import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParmas = await props.searchParams;
  const q = searchParmas.q;

  const searchQuery = decodeURIComponent(String(q || ""));

  const filteredPosts = allPosts.filter((post) => {
    if (!searchQuery) return true;
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100vw] max-w-4xl">
      {filteredPosts.map((post) => (
        <Link
          key={post.title}
          href={`posts/` + post._raw.flattenedPath}
          className="contents"
        >
          <div key={post.title} className="flex w-full flex-col">
            <div className="ring-2 ring-base-300  rounded-sm p-4 hover:ring-4  transition duration-200 ease-in-out hover:shadow-2xl">
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
