import StateInfo from "@/components/StateInfo";
import { getPostsBy } from "./actions";
import PostCardList from "@/components/post/cards/PostCardList";
import Container from "@/components/Container";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await new Promise(resolve => setTimeout(resolve, 1000));
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
      <PostCardList
        className="w-full"
        key={searchQuery}
        initialPosts={initialPosts}
        searchQuery={searchQuery}
      />
    </Container>
  );
}
