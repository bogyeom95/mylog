export default async function Home() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-8">
      {/* 100개의 p 태그 임시 생성 */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex w-full flex-col gap-4 border-b pb-2 border-b-neutral-400"
        >
          <div className="skeleton h-12 w-56"></div>

          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
