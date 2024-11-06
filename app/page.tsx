import { getPostsBy } from "./actions";
import PostList from "@/components/post/post-list";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParmas = await props.searchParams;
  const q = searchParmas.q;

  const searchQuery = decodeURIComponent(String(q || ""));

  const initialPosts = await getPostsBy(0, searchQuery);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100vw] max-w-4xl">
      {initialPosts.length === 0 ? (
        <div className="mt-20 ">
          <h1 className="text-2xl font-semibold flex items-center gap-1">
            <span className="material-icons-round text-4xl">
              sentiment_very_dissatisfied
            </span>
            <span>검색결과가 없습니다.</span>
          </h1>
        </div>
      ) : (
        <PostList initialPosts={initialPosts} searchQuery={searchQuery} />
      )}
    </div>
  );
}
