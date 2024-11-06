export default function NotFound() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 mt-4 mx-auto w-[100vw] max-w-4xl">
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
