"use client";
import { Post } from "@/.contentlayer/generated";
import { getPostsBy } from "@/app/actions";
import React from "react";
import PostCard from "./card/PostCard";
import StateInfo from "../../StateInfo";
import cn from "classnames";

interface PostCardListProps {
  className?: string;
  initialPosts: Post[];
  searchQuery: string;
}

export default function PostCardList({
  className,
  initialPosts,

  searchQuery,
}: PostCardListProps) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [page, setPage] = React.useState(0);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const trigger = React.useRef<HTMLSpanElement>(null);

  const loadMorePosts = async () => {
    const newPosts = await getPostsBy(page + 1, searchQuery);
    if (newPosts.length !== 0) {
      setPage(prev => prev + 1);
      setPosts(prev => [...prev, ...newPosts]);
    } else {
      setIsLastPage(true);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          loadMorePosts();
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
    <div className={cn(className)}>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      <div className="my-20 flex w-full justify-center">
        {!isLastPage && (
          <span ref={trigger} className="loading loading-dots loading-md" />
        )}

        <StateInfo show={isLastPage} text={"No More Post..."} />
      </div>
    </div>
  );
}
