import { ReactNode } from "react";
import CopyCodeBtn from "./copy-code-btn";

type Props = {
  children: ReactNode;
  __raw__: string;
};

export const Figcaption = ({ children, __raw__, ...props }: Props) => {
  return (
    <figcaption {...props}>
      <div className={"flex justify-between items-center"}>
        {children}
        <div>
          <CopyCodeBtn text={__raw__} />
        </div>
      </div>
    </figcaption>
  );
};
