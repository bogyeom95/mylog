import { allPosts } from "@/.contentlayer/generated";
import { parseISO, compareDesc } from "date-fns";

export async function getPostsBy(page: number, searchQuery?: string) {
  // 모든 게시물을 날짜순으로 정렬
  const sortedPosts = allPosts
    .filter((post) => {
      // 검색어가 있을 경우 제목에 포함되는 게시물만 필터링
      console.log(post);
      if (post._raw.sourceFileName === "index.mdx") return false;
      if (!searchQuery) return true;
      return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date))); // 최신 날짜순으로 정렬

  // 페이지 네이션 처리
  const pageSize = 10;
  const start = page * pageSize;
  const paginatedPosts = sortedPosts.slice(start, start + pageSize);

  return paginatedPosts;
}
