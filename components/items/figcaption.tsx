import { HTMLAttributes } from "react";
import CopyCodeBtn from "./copy-code-btn";

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
        <div className="flex items-center">
          <CopyCodeBtn text={__raw__ || ""} />
        </div>
      </div>
    </figcaption>
  );
};
