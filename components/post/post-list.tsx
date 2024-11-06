"use client";
import { Post } from "@/.contentlayer/generated";
import { getPostsBy } from "@/app/actions";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function PostList({
  initialPosts,
  searchQuery,
}: {
  initialPosts: Post[];
  searchQuery?: string;
}) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [page, setPage] = React.useState(0);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const trigger = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    // 현재 페이지가 /home일때만 실행

    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);

          const newPosts = await getPostsBy(page + 1, searchQuery);
          if (newPosts.length !== 0) {
            setPage((prev) => prev + 1);
            setPosts((prev) => [...prev, ...newPosts]);
          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page, searchQuery]);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}

      {!isLastPage ? (
        <span ref={trigger} className="w-full flex justify-center">
          <span className="loading loading-dots loading-md "></span>
        </span>
      ) : (
        <div role="alert" className="alert">
          <span>No More Post...</span>
        </div>
      )}
    </>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      key={post.title}
      href={`posts/` + post._raw.flattenedPath}
      className="contents"
    >
      <div key={post.title} className="flex w-full flex-col">
        <div className="ring-2 ring-base-300  rounded-sm p-4 hover:ring-4  transition duration-200 ease-in-out ">
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
