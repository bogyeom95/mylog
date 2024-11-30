import { HTMLAttributes } from "react";
import CopyCodeBtn from "./CopyCodeBtn";

type Props = HTMLAttributes<HTMLElement> & {
  __raw__?: string;
};

export const Figcaption = ({
  children,
  __raw__,
  ...props
}: React.PropsWithChildren<Props>) => {
  return (
    <figcaption {...props}>
      <div className={"flex items-center justify-between"}>
        {children}

        <CopyCodeBtn text={__raw__ || ""} />
      </div>
    </figcaption>
  );
};
