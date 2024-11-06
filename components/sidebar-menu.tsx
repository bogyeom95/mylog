"use client";
import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";

// CategoryNode 타입 정의
type CategoryNode = {
  order: number;
  name: string;
  posts?: Post[];
  children: Record<string, CategoryNode>;
};

// 계층적 디렉토리 구조를 생성하고 정렬하는 함수
function buildCategoryHierarchy(posts: Post[]): Record<string, CategoryNode> {
  const root: Record<string, CategoryNode> = {};

  posts.forEach((post) => {
    const { sourceFileDir } = post._raw;
    const parts = sourceFileDir.split("/");

    let currentLevel = root;

    parts.forEach((part, index) => {
      const match = part.match(/^(\d+)-(.+)/);
      if (!match) return;

      const [, order, name] = match;
      const key = `${order}-${name}`;

      if (!currentLevel[key]) {
        currentLevel[key] = { order: parseInt(order, 10), name, children: {} };
      }

      // 마지막 부분이면 posts에 추가
      if (index === parts.length - 1) {
        if (!currentLevel[key].posts) {
          currentLevel[key].posts = [];
        }
        currentLevel[key].posts.push(post);
      }

      currentLevel = currentLevel[key].children;
    });
  });

  return root;
}

// 트리 구조를 기반으로 JSX 요소를 생성하는 함수
function renderCategoryTree(
  node: Record<string, CategoryNode>,
  depth = 1,
  currentPath: string
): JSX.Element {
  let containsActiveLink = false; // 하위 항목에 활성화된 링크가 있는지 확인하는 플래그

  const categoryElements = Object.entries(node)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, { name, posts = [], children }]) => {
      let isOpen = depth < 2; // 기본 상태는 첫 번째 레벨만 펼쳐짐
      let hasActiveChild = false; // 하위 요소 중 활성화된 요소가 있는지 여부

      // 포스트 리스트 생성
      const postElements = posts.map((post) => {
        const isActive = currentPath === `/posts/${post._raw.flattenedPath}`;
        if (isActive) {
          containsActiveLink = true;
          isOpen = true; // 현재 경로와 일치하는 경우 해당 depth를 펼침
        }
        return (
          <li key={post._id} className="">
            <Link href={`/posts/${post._raw.flattenedPath}`}>
              <span
                className={`${isActive ? "text-blue-500 " : ""}  block  truncate`}
              >
                {post.title}
              </span>
            </Link>
          </li>
        );
      });

      // 하위 항목의 개수를 계산
      const childrenCount = Object.keys(children).length + posts.length;

      // 하위 트리 생성
      const childElements = renderCategoryTree(
        children,
        depth + 1,
        currentPath
      );
      if (childElements && childElements.props.containsActiveLink) {
        isOpen = true; // 하위 트리에 활성 링크가 있는 경우 펼쳐짐
        containsActiveLink = true;
      }

      return (
        <li key={key} className="">
          {depth === 1 ? (
            <>
              <h2 className="font-semibold text-lg">{name}</h2>
              {postElements.length > 0 && <ul>{postElements}</ul>}
              {Object.keys(children).length > 0 && childElements}
            </>
          ) : (
            <details open={isOpen} className="w-full">
              <summary className="flex items-center gap-1 cursor-pointer">
                {name}
                {!isOpen && childrenCount > 0 && (
                  <span className="pr-2">({childrenCount})</span>
                )}
              </summary>
              {postElements.length > 0 && <ul>{postElements}</ul>}
              {Object.keys(children).length > 0 && childElements}
            </details>
          )}
        </li>
      );
    });

  return <ul>{categoryElements}</ul>;
}

export default function SidebarMenu(): JSX.Element {
  const currentPath = usePathname(); // 현재 URL 경로 가져오기
  const categoryHierarchy = buildCategoryHierarchy(allPosts);

  return (
    <div className="menu min-w-[100px]">
      {renderCategoryTree(categoryHierarchy, 1, currentPath)}
    </div>
  );
}
