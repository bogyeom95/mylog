import { PropsWithChildren } from "react";
import cn from "classnames";
interface TagPlatterProps {
  className?: string;
  tags?: string[];
}

export const TagPlatter = ({
  className,
  tags,
}: PropsWithChildren<TagPlatterProps>) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags?.map((tag) => (
        <span
          key={tag}
          className=" truncate overflow-hidden text-sm font-semibold  border-b-2 border-b-slate-400"
        >
          {`#${tag}`}
        </span>
      ))}
    </div>
  );
};
