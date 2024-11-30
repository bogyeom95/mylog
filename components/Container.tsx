import { PropsWithChildren } from "react";
import cn from "classnames";

interface ContainerProps {
  className?: string;
}

export default function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={cn(
        "mx-auto mt-4 flex w-[100dvw] max-w-4xl flex-row flex-wrap justify-center gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
