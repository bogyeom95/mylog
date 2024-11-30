import StateInfo from "@/components/StateInfo";
import { getPostsBy } from "./actions";
import PostList from "@/components/post/PostList";
import Container from "@/components/Container";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = (await searchParams).q;
  const searchQuery = decodeURIComponent(String(q || "").trim());
  const initialPosts = await getPostsBy(0, searchQuery);

  if (!initialPosts || initialPosts.length === 0) {
    return (
      <Container>
        <StateInfo text="검색결과가 없습니다." />
      </Container>
    );
  }

  return (
    <Container>
      <PostList
        className="w-full"
        key={searchQuery}
        initialPosts={initialPosts}
        searchQuery={searchQuery}
      />
    </Container>
  );
}
