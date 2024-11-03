// app/components/MarkdownMenu.tsx
import { useState, useEffect, useRef } from "react";

interface MarkdownMenuProps {
  onSelect: (syntax: string) => void;
  closeMenu: () => void;
}

const menuGroups = [
  {
    groupName: "Headers",
    items: [
      { label: "Heading 1", icon: "title", syntax: "# " },
      { label: "Heading 2", icon: "title", syntax: "## " },
      { label: "Heading 3", icon: "title", syntax: "### " },
    ],
  },
  {
    groupName: "Text Formatting",
    items: [
      { label: "Bold", icon: "format_bold", syntax: "**text**" },
      { label: "Italic", icon: "format_italic", syntax: "*text*" },
      {
        label: "Bold & Italic",
        icon: "format_bold",
        syntax: "***text***",
      },
      {
        label: "Strikethrough",
        icon: "strikethrough_s",
        syntax: "~~text~~",
      },
      { label: "Highlight", icon: "highlight", syntax: "==text==" },
    ],
  },
  {
    groupName: "Lists and Tables",
    items: [
      {
        label: "Bulleted List",
        icon: "format_list_bulleted",
        syntax: "- Item 1\n- Item 2\n- Item 3\n",
      },
      {
        label: "Table",
        icon: "table_chart",
        syntax:
          "\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n",
      },
    ],
  },
  {
    groupName: "Code and Quotes",
    items: [
      { label: "Code Block", icon: "code", syntax: "```\n\n```" },
      { label: "Inline Code", icon: "code", syntax: "`inline code`" },
      { label: "Quote", icon: "format_quote", syntax: "> quote text" },
      { label: "Blockquote", icon: "format_quote", syntax: "> " },
    ],
  },
  {
    groupName: "Dividers",
    items: [
      { label: "Horizontal Line", icon: "remove", syntax: "\n---\n" },
      { label: "Divider", icon: "horizontal_rule", syntax: "\n****\n" },
    ],
  },
];

export default function MarkdownMenu({
  onSelect,
  closeMenu,
}: MarkdownMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const flattenedItems = menuGroups.flatMap((group) => group.items);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  const queryText = searchQuery.startsWith("/")
    ? searchQuery.slice(1)
    : searchQuery;

  // 필터링된 그룹 로직에 searchQuery 추가
  const filteredGroups = menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(queryText.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % flattenedItems.length);
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setActiveIndex(
          (prev) => (prev - 1 + flattenedItems.length) % flattenedItems.length
        );
        event.preventDefault();
      } else if (event.key === "Enter") {
        onSelect(flattenedItems[activeIndex].syntax);
        closeMenu();
        event.preventDefault();
      } else if (event.key === "Escape") {
        closeMenu();
      } else if (event.key.length === 1) {
        // 문자 입력 처리
        setSearchQuery((prev) => prev + event.key);
      } else if (event.key === "Backspace") {
        // 백스페이스로 검색어 수정
        setSearchQuery((prev) => prev.slice(0, -1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, searchQuery]); // `searchQuery`를 종속성으로 추가

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <div className="absolute top-10 left-0 bg-base-100 p-2 rounded shadow-md">
      <ul className="bg-base-100  w-56 max-h-60 overflow-y-auto">
        {filteredGroups.map((group, groupIndex) => (
          <div key={group.groupName} className="mb-2">
            <li className="text-sm font-semibold text-gray-500 px-2">
              {group.groupName}
            </li>
            {group.items.map((item, itemIndex) => {
              const globalIndex =
                menuGroups
                  .slice(0, groupIndex)
                  .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;
              return (
                <li
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[globalIndex] = el!;
                  }}
                  onClick={() => {
                    onSelect(item.syntax);
                    closeMenu();
                  }}
                  className={`cursor-pointer ${
                    activeIndex === globalIndex ? "bg-gray-200" : ""
                  }`}
                >
                  <a className="*:text-md  flex align-center">
                    <span className="material-icons-round text-gray-500">
                      {item.icon}
                    </span>
                    <span className="border-l-2 border-slate-400 px-2">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </div>
        ))}
      </ul>
    </div>
  );
}
