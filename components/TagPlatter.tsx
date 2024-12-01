import cn from "classnames";
interface TagPlatterProps {
  className?: string;
  tags?: string[];
}

export const TagPlatter = ({ className, tags }: TagPlatterProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags?.map(tag => (
        <span
          key={tag}
          className="overflow-hidden truncate border-b-2 border-b-slate-400 text-sm font-semibold"
        >
          {`#${tag}`}
        </span>
      ))}
    </div>
  );
};
