import { Post } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
export default function CardBodyFooter({ post }: { post: Post }) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-wrap *:mr-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="p-1 px-2 text-sm font-medium  text-accent-content border bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800  transition duration-200"
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
