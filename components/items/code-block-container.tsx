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
      </div>

      {/* 선택된 언어에 맞는 코드 블록만 렌더링 */}
      {filteredChildren.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}
