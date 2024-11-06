import { ReactNode } from "react";
import CopyCodeBtn from "./copy-code-btn";

type Props = {
  children: ReactNode;
  __raw__?: string;
  language?: string;
};

export const Figcaption = ({
  children,
  __raw__,
  language,
  ...props
}: Props) => {
  return (
    <figcaption {...props}>
      <div className={"flex justify-between items-center"}>
        {children}
        <div className="flex items-center">
          <span className="language-tag">{language}</span>
          <CopyCodeBtn text={__raw__ || ""} />
        </div>
      </div>
    </figcaption>
  );
};
