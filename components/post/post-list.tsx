"use client";
import { Post } from "@/.contentlayer/generated";
import { getPostsBy } from "@/app/actions";
import React from "react";
import PostCard from "./post-card";
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
        <h1 className="text-2xl font-semibold flex items-center gap-1">
          <span className="material-icons-round text-4xl">
            sentiment_very_dissatisfied
          </span>
          <span>No More Post...</span>
        </h1>
      )}
    </>
  );
}
