import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100dvw] max-w-4xl">
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to all posts
      </Link>
      <div className="mt-20 ">
        <h1 className="text-2xl font-semibold flex items-center gap-1">
          <span className="material-icons-round text-4xl">
            sentiment_very_dissatisfied
          </span>
          <span>페이지 정보가 없습니다.</span>
        </h1>
      </div>
    </div>
  );
}
