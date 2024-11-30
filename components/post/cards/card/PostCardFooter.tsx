import { PropsWithChildren } from "react";
import cn from "classnames";
import { TagPlatter } from "@/components/TagPlatter";
import TimeFormatter from "@/components/TimeFormatter";
interface PostCardFooterProps {
  className?: string;
  tags?: string[];
  date: string;
}

export default function PostCardFooter({
  className,
  tags,
  date,
}: PropsWithChildren<PostCardFooterProps>) {
  return (
    <div className={cn("flex items-end justify-between", className)}>
      <TagPlatter tags={tags} />
      <TimeFormatter date={date} />
    </div>
  );
}
