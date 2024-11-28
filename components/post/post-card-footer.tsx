import { Post } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
export default function CardBodyFooter({ post }: { post: Post }) {
  return (
    <div className="flex items-end justify-between ">
      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className=" truncate overflow-hidden text-sm font-semibold  border-b-2 border-b-slate-400"
          >
            {`#${tag}`}
          </span>
        ))}
      </div>

      <time
        dateTime={post.date}
        className="text-md font-semibold  flex-shrink-0 border-b-2 border-b-slate-400"
      >
        {/* 한국 날짜 포맷 */}
        {format(parseISO(post.date), "yyyy-MM-dd")}
      </time>
    </div>
  );
}
