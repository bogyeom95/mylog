import { PropsWithChildren } from "react";
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
}: PropsWithChildren<StateInfoProps>) {
  return (
    <h1
      className={cn(
        "text-2xl font-semibold flex items-center gap-1 my-20",
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
