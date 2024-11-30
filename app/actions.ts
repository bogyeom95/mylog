import { allPosts } from "@/.contentlayer/generated";
import { parseISO, compareDesc } from "date-fns";

const sanitizeSearchQuery = (query?: string) => {
  if (!query) return "";
  const maxLength = 100;
  const sanitizedQuery = query.trim().substring(0, maxLength).toLowerCase();
  return sanitizedQuery;
};

const isNotIndexFile = (sourceFileName: string) =>
  sourceFileName !== "index.mdx";

const matchesQueryInTags = (query: string, tags?: string[]) =>
  tags && tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

const matchedQueryInTitle = (query: string, title: string) =>
  title.toLowerCase().includes(query.toLowerCase());

export async function getPostsBy(page: number, searchQuery?: string) {
  const query = sanitizeSearchQuery(searchQuery);
  const sortedPosts = allPosts
    .filter(post => isNotIndexFile(post._raw.sourceFileName))
    .filter(
      post =>
        !query ||
        matchesQueryInTags(query, post.tags) ||
        matchedQueryInTitle(query, post.title)
    )
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date))); // 최신 날짜순으로 정렬

  // 페이지 네이션 처리
  const pageSize = 1;
  const start = page * pageSize;
  const paginatedPosts = sortedPosts.slice(start, start + pageSize);

  return paginatedPosts;
}
