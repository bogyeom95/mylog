import cn from "classnames";
interface StateInfoProps {
  className?: string;
  show?: boolean;
  iconName?: string;
  text: string;
}

export default function StateInfo({
  className,
  show = true,
  iconName = "sentiment_very_dissatisfied",
  text,
}: StateInfoProps) {
  return (
    <h1
      className={cn(
        "my-20 flex items-center gap-1 text-2xl font-semibold",
        {
          hidden: !show,
        },
        className
      )}
    >
      <span className="material-icons-round text-4xl">{iconName}</span>
      <span>{text}</span>
    </h1>
  );
}
