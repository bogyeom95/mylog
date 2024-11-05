import { ReactNode } from "react";
import CopyCodeBtn from "./copy-code-btn";

type Props = {
  children: ReactNode;
  __raw__: string;
};

export const Figcaption = ({ children, __raw__, ...props }: Props) => {
  console.log("figcaption", children, props);
  return (
    <figcaption {...props}>
      <div className={"flex justify-between items-center"}>
        {children}

        <CopyCodeBtn text={__raw__} />
      </div>
    </figcaption>
  );
};
