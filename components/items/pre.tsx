import React from "react";

export default function Pre({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const dataLanguage = props["data-language"] || "shell";
  return (
    <pre {...props} className="overflow-x-auto relative  bg-gray-800">
      <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold bg-gray-500 text-gray-200 dark:text-gray-200 dark:bg-blue-900 rounded">
        {dataLanguage}
      </div>
      {children}
    </pre>
  );
}
