import React, { useState } from "react";

type CodeBlockContainerProps = {
  children: React.ReactNode[];
};
export default function CodeBlockContainer({
  children,
}: CodeBlockContainerProps) {
  // 각 코드 블록의 언어를 추출하여 중복을 제거한 후 언어 목록 생성
  const languages = Array.from(
    new Set(
      children
        .filter((child: any) => child.props?.language)
        .map((child: any) => child.props.language)
    )
  );

  // 선택된 언어를 상태로 관리, 기본값은 언어 목록의 첫 번째 언어 (또는 undefined)
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    languages[0]
  );

  // 선택된 언어에 맞는 코드 블록만 표시
  const filteredChildren = children.filter((child: any) => {
    return child.props?.language === selectedLanguage;
  });

  return (
    <div className="code-block-container ">
      {/* 언어 선택 드롭다운 */}

      <div className="flex justify-end -mb-12 mr-16">
        <select
          className="block appearance-none  border border-gray-300 dark:bg-gray-800  py-1 px-3 pr-8 rounded leading-tight focus:outline-none "
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* 선택된 언어에 맞는 코드 블록만 렌더링 */}
      {filteredChildren.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}
