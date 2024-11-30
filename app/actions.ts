import { allPosts } from "@/.contentlayer/generated";
import { parseISO, compareDesc } from "date-fns";

function sanitizeSearchQuery(query?: string): string {
  if (!query) return "";
  const maxLength = 100;
  const sanitizedQuery = query.trim().substring(0, maxLength);
  return sanitizedQuery;
}

export async function getPostsBy(page: number, searchQuery?: string) {
  // 타임아웃
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const query = sanitizeSearchQuery(searchQuery);
  const sortedPosts = allPosts
    .filter((post) => {
      if (post._raw.sourceFileName === "index.mdx") return false;
      if (!query) return true;
      if (
        post.tags
          ?.map((tag) => tag.toLocaleLowerCase())
          .find((tag) => tag.includes(query))
      )
        return true;

      return post.title.toLowerCase().includes(query);
    })
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date))); // 최신 날짜순으로 정렬

  // 페이지 네이션 처리
  const pageSize = 1;
  const start = page * pageSize;
  const paginatedPosts = sortedPosts.slice(start, start + pageSize);

  return paginatedPosts;
}
