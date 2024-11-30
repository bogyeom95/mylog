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
        `flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100dvw] max-w-4xl`,
        className
      )}
    >
      {children}
    </div>
  );
}
