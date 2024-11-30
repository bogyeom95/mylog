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
    <div className={cn("mx-auto mt-4 w-[100dvw] max-w-4xl", className)}>
      {children}
    </div>
  );
}
