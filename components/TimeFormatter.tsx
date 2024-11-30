import { parseISO, format } from "date-fns";
import { PropsWithChildren } from "react";
import cn from "classnames";
import { ko } from "date-fns/locale";

interface TimeFormatterProps {
  className?: string;
  date: string;
  dateFormat?: string;
}

export default function TimeFormatter({
  className,
  date,
  dateFormat = " PPP ",
}: PropsWithChildren<TimeFormatterProps>) {
  return (
    <time
      dateTime={date}
      className={cn("flex-shrink-0 font-semibold", className)}
    >
      {format(parseISO(date), dateFormat, { locale: ko })}
    </time>
  );
}
