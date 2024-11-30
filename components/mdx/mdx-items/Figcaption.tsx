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
      <div className={"flex justify-between items-center"}>
        {children}

        <CopyCodeBtn text={__raw__ || ""} />
      </div>
    </figcaption>
  );
};
